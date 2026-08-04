# SwiftUI Core Reference

> Read when building SwiftUI views, state, navigation, lists, or animations on any Apple platform.
> **This file covers where AI-generated SwiftUI fails: layout, modifier order, state ownership, and laziness.**

---

## 1. The View Protocol

- Every view is a `struct`: `struct ContentView: View { var body: some View { ... } }`.
- `@ViewBuilder` lets a `body` return multiple views (conditionals, `switch`, `ForEach`). Builders have a practical arity limit (~10 views) — extract subviews when a body grows.
- `ViewModifier` encapsulates reusable appearance/behavior; apply with `.modifier(MyModifier())`.
- Custom modifiers via `extension View` — the ergonomic, discoverable pattern.
- Single responsibility: one view, one job. Small bodies are testable and diff-friendly.

```swift
struct ProfileHeader: View {
    let user: User

    var body: some View {
        HStack(spacing: 12) {
            AvatarView(url: user.avatarURL)
            VStack(alignment: .leading) {
                Text(user.name).font(.headline)
                Text(user.bio).font(.subheadline).foregroundStyle(.secondary)
            }
        }
    }
}

// ❌ WRONG: 200-line body — recomputed as a whole, impossible to reason about
```

---

## 2. Layout System

### Stack Comparison

| Container | Behavior | Use |
| --- | --- | --- |
| `VStack`/`HStack`/`ZStack` | Layouts all children eagerly | Small, fixed content |
| `Grid`/`GridRow` (iOS 16+) | Aligned columns/rows | Tables, forms, dashboards |
| `LazyVStack`/`LazyHStack` | Creates children on demand | Inside `ScrollView`, large data |
| `List` | Built-in lazy + cell reuse | Standard scrolling content |

### Key Tools

- `Spacer(minLength:)` — pushes content apart; alignment controls placement.
- `.padding(_:)` — space around content (order-sensitive, see §3).
- `.frame(minWidth:idealWidth:maxWidth:minHeight:idealHeight:maxHeight:alignment:)` — expand or constrain.
- `.fixedSize()` — let content take its natural (ideal) size (e.g., a button hugging its label).
- `GeometryReader` — exposes `proxy.size`/`proxy.frame(in:)`; **use sparingly**: it expands to fill all space and recomputes on every layout pass. Prefer `.containerRelativeFrame` (iOS 17+).
- `.safeAreaInset(edge:alignment:spacing:)` (iOS 15+) — reserve space for pinned UI without `.ignoresSafeArea`.
- `.containerRelativeFrame(.horizontal) { length, axis in ... }` (iOS 17+) — divide the container into proportional pieces.

```swift
// ✅ CORRECT: safe-area-respecting, lazy list with pinned footer
ScrollView {
    LazyVStack(spacing: 12) {
        ForEach(items) { ItemRow(item: $0) }
    }
    .padding(.horizontal)
}
.safeAreaInset(edge: .bottom) { ActionBar() }

// ❌ WRONG: ScrollView + VStack over 10,000 rows — builds every row eagerly
```

---

## 3. Modifier Order

Order matters — each modifier wraps the result of the previous one:

- `.padding()` then `.background()` → background covers the padding (badge look).
- `.background()` then `.padding()` → background only under the original content.
- `.frame()` then `.clipShape()` vs the reverse → different clip regions.
- Padding outside affects hit area; padding inside does not.

```swift
// ✅ CORRECT: background covers padding — padded capsule badge
Text("New")
    .padding(8)
    .background(Color.accentColor, in: Capsule())

// ❌ WRONG: padding applied after background — no capsule padding
Text("New")
    .background(Color.accentColor, in: Capsule())
    .padding(8)
```

```swift
// ✅ CORRECT: custom modifier as a View extension
struct CardStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(16)
            .background(.background, in: RoundedRectangle(cornerRadius: 12))
    }
}
extension View {
    func cardStyle() -> some View { modifier(CardStyle()) }
}
```

---

## 4. State & Data Flow

### Modern (Preferred)

| Property wrapper | Purpose | Minimum |
| --- | --- | --- |
| `@State` | View-owned value | iOS 13 |
| `@Binding` | Read/write a source owned elsewhere | iOS 13 |
| `@Observable` + `@State` | Reference model with granular invalidation | iOS 17 |
| `@Bindable` | Create bindings into `@Observable` properties | iOS 17 |
| `@Environment` | Read values injected into the hierarchy | iOS 13 |
| `@AppStorage` | Persist to UserDefaults | iOS 14 |
| `@SceneStorage` | Per-scene transient state (navigation restoration) | iOS 14 |
| `@FocusState` | Keyboard focus control | iOS 15 |

