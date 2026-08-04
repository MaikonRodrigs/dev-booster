# macOS Platform Guidelines (SwiftUI)

> macOS conventions for SwiftUI apps: menus, windows, toolbars, keyboard, focus, documents, sandboxing, AppKit interop.
> **Read when building for macOS with SwiftUI. THIS IS THE macOS REFERENCE — menus, windows, toolbars, keyboard, sandboxing, and macOS conventions.**

---

## 1. macOS Design Philosophy

macOS is keyboard-first, window-based, and menu-driven. The same SwiftUI code behaves differently from iOS — plan for it.

| iOS | macOS |
|---|---|
| Touch-first, single screen | Mouse + keyboard, multiple windows |
| No hover, no right-click muscle memory | Hover reveals controls; right-click = context menu |
| One primary window flow | Every window is independent |
| Menus in-app (nav bars, sheets) | Global menu bar drives most commands |
| Back gesture | ⌘[ or explicit controls; windows don't "push" |

Design values:

| Value | In practice |
|---|---|
| **Keyboard accessibility** | Every command reachable by shortcut or menu |
| **Menu-driven discoverability** | Actions live in the menu bar, not hidden in UI |
| **Flexible windows** | Resizable, movable, restorable state |
| **Right-click parity** | Context menus on every row/object |
| **Content clarity** | Toolbars and sidebars support, never obscure, content |

macOS 26 (Tahoe) refreshes materials and window chrome — system components adopt it automatically. Keep custom chrome minimal.

---

## 2. App Structure & Lifecycle

```swift
@main
struct MyApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate
    @Environment(\.scenePhase) private var scenePhase

    var body: some Scene {
        WindowGroup("Main", id: "main") {
            ContentView()
        }
        .defaultSize(width: 1000, height: 640)

        Settings {
            SettingsView()
        }
    }
}

final class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        true     // standard document-less apps quit when the last window closes
    }
}
```

| Scene | Use |
|---|---|
| `WindowGroup` | Main multi-window content; restores windows on relaunch |
| `Window(id:)` | Single auxiliary window (inspector, preferences pane) |
| `WindowScene` (macOS 15+) | Multi-window management with `openWindow`/`dismissWindow`, per-window state |
| `Settings` | The app's Preferences window (⌘,) |
| `MenuBarExtra` (macOS 13+) | Status-item-only or helper UI |

Lifecycle: `scenePhase` → `.active`/`.inactive`/`.background`. `NSApplicationDelegateAdaptor` is for AppKit lifecycle hooks (termination, activation, Dock menu) — not for data.

---

## 3. Windows

```swift
WindowGroup("Main", id: "main") {
    ContentView()
}
.defaultSize(width: 1000, height: 640)         // macOS 13+
.defaultPosition(.center)                       // macOS 13+
.windowResizability(.contentMinSize)            // macOS 13+ — or .contentSize (fixed), .contentMaxSize
.windowStyle(.hiddenTitleBar)
.windowToolbarStyle(.unified(showsTitle: true)) // or .unified, .expanded
```

```swift
// Auxiliary window
Window("Inspector", id: "inspector") {
    InspectorView()
}
.windowResizability(.contentSize)

// Open from anywhere
@Environment(\.openWindow) private var openWindow
Button("Inspect") { openWindow(id: "inspector") }
```

| Modifier | Effect |
|---|---|
| `.defaultSize` | Initial content size |
| `.windowResizability` | `.contentSize` = fixed to content; `.contentMinSize`/`.contentMaxSize` clamp |
| `.windowStyle(.hiddenTitleBar)` | Toolbar-only chrome (macOS 11+) |
| `.windowToolbarStyle(.unified)` | Title merges into the toolbar |
| `.movableByWindowBackground` | Drag window by background (only where there are no controls) |
| `.defaultPosition(.center)` | Initial placement |

SwiftUI autosaves window frame and state for `WindowGroup` by default — verify restoration on relaunch. For custom frame persistence use `NSWindow.frameAutosaveName` through a representable.

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Fixed non-resizable main windows | `.windowResizability` + sensible minimums |
| Content that doesn't fit smaller windows | Test the window down to its minimum size |
| One giant window doing everything | `WindowGroup` + auxiliary `Window(id:)` scenes |

---

## 4. The Menu Bar (Commands)

Structure: App menu, then File, Edit, View, Window, Help — generated from your `Commands` plus scene content.

```swift
import SwiftUI

// Shared "current selection" for menu validation
private struct SelectedItemKey: FocusedValueKey {
    typealias Value = Item?
}
extension FocusedValues {
    var selectedItem: Item? {
        get { self[SelectedItemKey.self] }
        set { self[SelectedItemKey.self] = newValue }
    }
}

struct AppCommands: Commands {
    @FocusedValue(\.selectedItem) private var selectedItem
    @Environment(\.openWindow) private var openWindow

    var body: some Commands {
        // Replace File > New
        CommandGroup(replacing: .newItem) {
            Button("New Item") { openWindow(id: "editor") }
                .keyboardShortcut("n", modifiers: .command)
        }

        // Custom top-level menu: "Item"
        CommandMenu("Item") {
            Button("Duplicate") { duplicate(selectedItem) }
                .keyboardShortcut("d", modifiers: [.command, .shift])
                .disabled(selectedItem == nil)      // auto-validation

            Divider()
            Button("Delete") { delete(selectedItem) }
                .keyboardShortcut(.delete, modifiers: [.command])
                .disabled(selectedItem == nil)
        }

        // Insert into View menu after the sidebar toggle
        CommandGroup(after: .sidebar) {
            Button("Focus on Selection") { scrollTo(selectedItem) }
                .keyboardShortcut("f", modifiers: [.command, .control])
                .disabled(selectedItem == nil)
        }
    }
}

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup { ContentView() }
            .commands { AppCommands() }
            .commandsRemoved()      // only when you intentionally drop default commands
    }
}
```

Publish selection into the focused scene (macOS 13+):

```swift
List(selection: $selection) { ForEach(items) { item in Text(item.name).tag(item) } }
    .focusedSceneValue(\.selectedItem, items.first { $0.id == selection })
```

| `CommandGroupPlacement` | Menu |
|---|---|
| `.newItem`, `.saveItem`, `.importExport`, `.printItem` | File |
| `.undoRedo`, `.pasteboard`, `.textEditing`, `.textFormatting` | Edit |
| `.toolbar`, `.sidebar`, `.status` | View |
| `.help`, `.appInfo`, `.appSettings`, `.systemServices` | App/Help |
| `.windowArrangement`, `.windowList`, `.windowSize` | Window |

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Buttons that ignore keyboard equivalents | `.keyboardShortcut` on every frequent command |
| Menu items that act on nothing | `@FocusedValue` + `.disabled` validation |
| Nested menu trees beyond one level | Flat `CommandMenu` lists with dividers |
| Two commands with the same shortcut | Unique ⌘ shortcuts; document them in the menu |

---

## 5. Toolbars

```swift
.toolbar {
    ToolbarItem(placement: .primaryAction) {
        Button { add() } label: { Label("Add", systemImage: "plus") }
            .help("Add a new item")     // tooltip
    }

    ToolbarItem(placement: .navigation) {
        Button { toggleSidebar() } label: { Label("Sidebar", systemImage: "sidebar.left") }
    }

    ToolbarItem(placement: .status) {
        if model.isSyncing { ProgressView().controlSize(.small) }
    }
}
.toolbarCustomizationBehavior(.disabled)   // macOS 15+ — or .reorderable / .default

// Customizable toolbars need stable ids
.toolbar(id: "mainToolbar") {
    ToolbarItem(id: "add", placement: .primaryAction) { ... }
}
```

| Placement | Use |
|---|---|
| `.primaryAction` | Main action, right-aligned |
| `.navigation` | Sidebar toggle / back, left of content |
| `.status` | Progress, sync state (bottom-right by default) |
| `.principal` | Centered title controls |
| `.automatic` | Let the system decide |

`.searchable(text:)` integrates into the toolbar automatically on macOS.

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Toolbar-only actions (no menu item) | Mirror every toolbar action in the menu |
| Reordering-sensitive toolbar layouts | `.toolbar(id:)` + stable item ids |
| Fixed toolbar with no customization opt-out | `.toolbarCustomizationBehavior` where users expect it |

---

## 6. Sidebar & Split Views

```swift
NavigationSplitView {
    List(selection: $selection) {
        Section("Inbox") { ... }
        Section("Archive") { ... }
    }
    .listStyle(.sidebar)
    .navigationSplitViewColumnWidth(min: 180, ideal: 220, max: 300)   // macOS 13+

} detail: {
    DetailView()
}
.navigationSplitViewStyle(.balanced)         // macOS 13+

.toolbar {
    ToolbarItem(placement: .navigation) {
        Button {
            NSApp.keyWindow?.tryToPerform(
                #selector(NSSplitViewController.toggleSidebar(_:)), with: nil)
        } label: { Label("Toggle Sidebar", systemImage: "sidebar.left") }
    }
}
```

Attach `SidebarCommands()` to the scene to get View ▸ Show/Hide Sidebar:

```swift
WindowGroup { ContentView() }
    .commands { SidebarCommands() }
```

Column widths: `.navigationSplitViewColumnWidth(min:ideal:max:)`. Selection via `List(selection:)` + `.tag`.

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Put navigation inside the sidebar List | Selection-driven detail |
| Fixed-width sidebar | `navigationSplitViewColumnWidth(min:ideal:max:)` |
| Remove the collapse affordance | Sidebar toggle in toolbar + View menu item |

---

## 7. Tables

macOS 12+ `Table` — the native spreadsheet-style list:

```swift
@State private var selection: Person.ID?
@State private var sortOrder: [KeyPathComparator<Person>] = [
    .init(\.name, order: .forward)
]

Table(people, selection: $selection, sortOrder: $sortOrder) {
    TableColumn("Name", value: \.name) { person in
        Text(person.name).bold()
    }
    TableColumn("Role", value: \.role)
    TableColumn("Score", value: \.score) { person in
        Text(person.score, format: .number)
    }
}
.tableStyle(.inset(alternatesRowBackgrounds: true))

// Custom sort logic only — value-based columns re-sort automatically via sortOrder
.onChange(of: sortOrder) { _, newOrder in
    people.sort(using: newOrder)
}
```

Row context menus (macOS 12+):

```swift
.contextMenu(forSelectionType: Person.ID.self) { ids in
    Button("Open") { open(ids) }
    Divider()
    Button(role: .destructive) { delete(ids) }
        label: { Text("Delete") }
        .disabled(ids.isEmpty)
}
```

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Grid of `Text` views pretending to be a table | Native `Table` with `TableColumn` |
| Unsortable, unselectable static columns | `sortOrder` + `selection` bindings |
| Table rows without right-click actions | `contextMenu(forSelectionType:)` |
| Thousands of rows in a `List` | `Table` (or virtualization) |

---

## 8. Keyboard, Focus & Selection

```swift
@FocusState private var focusedField: Field?
TextField("Name", text: $name)
    .focused($focusedField, equals: .name)
    .onSubmit { focusedField = .role }
```

- **Focus rings** are the macOS equivalent of touch targets — never remove them (`.focusEffectDisabled()` only for custom controls with their own ring).
- **Tab/Shift-Tab** moves focus between fields automatically; keep the field order logical.
- **Keyboard shortcuts** live in menus (`.keyboardShortcut`), not in view-local handlers.

```swift
// Key press handling (macOS 14+)
.onKeyPress(.return) { handleEnter(); return .handled }
.onKeyPress(.escape) { cancel(); return .handled }
.onKeyPress(keys: ["j", "k"]) { moveSelection(); return .handled }
```

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Menu items without shortcuts for frequent ops | `.keyboardShortcut` in `Commands` |
| Custom key handling that shadows ⌘C/V/X | Respect the standard pasteboard shortcuts |
| Stale menu validation | `@FocusedValue`-driven `.disabled` |
| Remove focus rings | Keep default rings; only custom controls opt out |

---

## 9. Mouse & Interaction

```swift
// Hover state
.onHover { hovering in isHovering = hovering }

// Continuous hover position (macOS 13+)
.onContinuousHover(coordinateSpace: .local) { phase in
    if case .active(let point) = phase { drawCursor(at: point) }
}

// Hover highlight (macOS 13+)
.hoverEffect(.highlight)

// Right-click context menu
.contextMenu {
    Button("Rename") { rename(item) }
    Button("Duplicate") { duplicate(item) }
    Divider()
    Button("Move to Trash", role: .destructive) { delete(item) }
}

// Tooltip
Button("Export") { export() }
    .help("Export the selection as JSON")
```

### Drag & drop

```swift
// Modern (macOS 13+)
List(items) { item in
    Text(item.name)
        .draggable(item) { Label(item.name, systemImage: "doc") }
}
.dropDestination(for: Item.self) { items, location in
    handleDrop(items, at: location)
    return true
}

// Legacy (macOS 11+): NSItemProvider
.onDrag { NSItemProvider(object: item.name as NSString) }
.onDrop(of: [.text], isTargeted: $isTargeted) { providers in
    providers.first?.loadObject(ofClass: NSString.self) { ... }
    return true
}
```

Interaction notes: hover reveals controls; natural scrolling works everywhere (`.scrollBounceBehavior(.basedOnSize)` macOS 13+); rows should support right-click even when selection is empty (menu disables, doesn't hide).

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| UI reachable only by hover | Mouse + keyboard + menu paths for every action |
| Opaque right-click gestures without menus | `.contextMenu` on every object |
| Drag sources without drop feedback | `dropDestination` + visual highlight |

---

## 10. Documents & Files

```swift
@main
struct DocApp: App {
    var body: some Scene {
        DocumentGroup(newDocument: MyDocument()) { file in
            ContentView(document: file.document)
        }
    }
}

struct MyDocument: FileDocument {
    static var readableContentTypes: [UTType] { [.json] }
    var text: String = ""

    init(text: String = "") { self.text = text }

    init(configuration: ReadConfiguration) throws {
        text = String(decoding: configuration.file.regularFileContents ?? Data(),
                      as: UTF8.self)
    }

    func fileWrapper(configuration: WriteConfiguration) throws -> FileWrapper {
        FileWrapper(regularFileWithContents: Data(text.utf8))
    }
}
```

- `FileDocument` (struct, value semantics) vs `ReferenceFileDocument` (class, undo support).
- DocumentGroup gives you File ▸ New/Open/Open Recent, autosave, and window restoration for free.
- Non-document open/save: `.fileImporter` / `.fileExporter` (see the data reference).
- **Sandboxed apps** need security-scoped bookmarks to reopen user-chosen files:

```swift
let bookmark = try url.bookmarkData(options: .withSecurityScope,
                                    includingResourceValuesForKeys: nil,
                                    relativeTo: nil)
// store; later:
let resolved = try URL(resolvingBookmarkData: bookmark,
                       options: .withSecurityScope, relativeTo: nil)
let ok = resolved.startAccessingSecurityScopedResource()
defer { resolved.stopAccessingSecurityScopedResource() }
```

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Hold file URLs after relaunch in a sandbox | Persist security-scoped bookmarks |
| Block the main thread reading/writing files | Async I/O (`Task` + nonisolated file ops) |
| Manually build Open/Save panels | `.fileImporter`/`.fileExporter` or DocumentGroup |

---

## 11. Sandboxing & App Store

Entitlements file (`.entitlements`):

```xml
com.apple.security.app-sandbox = YES
com.apple.security.files.user-selected.read-write = YES
com.apple.security.network.client = YES
com.apple.security.application-groups = TEAMID.group.name
com.apple.security.keychain-access-groups = ...
```

| Capability | Entitlement |
|---|---|
| Sandbox (App Store + distribution) | `com.apple.security.app-sandbox` |
| User-picked files (read/write) | `com.apple.security.files.user-selected.read-write` |
| Outbound network | `com.apple.security.network.client` |
| Share container with extensions/widgets | `com.apple.security.application-groups` |
| Inbound network (server) | `com.apple.security.network.server` |

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Assume arbitrary file access in a sandbox | Open panels + bookmarks for persisted access |
| Sign without the sandbox for App Store | Sandbox + hardened runtime on |
| Distribute without notarization | Notarize + staple; test the Gatekeeper flow |
| Hardcode team IDs | Inject via build settings (`TeamIdentifierPrefix`) |

Distribution checklist: sandbox enabled → hardened runtime → Developer ID or App Store signing → notarization → export and verify with `spctl --assess`.

---

## 12. AppKit Interop

SwiftUI covers most UI; bridge when you need mature AppKit widgets (WebKit, NSTableView-heavy grids, AVKit, custom menu bar items).

```swift
struct WebView: NSViewRepresentable {
    func makeNSView(context: Context) -> WKWebView {
        let view = WKWebView()
        view.navigationDelegate = context.coordinator
        return view
    }
    func updateNSView(_ nsView: WKWebView, context: Context) {
        // push SwiftUI state into the view
    }
    func makeCoordinator() -> Coordinator { Coordinator() }
}

struct LegacyGrid: NSViewControllerRepresentable {
    func makeNSViewController(context: Context) -> NSViewController { ... }
    func updateNSViewController(_ controller: NSViewController, context: Context) { ... }
}
```

Menu bar extras:

```swift
// SwiftUI (macOS 13+)
MenuBarExtra("Status", systemImage: "bolt") {
    Button("Open Main Window") { openMain() }
    Divider()
    Button("Quit") { NSApp.terminate(nil) }
}

// AppKit via delegate (rich status items)
final class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
        let item = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
        item.button?.image = NSImage(systemSymbolName: "bolt",
                                     accessibilityDescription: "Status")
        item.menu = NSMenu()
    }
}
```

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Rewrite a working NSTableView app in SwiftUI overnight | Wrap in `NSViewRepresentable` and migrate gradually |
| Bridge simple SwiftUI views into AppKit | Keep them SwiftUI; bridge only heavy/complex widgets |
| Two status items (MenuBarExtra + NSStatusBar) for one feature | One source of truth |

---

## 13. macOS Conventions Checklist

### Before every screen
- [ ] Keyboard: every frequent action has ⌘ shortcut + menu item
- [ ] Right-click context menu on rows/objects
- [ ] `.help` tooltips on icon-only controls
- [ ] Window resizes gracefully (`.windowResizability`, min size)
- [ ] Focus rings intact; Tab order logical
- [ ] Dark mode + accent color look intentional

### Before macOS release
- [ ] Sandbox enabled + entitlements correct
- [ ] Hardened runtime on; code signed for distribution
- [ ] Notarized; `spctl` passes on a clean machine
- [ ] File ▸ Open Recent / window restoration tested
- [ ] Drag & drop both directions tested
- [ ] Menu bar extras don't duplicate Dock/menu actions
- [ ] Help menu present and searchable (if custom)
- [ ] Multiple windows, full screen, and window zoom tested

---

> **Remember:** on macOS, the menu bar and the keyboard are the primary interface. If a command is only reachable by clicking a tiny toolbar icon, it is undiscoverable.
