# SwiftUI Data & Persistence Reference

> SwiftData, Core Data, Codable, Observation, Combine, async loading, file storage, and Keychain patterns for SwiftUI apps.
> **Read when choosing or implementing data models, persistence, or async data loading in SwiftUI apps.**

---

## 1. Choosing the Right Data Stack

| Stack | Choose when | Avoid when |
|-------|-------------|------------|
| **SwiftData** | New SwiftUI app; target ≥ iOS 17 / macOS 14; relational object graph; first-party iCloud sync later | Must support iOS 16 or earlier; exotic custom store requirements |
| **Core Data** | Legacy codebase with existing models; complex fetch/relationship graphs; CloudKit already wired | Greenfield app — SwiftData is the simpler first-party path |
| **Codable + JSON files** | Small config, caches, exportable documents, one-shot reads | Queries/joins, large datasets, concurrent writers |
| **Remote API + Codable** | Network-first app; server is the source of truth | Offline-first apps without a local cache layer |
| **UserDefaults / AppStorage** | Preferences, flags, plist-shaped state | Structured, sensitive, or queryable data |

> **⚠️ ASK THE USER:** (1) Does a data layer already exist? (2) Minimum deployment target? (3) Must data sync across devices / iCloud? (4) Offline requirements? (5) Approximate dataset size? A working Core Data layer is usually not worth rewriting — answer (1) first.

| ❌ NEVER | ✅ ALWAYS |
|----------|-----------|
| Pick SwiftData for an iOS 16–only app | Confirm deployment target ≥ iOS 17 / macOS 14 first |
| Add a second persistence layer "just in case" | One source of truth; migrate when proven necessary |
| Store structured data in UserDefaults | AppStorage/UserDefaults for preferences only |
| Decide persistence after writing models | Choose the stack before writing model code |
| Mix SwiftData and Core Data in one feature | Isolate the legacy layer behind a repository protocol |

---

## 2. SwiftData (iOS 17+ / macOS 14+)

### Model declarations

```swift
import SwiftData

@Model
final class Task {
    @Attribute(.unique) var id: UUID = UUID()
    var title: String
    var isCompleted = false
    var dueDate: Date?
    @Attribute(.externalStorage) var attachmentData: Data? // blob stored outside the DB file
    @Transient var cachedTitle: String = ""                // never persisted

    init(title: String) { self.title = title }
}
```

| Macro / attribute | Purpose |
|---|---|
| `@Attribute(.unique)` | Unique constraint; duplicate insert throws at `save()` |
| `@Attribute(.externalStorage)` | Large blobs stored as separate files |
| `@Attribute(originalName:)` | Rename mapping for migrations |
| `@Relationship(deleteRule:inverse:)` | Link models; `.cascade` deletes children with the parent |
| `@Transient` | Computed / cached property, not persisted |

### Container & context

```swift
// Disk-backed (default)
let container = try ModelContainer(for: Task.self)

// In-memory — tests, previews, scratch data
let memory = try ModelContainer(
    for: Task.self,
    configurations: ModelConfiguration(isStoredInMemoryOnly: true)
)

// Multiple model types
let schema = Schema([Task.self, Project.self], version: Schema.Version(1, 0, 0))
let container = try ModelContainer(for: schema)
```

Views inject the container with `.modelContainer(container)` and read the context with `@Environment(\.modelContext)`. `container.mainContext` is the main-actor `ModelContext` — the one to use from views. SwiftData models are **not** `Sendable`; never share an instance across isolation domains.

```swift
// CRUD
let task = Task(title: "Ship the build")
context.insert(task)
try context.save()

task.isCompleted = true          // mutate…
try context.save()               // …then save

context.delete(task)
try context.save()

// Programmatic fetch (outside @Query)
var descriptor = FetchDescriptor<Task>(
    predicate: #Predicate { $0.dueDate != nil },
    sortBy: [SortDescriptor(\Task.dueDate, order: .reverse)]
)
let tasks = try context.fetch(descriptor)
```

### @Query in views