### Legacy (Existing Code Only — Prefer @Observable for New Code)

| Property wrapper | Legacy role |
| --- | --- |
| `@StateObject` | Own a reference `ObservableObject` model |
| `@ObservedObject` | Reference a model owned elsewhere |
| `@EnvironmentObject` | Dependency-inject a model down the tree |

### The @Observable Pattern (iOS 17+)

```swift
@Observable
final class LibraryModel {
    var query = ""
    var books: [Book] = []
    func search() async { ... }
}

struct LibraryView: View {
    @State private var model = LibraryModel()

    var body: some View {
        @Bindable var model = model          // ✅ @Bindable for $bindings
        TextField("Search books", text: $model.query)
    }
}
```

### State Ownership Rules

- One source of truth per piece of state; lift state to the nearest common ancestor.
- Derived values are computed properties — never duplicated `@State`.
- View-local flags → `@State`; shared app state → `@Observable` model injected via `@Environment`.
- ❌ Never mirror the same data in multiple places — sync bugs are inevitable.

---

## 5. Navigation

| API | Purpose | Minimum |
| --- | --- | --- |
| `NavigationStack(path:)` | Stack navigation with type-safe path | iOS 16 |
| `navigationDestination(for:)/(item:)` | Register destinations | iOS 16 / iOS 17 |
| `NavigationSplitView` | iPad/macOS master–detail | iOS 16 |
| `TabView` + `Tab` | Tab bar (new `Tab` syntax) | iOS 18 |
| `.sheet(item:)` / `.fullScreenCover(item:)` | Modal presentation | iOS 14 |
| `.alert` / `.confirmationDialog` | Alerts, confirmations | iOS 15 |
| `.popover(item:)` | Popover presentation | iOS 14.5+ |

```swift
struct RootView: View {
    @State private var path: [Item] = []
    @State private var selectedItem: Item?

    var body: some View {
        NavigationStack(path: $path) {
            List(items) { item in
                NavigationLink(value: item) { Text(item.name) }
            }
            .navigationDestination(for: Item.self) { ItemDetail(item: $0) }
        }
        .sheet(item: $selectedItem) { ItemDetail(item: $0) }
    }
}
```

```swift
// ❌ WRONG: Bool flag + stale optional — race between dismissal and content
.sheet(isPresented: $showDetail) { ItemDetail(item: pendingItem!) }

// ✅ CORRECT: Identifiable Optional drives presentation AND content atomically
.sheet(item: $selectedItem) { item in
    ItemDetail(item: item)
}
```

---

## 6. Lists

- `List` + `ForEach(items)` with `Identifiable` models — never `ForEach(items.indices)`.
- Stable identity: `.id(_:)` only when identity isn't derived from the model; changing an id recreates the row.
- Sections: `Section("Header") { ... }`; grouped styles: `.listStyle(.insetGrouped)` on iOS.
- Swipe: `.swipeActions(edge: .trailing, allowsFullSwipe: true)` with `Button(role: .destructive)`.
- `.refreshable { await model.reload() }` (iOS 15+).
- `.searchable(text: $model.query, placement: .navigationBarDrawer(displayMode: .always))` (iOS 15+).
- Edit mode: `.environment(\.editMode, $editMode)` + `.onDelete`/`.onMove`.
- Row height: let content define it; add `.frame(minHeight: 44)` for comfortable tap targets.

```swift
struct ItemsList: View {
    let items: [Item]

    var body: some View {
        List {
            Section("Items") {
                ForEach(items) { item in
                    HStack { Text(item.title); Spacer() }
                }
                .onDelete { items.remove(atOffsets: $0) }
            }
        }
        .listStyle(.insetGrouped)
        .refreshable { await model.reload() }
        .searchable(text: $model.query)
    }
}
```

---

## 7. Controls

| Control | Key API | Notes |
| --- | --- | --- |
| Button | `Button(role: .destructive)`, `.buttonStyle(.borderedProminent)` | Add `.keyboardShortcut` for defaults |
| TextField/SecureField | `onSubmit`, `@FocusState`, `.textFieldStyle(.roundedBorder)` | `.submitLabel(.search)` |
| Toggle | `Toggle("Wi‑Fi", isOn: $on)` | `.tint` |
| Slider | `Slider(value: $v, in: 0...100)` | `step:` for discrete values |
| Stepper | `Stepper("Count", value: $n, in: 0...10)` | |
| DatePicker | `DatePicker(selection:displayedComponents:)` | `.date` / `.hourAndMinute` |
| Picker | `.pickerStyle(.menu / .segmented / .wheel)` | Segmented ≤ 3 options |
| Menu | `Menu("Actions") { Button... }` | Overflows for many actions |
| contextMenu | `.contextMenu { Button... }` | Long-press / right-click |
| ProgressView | `ProgressView(value:progress:)`, `.progressViewStyle(.linear)` | Determinate vs indeterminate |
| Link | `Link("Docs", destination: url)` | Opens in default browser |
| ShareLink | `ShareLink(item:)` (iOS 16+) | Share sheet |

---

## 8. Images & SF Symbols

- SF Symbols: `Image(systemName: "house.fill")` + `.symbolRenderingMode(.monochrome/.hierarchical/.palette/.multicolor)`, `.symbolVariant(.fill)`, `.foregroundStyle(.primary, .secondary)`, `.imageScale(.large)`.
- `AsyncImage(url:)` (iOS 15+) — **no caching by default**: configure `URLCache` or cache manually for repeated loads.
- `.resizable().scaledToFit()` then `.frame(...)`; `.interpolation(.none)` for pixel art.

```swift
Image(systemName: symbolName)
    .symbolRenderingMode(.hierarchical)
    .foregroundStyle(.tint)
    .font(.title)
```

---

## 9. Animation

| API | Purpose | Minimum |
| --- | --- | --- |
| `withAnimation` | Animate state-driven changes | iOS 13 |
| `.animation(_:value:)` | Implicit animation scoped to a value | iOS 13 |
| `.transition` | Insert/remove transitions | iOS 13 |
| `matchedGeometryEffect(id:in:)` | Shared-element movement | iOS 14 |
| `.spring(duration:bounce:)` | Modern spring (replaces `response:dampingFraction:`) | iOS 17 |
| `keyframeAnimator` | Multi-keyframe value animation | iOS 17 |
| `phaseAnimator` | Phased state animation | iOS 17 |

- Respect Reduce Motion: read `@Environment(\.accessibilityReduceMotion)` and replace movement with opacity.

```swift
// ✅ CORRECT: value-scoped animation
.animation(.spring(duration: 0.4, bounce: 0.3), value: isExpanded)

// ❌ WRONG: implicit animation without a value — animates on ANY state change
.animation(.default)
```

---

## 10. Accessibility & Dynamic Type

- Semantic styles: `.font(.body)`, `.title`, `.headline`, `.caption` — NEVER `.font(.system(size: 14))` for content.
- `.accessibilityLabel("...")`, `.accessibilityHint("...")`, `.accessibilityValue`.
- `.accessibilityAddTraits(.isButton)` for custom tappable views.
- `.accessibilityElement(children: .combine)` to group related elements.
- `.accessibilityIdentifier("login.button")` — stable hook for UI tests.
- Cap Dynamic Type (`.dynamicTypeSize(...)`) only when a layout genuinely breaks; prefer testing instead.

---

## 11. Previews

```swift
#Preview("List", traits: .sizeThatFits) {
    ItemsList(items: .sample)
}

#Preview("Dark + AX", traits: .dynamicTypeSize(.accessibility2)) {
    ItemsList(items: .sample)
        .preferredColorScheme(.dark)
}

#Preview("iPad") {
    ItemsList(items: .sample)
        .previewDevice(PreviewDevice(rawValue: "iPad Pro 11-inch (M4)"))
}
```

- `#Preview` macro (Xcode 15+). Always use `.sample` data — never real network or production data.

---

## 12. Performance

- **`body` must be cheap**: no I/O, no decoding, no heavy math. Precompute in the model.
- `@Observable` invalidates only views reading changed properties — vs `ObservableObject` whole-object invalidation.
- Lists: `Identifiable` with stable ids; `LazyVStack`/`List` for scrollable data; never `ForEach(items.indices)`.
- Avoid `AnyView` — it erases type and breaks structural diffing. Use `@ViewBuilder`/generics instead.
- `.equatable()`/`EquatableView` only after Instruments proves the need — not a default habit.
- Prefer `@State` value types; heavy `@Published` churn re-renders more views than needed.

---

## 13. SwiftUI Checklist

### Before Every View

- [ ] Body small (< ~100 lines)? Subviews extracted?
- [ ] Semantic fonts? Safe areas respected?
- [ ] Loading / error / empty states present?
- [ ] Lazy container for large data?
- [ ] Accessibility labels on interactive elements?
- [ ] `#Preview` added with sample data?

### Before Release

- [ ] Runs in Dark Mode?
- [ ] Dynamic Type AX sizes render without truncation?
- [ ] Reduce Motion respected?
- [ ] No `GeometryReader` sprawl?
- [ ] Instruments: no body recomputation storms?
- [ ] Navigation state restored (`@SceneStorage`/path binding)?