```swift
struct TaskList: View {
    @Query(filter: #Predicate<Task> { !$0.isCompleted },
           sort: \Task.dueDate, order: .forward)
    private var openTasks: [Task]

    @Query private var allTasks: [Task]      // everything, insertion order

    var body: some View {
        List(openTasks) { task in
            Text(task.title)
        }
        .animation(.default, value: openTasks.map(\.id)) // animate re-sort/filter
    }
}
```

`#Predicate` supports a fixed expression subset: comparisons, boolean logic, `contains`, `localizedStandardContains`, `IN`, and subqueries. No arbitrary function calls.

```swift
// ✅ CORRECT — supported predicate expression
#Predicate<Item> { $0.title.localizedStandardContains(query) }

// ❌ WRONG — custom functions cannot appear inside a predicate
#Predicate<Item> { normalize($0.title) == query }
```

### Relationships

```swift
@Model
final class Album {
    var name: String
    @Relationship(deleteRule: .cascade, inverse: \Song.album)
    var songs: [Song] = []

    init(name: String) { self.name = name }
}

@Model
final class Song {
    var title: String
    var album: Album?          // the inverse — required for to-many links
}
```

Many-to-many: two arrays, each with the other as inverse:

```swift
@Model
final class Playlist {
    var name: String
    @Relationship(inverse: \Song.playlists) var songs: [Song] = []
}

@Model
final class Song {
    var title: String
    @Relationship(inverse: \Playlist.songs) var playlists: [Playlist] = []
}
```

### @Model rules — inheritance & isolation

```swift
// ❌ WRONG: @Model cannot inherit from another class (including @Model subclasses)
@Model final class BaseItem { var name = "" }
@Model final class Task: BaseItem { }        // compiler error

// ✅ CORRECT: one @Model per class; share behavior via protocols or composition
protocol Named {
    var name: String { get set }
}

@Model
final class Task {
    var name = ""
}
```

```swift
// ❌ WRONG: touching mainContext (or saving) from a background queue
DispatchQueue.global().async {
    try? container.mainContext.save()   // main-actor isolation violation
}

// ✅ CORRECT: wrap background work in a @ModelActor
@ModelActor
actor TaskStore {
    func create(title: String) throws {
        let task = Task(title: title)
        modelContext.insert(task)
        try modelContext.save()
    }
}
```

| ❌ NEVER | ✅ ALWAYS |
|----------|-----------|
| Subclass `@Model` classes | One `@Model` per class; protocols/composition for shared code |
| Save on `mainContext` off the main actor | `@ModelActor` for background writes |
| Capture a `@Model` instance in `Task.detached` | Fetch fresh instances inside the actor |
| Store `Data` blobs inline when large | `@Attribute(.externalStorage)` |

### Schema migration

Version every schema change; never edit a shipped model in place.

```swift
enum SchemaV1: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] { [Task.self] }
}

enum SchemaV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)
    static var models: [any PersistentModel.Type] { [Task.self] } // + new property
}

enum MigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] { [SchemaV1.self, SchemaV2.self] }

    static var stages: [MigrationStage] {
        [
            // Additive changes only (new optional property, new model)
            .lightweight(fromVersion: SchemaV1.self, toVersion: SchemaV2.self),

            // Custom transforms need a manual stage
            .custom(fromVersion: SchemaV2.self, toVersion: SchemaV3.self,
                    willMigrate: { context in
                        // iterate old data, transform, insert new models
                    },
                    didMigrate: nil)
        ]
    }
}

let container = try ModelContainer(
    for: SchemaV2.self,
    migrationPlan: MigrationPlan.self
)
```

CloudKit: `ModelConfiguration(cloudKitDatabase: .automatic)` syncs a SwiftData store to the user's private database — design unique constraints and schema evolution for the cloud from day one.

---

## 3. Core Data (Legacy / Existing Projects)

Keep Core Data when: an `.xcdatamodeld` already exists, CloudKit via `NSPersistentCloudKitContainer`, or a large custom fetch graph. It is proven — but SwiftData is the forward path for new code on new targets.

```swift
let container = NSPersistentContainer(name: "Model")
container.loadPersistentStores { _, error in
    if let error { /* handle; fatal at boot is acceptable */ }
}

// Save
let context = container.viewContext        // main-queue context
let item = Item(context: context)
item.name = "New"
try context.save()
```

```swift
@FetchRequest(
    sortDescriptors: [NSSortDescriptor(keyPath: \Item.timestamp, ascending: false)],
    predicate: NSPredicate(format: "isCompleted == false")
)
private var items: FetchedResults<Item>

List(items) { item in Text(item.name ?? "") }
```

Background work: `container.performBackgroundTask { ctx in … }` or `context.perform { … }` — never the `viewContext` off the main queue.

**Migrate to SwiftData when:** target ≥ iOS 17 / macOS 14, the object graph is modest, no CloudKit, no custom `NSPersistentStore`, and you can budget a full rewrite plus migration tests. Otherwise leave Core Data alone.

| ❌ NEVER | ✅ ALWAYS |
|----------|-----------|
| Mix `@FetchRequest` and `@Query` in the same feature | Pick one; isolate it behind a repository |
| Drop a Core Data store without a plan | Export/backup data before removing the framework |
| `save()` on `viewContext` from background threads | `performBackgroundTask` / `context.perform` |

---

## 4. Codable & Encoding

Codable is for value types that cross a boundary: JSON files, API payloads, `FileDocument`. Plain structs only — no `@Published`, no `ObservableObject`, no store-backed models.

```swift
struct Profile: Codable, Identifiable, Hashable {
    var id: UUID = UUID()
    var name: String
    var joinedAt: Date
}

let encoder = JSONEncoder()
encoder.dateEncodingStrategy = .iso8601
encoder.keyEncodingStrategy = .convertToSnakeCase
encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
let data = try encoder.encode(profile)

let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .iso8601
decoder.keyDecodingStrategy = .convertFromSnakeCase
let profile = try decoder.decode(Profile.self, from: data)
```

### CodingKeys & custom mapping

```swift
struct Player: Codable {
    let id: UUID
    let displayName: String

    private enum CodingKeys: String, CodingKey {
        case id
        case displayName = "display_name"   // server field
    }
}
```

### Full custom conformance

```swift
struct Duration: Codable, Equatable {
    var seconds: Int

    private enum CodingKeys: String, CodingKey { case seconds }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        seconds = try container.decode(Int.self, forKey: .seconds)
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(seconds, forKey: .seconds)
    }
}
```

### Enum backing & property wrappers

```swift
enum Status: String, Codable, CaseIterable {
    case draft, published, archived
}
// JSON form: "draft". Decoding an unknown raw value throws — add a tolerant init(from:) if needed.

// ❌ WRONG: property wrappers do not auto-encode
@Published var name: String      // nothing is encoded unless you hand-roll encode(to:)

// ✅ CORRECT: keep Codable structs plain; wrap them in observable models at the edge
struct DTO: Codable { var name: String }

@Observable
final class Model {
    var dto: DTO
    init(dto: DTO) { self.dto = dto }
}
```

| Strategy | Use |
|---|---|
| `.iso8601` / `.millisecondsSince1970` | API dates |
| `.convertToSnakeCase` / `.convertFromSnakeCase` | Server snake_case payloads |
| `.prettyPrinted` + `.sortedKeys` | Human-readable files, diffable caches |
| Custom `init(from:)` | Versioned payloads, tolerant parsing |

---

## 5. Observation Framework (iOS 17+)

`@Observable` replaces `ObservableObject` for SwiftUI state. Tracked properties invalidate views automatically; no `objectWillChange`, no `@Published`.

```swift
import Observation

@Observable
final class LibraryModel {
    var query = ""
    var books: [Book] = []
    private(set) var isLoading = false
}
```

```swift
struct LibraryView: View {
    @State private var model = LibraryModel()      // @State owns the reference

    var body: some View {
        @Bindable var model = model                // re-binding for $ syntax
        NavigationStack {
            List(model.books) { book in Text(book.title) }
                .searchable(text: $model.query)
        }
    }
}
```

### Migrating from ObservableObject

| ObservableObject | @Observable equivalent |
|---|---|
| `@Published var x` | `var x` — tracking is automatic |
| `@StateObject var m` | `@State private var m` |
| `@ObservedObject var m` | plain property (or `@State` when you own it) |
| `@EnvironmentObject var m` | `@Environment(Model.self) var m` + `.environment(model)` |
| `objectWillChange.send()` | delete it — redundant |
| Combine publishers on properties | `withObservationTracking` or plain `didSet` |

```swift
withObservationTracking {
    _ = model.query            // read inside the closure
} onChange: {
    print("query changed")     // fires once per change; re-arm for continuous tracking
}
```

`ObservableObject` remains the right tool for UIKit/AppKit interop and when a class already publishes Combine streams.

| ❌ NEVER | ✅ ALWAYS |
|----------|-----------|
| New `@Published` + `ObservableObject` for SwiftUI-only code | `@Observable` classes held by `@State` |
| Put SwiftData `@Model` objects inside `@Observable` classes | `@Query` for models; keep `@Model`/`@Observable` roles separate |
| Expose whole models as bindings | `@Bindable` at the point of binding |

---

## 6. Combine (When Still Needed)

Async/await + `@Observable` covers most app code now. Reach for Combine when you need composable, cancelable streams — timers, notifications, KVO, multi-input pipelines, retries.

```swift
var cancellables = Set<AnyCancellable>()

// One-shot values
Just(42)
    .sink { print($0) }
    .store(in: &cancellables)

// Async bridge
Future<Data, Error> { promise in
    Task {
        do { promise(.success(try await fetch())) }
        catch { promise(.failure(error)) }
    }
}

// Repeating timer
Timer.publish(every: 1, on: .main, in: .common)
    .autoconnect()
    .sink { date in print(date) }
    .store(in: &cancellables)

// Notifications
NotificationCenter.default.publisher(for: .NSSystemTimeZoneDidChange)
    .sink { _ in refreshClocks() }
    .store(in: &cancellables)
```

### Search field debounce

```swift
$searchText
    .debounce(for: .milliseconds(300), scheduler: RunLoop.main)
    .removeDuplicates()
    .map { $0.trimmingCharacters(in: .whitespaces) }
    .sink { text in Task { await self.search(text) } }
    .store(in: &cancellables)

// ✅ Simpler for one-shot fetches — .task(id:) auto-cancels stale work
.task(id: searchText) { await search(searchText) }
```

### Combining streams

```swift
Publishers.CombineLatest($username, $password)
    .map { user, pass in
        user.count >= 3 && pass.count >= 8
    }
    .assign(to: \.canSubmit, on: viewModel)
    .store(in: &cancellables)

Publishers.Merge(timerPub, eventPub)
    .removeDuplicates()
    .eraseToAnyPublisher()
```

| Still use Combine | Prefer async/await |
|---|---|
| KVO bridging: `publisher(for: \.keyPath)` | Network calls, file I/O |
| Multi-source pipelines with retry/backoff | Sequential dependent requests |
| UIKit/AppKit interop, timers, NotificationCenter | Anything driving SwiftUI state |

Keep `AnyCancellable` lifetimes explicit: store in a set owned by the object; cancel on deinit or `scenePhase` background.

---

## 7. Async Data Loading in Views

Model load state explicitly. Never leave the UI guessing.

```swift
enum LoadState<Value> {
    case idle
    case loading
    case loaded(Value)
    case failed(Error)
}

@Observable
final class FeedModel {
    var state: LoadState<[Post]> = .idle

    func load() async {
        state = .loading
        do {
            let posts = try await api.fetchPosts()
            state = .loaded(posts)
        } catch is CancellationError {
            return                       // user navigated away — stay silent
        } catch {
            state = .failed(error)
        }
    }
}
```

### .task is the loading hook

```swift
struct FeedView: View {
    @State private var model = FeedModel()

    var body: some View {
        content
            .task { await model.load() }                    // starts when the view appears
            .task(id: model.query) { await model.load() }   // restarts when query changes
            .refreshable { await model.load() }             // pull-to-refresh
    }

    @ViewBuilder private var content: some View {
        switch model.state {
        case .idle, .loading:
            ProgressView()
        case .loaded(let posts):
            if posts.isEmpty {
                ContentUnavailableView("No Posts", systemImage: "tray",
                                       description: Text("Pull to refresh."))   // iOS 17+
            } else {
                List(posts) { post in PostRow(post: post) }
            }
        case .failed(let error):
            ContentUnavailableView {
                Label("Couldn't Load", systemImage: "wifi.exclamationmark")
            } description: {
                Text(error.localizedDescription)
            } actions: {
                Button("Retry") { Task { await model.load() } }
            }
        }
    }
}
```

```swift
// ❌ WRONG: fire-and-forget Task in onAppear
// Survives view disappearance, no cancellation, races on fast re-entry
.onAppear { Task { await load() } }

// ✅ CORRECT: .task ties lifetime to the view; cancelled on disappear
.task { await load() }
```

Cancellation is cooperative — honor it:

```swift
func load() async {
    do {
        try Task.checkCancellation()
        // … long work …
    } catch is CancellationError { return }
}
```

Retry patterns: explicit Retry button (above), `.refreshable` (always available), and exponential backoff inside an async retry helper for flaky networks.

| ❌ NEVER | ✅ ALWAYS |
|----------|-----------|
| `Task { }` fired from `onAppear` | `.task` / `.task(id:)` |
| Ignore `CancellationError` | Return quietly; update state only while alive |
| Show a spinner forever | Failed state with retry + `ContentUnavailableView` |
| Re-fetch on every re-render | Key work off `task(id:)` values |

---

## 8. File & App Storage

| Directory | URL | Backed up | Use for |
|---|---|---|---|
| Documents | `URL.documentsDirectory` | Yes (device/iCloud backup) | User-visible files, exports |
| Application Support | `URL.applicationSupportDirectory` | Yes | App-private data, databases |
| Caches | `URL.cachesDirectory` | No — system may purge | Regenerable content |
| tmp | `FileManager.default.temporaryDirectory` | No | Transient files |

### AppStorage / SceneStorage rules

```swift
@AppStorage("hasSeenOnboarding") private var hasSeenOnboarding = false
@SceneStorage("selectedTab") private var selectedTab = 0
```

- `@AppStorage` values must be plist types (`Bool, Int, Double, String, Data, URL`) or `RawRepresentable` — no arbitrary structs/arrays without a custom raw type.
- `@SceneStorage` is per-scene UI state (selected tab, scroll position). Never put user data there — it is not durable.
- Keys live in `UserDefaults.standard` — scope them with a prefix (`"app.feature.key"`).

### Import / export / move (iOS 14+)

```swift
.fileImporter(isPresented: $showImporter, allowedContentTypes: [.json]) { result in
    switch result {
    case .success(let url):
        // ❌ WRONG: keep using the temporary, security-scoped URL later — copy immediately.
        let data = try Data(contentsOf: url)
        let dest = URL.documentsDirectory.appending(path: "imported.json")
        try data.write(to: dest, options: .atomic)
    case .failure(let error):
        print(error.localizedDescription)
    }
}
// .fileExporter(...) and .fileMover(...) cover save and move variants.
```

```swift
// Writing JSON to Documents
func saveProfile(_ profile: Profile) throws {
    let data = try JSONEncoder().encode(profile)
    let url = URL.documentsDirectory.appending(path: "profile.json")
    try data.write(to: url, options: .atomic)
}
```

### Security-scoped bookmarks (macOS)

```swift
// Persist across launches for sandboxed access
let bookmark = try url.bookmarkData(options: .withSecurityScope,
                                    includingResourceValuesForKeys: nil,
                                    relativeTo: nil)
// Later:
let resolved = try URL(resolvingBookmarkData: bookmark,
                       options: .withSecurityScope, relativeTo: nil)
let ok = resolved.startAccessingSecurityScopedResource()
defer { resolved.stopAccessingSecurityScopedResource() }
```

| ❌ NEVER | ✅ ALWAYS |
|----------|-----------|
| Write user documents to Caches | Documents or a user-chosen location |
| Treat `fileImporter` URLs as permanent | Copy data out immediately |
| Store caches in Application Support | Caches directory; purge on low storage |

---

## 9. Security & Keychain

| Data type | Storage |
|---|---|
| Auth tokens, refresh tokens, passwords, API keys | **Keychain** (`Security` framework) |
| Biometric-gated secrets | Keychain + `kSecAttrAccessControl` / `LAContext` |
| Preferences, feature flags | UserDefaults / AppStorage |
| Tokens for sync | Keychain items are per-device — never sync raw tokens |

```swift
import Security

func saveSecret(_ secret: String, service: String, account: String) throws {
    let data = Data(secret.utf8)
    let query: [String: Any] = [
        kSecClass as String: kSecClassGenericPassword,
        kSecAttrService as String: service,
        kSecAttrAccount as String: account,
        kSecValueData as String: data,
        kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly
    ]
    SecItemDelete(query as CFDictionary)              // upsert: remove old first
    let status = SecItemAdd(query as CFDictionary, nil)
    guard status == errSecSuccess else { throw KeychainError(status) }
}

func readSecret(service: String, account: String) throws -> String? {
    let query: [String: Any] = [
        kSecClass as String: kSecClassGenericPassword,
        kSecAttrService as String: service,
        kSecAttrAccount as String: account,
        kSecReturnData as String: true,
        kSecMatchLimit as String: kSecMatchLimitOne
    ]
    var result: CFTypeRef?
    let status = SecItemCopyMatching(query as CFDictionary, &result)
    guard status == errSecSuccess, let data = result as? Data else { return nil }
    return String(data: data, encoding: .utf8)
}
```

Data protection levels:

| `kSecAttrAccessible` | Readable | Use |
|---|---|---|
| `.WhenUnlocked` | Only while the device is unlocked (default) | Standard secrets |
| `.AfterFirstUnlock` | After first unlock, incl. background | Background sync tokens |
| `.WhenUnlockedThisDeviceOnly` | Unlocked, never migrated to a new device | High-security session tokens |
| `.AfterFirstUnlockThisDeviceOnly` | After first unlock, this device only | Background + device-bound |

Keychain items survive app deletion — clear secrets on logout/wipe explicitly. Wrap `SecItem*` calls in one small generic helper (or a maintained wrapper); never sprinkle raw queries everywhere.

| ❌ NEVER | ✅ ALWAYS |
|----------|-----------|
| Tokens/passwords in UserDefaults or AppStorage | Keychain |
| Hardcode API keys or secrets in source | Config injected at build; secrets via Keychain |
| Log tokens or PII | Redact; `os.Logger` with privacy args |
| Ignore `SecItem` status codes | Handle `errSecDuplicateItem`, `errSecMissingEntitlement` (-34018) |

---

## 10. Data Checklist

### Before choosing a stack
- [ ] Asked the user about the existing data layer, target, sync, offline needs
- [ ] Deployment target known (≥ iOS 17 → SwiftData eligible)
- [ ] Dataset size and query complexity understood
- [ ] Sync requirement decided (CloudKit vs server API vs none)

### Before release
- [ ] Migration tested from every shipped schema version
- [ ] Every `save()` / `fetch()` error surfaced (never `try!` on disk I/O)
- [ ] Background persistence isolated behind `@ModelActor` / `performBackgroundTask`
- [ ] Secrets in Keychain only; no secrets in UserDefaults or logs
- [ ] Files in the correct directory (Documents vs Application Support vs Caches)
- [ ] Empty, loading, and failed states exist for every async screen
- [ ] `.task` used — no orphaned `Task`s from `onAppear`
- [ ] Privacy manifest declares collected data (`NSPrivacyCollectedDataTypes`, etc.)
- [ ] User-visible data strings localized

---

> **Remember:** persistence is the easiest part of an app to regret. Ask about the existing layer first, keep models plain, isolate background work, and ship migration tests with every schema change.
