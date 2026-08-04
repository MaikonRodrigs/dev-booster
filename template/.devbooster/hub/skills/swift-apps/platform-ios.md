# iOS Platform Guidelines (SwiftUI)

> iOS conventions for SwiftUI apps: HIG philosophy, Dynamic Type, SF Symbols, layout, navigation, components, accessibility.
> **Read when building for iPhone/iPad with SwiftUI. iOS conventions, Dynamic Type, SF Symbols, and iOS-specific SwiftUI patterns.**

---

## 1. Human Interface Guidelines Philosophy

### Clarity, Deference, Depth (condensed)

```
CLARITY:   legible text at every size; precise icons; subtle adornments; function over decoration
DEFERENCE: content is the star; chrome stays quiet; translucency hints at what's behind
DEPTH:     visual layers create hierarchy; transitions give context; touch reveals functionality
```

### Design values

| Value | In practice |
|---|---|
| **Aesthetic integrity** | Form follows function; a calculator doesn't look like a game |
| **Consistency** | System controls, standard patterns, familiar gestures |
| **Direct manipulation** | Content responds directly to touch (scroll, swipe, drag) |
| **Feedback** | Every action is acknowledged (haptic, state change, animation) |
| **Metaphors** | Real-world analogies (trash can, folders) aid learning |
| **User control** | User initiates; destructive actions are confirmable and reversible (Undo) |

iOS 26 Liquid Glass: system materials, tab bars, and controls adapt automatically. Prefer system components and let the new materials apply — don't fight them with hardcoded opaque backgrounds.

---

## 2. iOS Typography

### SF Pro families

```
SF Pro Text     → body & UI < 20pt
SF Pro Display  → large titles ≥ 20pt
SF Pro Rounded  → friendly contexts
SF Mono         → code, tabular data
SF Compact      → watchOS/small screens
```

### Dynamic Type scale

| Style | Default size | Weight | Use |
|---|---|---|---|
| **Large Title** | 34pt | Bold | Screen-level titles |
| **Title 1** | 28pt | Bold | Page titles |
| **Title 2** | 22pt | Bold | Section titles |
| **Title 3** | 20pt | Semibold | Subsection titles |
| **Headline** | 17pt | Semibold | Emphasized body |
| **Body** | 17pt | Regular | Primary content |
| **Callout** | 16pt | Regular | Secondary content |
| **Subhead** | 15pt | Regular | Tertiary content |
| **Footnote** | 13pt | Regular | Captions, timestamps |
| **Caption 1** | 12pt | Regular | Annotations |
| **Caption 2** | 11pt | Regular | Fine print |

### Dynamic Type is mandatory

```swift
// ❌ WRONG: fixed size — ignores the user's text-size setting
Text("Hello").font(.system(size: 17))

// ❌ WRONG: fixed custom font
Text("Hello").font(.custom("MyFont", size: 17))

// ✅ CORRECT: semantic style, scales with Dynamic Type
Text("Hello").font(.body)

// ✅ Custom font that still scales: relative to a semantic style
Text("Hello").font(.custom("MyFont", size: 17, relativeTo: .body))

// ✅ Let text breathe — avoid hard truncation everywhere
Text(longText).font(.body).lineLimit(2)
```

Test at every size: Settings ▸ Accessibility ▸ Display & Text Size ▸ Larger Text, from xSmall to the 53pt accessibility maximum. Layouts must not clip or overlap.

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| `.system(size:)` for body text | `.font(.body)` and friends |
| Custom fonts without `relativeTo:` | `font(.custom(_:size:relativeTo:))` |
| Truncate to one line everywhere | `lineLimit` + `minimumScaleFactor` sparingly |
| Fixed heights on text containers | Let intrinsic size grow |

---

## 3. iOS Color System

### Semantic colors (automatic dark mode)

```
Text:        .label, .secondaryLabel, .tertiaryLabel, .quaternaryLabel
Backgrounds: .systemBackground, .secondarySystemBackground, .tertiarySystemBackground,
             .systemGroupedBackground, .secondarySystemGroupedBackground
Fills:       .systemFill, .secondarySystemFill, .tertiarySystemFill, .quaternarySystemFill
Other:       .separator, .opaqueSeparator, .link, .tint
```

Use these, not hardcoded hex, and dark mode is free.

```swift
Text("Title").foregroundStyle(.label)
Text("Subtitle").foregroundStyle(.secondaryLabel)
List { ... }.scrollContentBackground(.hidden)   // iOS 16+ — show the background through
```

### Asset catalog + accent color

- Put brand colors in the asset catalog with **Any Appearance + Dark** variants; reference as `Color("Brand")`.
- Accent: asset named `AccentColor` (project setting) or `.tint(_:)` (iOS 15+) on a view.
- `@Environment(\.tintColor)` (iOS 17+) reads the current tint for custom drawing.

```swift
Button("Continue") { }
    .tint(.accentColor)             // or Color("Brand")

// Dynamic UIKit color for manual dark-mode logic
Color(uiColor: UIColor { traits in
    traits.userInterfaceStyle == .dark ? UIColor.systemIndigo : UIColor.systemTeal
})
```

### Contrast & accessibility

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Same color for background & content | ≥ 4.5:1 text contrast (WCAG AA), 3:1 for large text |
| Color alone conveys state | Pair with text/icon (`label` or shape) |
| Hardcoded hex for surfaces | Semantic colors + asset catalog variants |
| Rely on saturation differences in dark mode | Check with Accessibility Inspector "Color Contrast" |

---

## 4. Layout & Safe Areas

### Safe areas

```
┌──────────────────────────┐
│ ░░ Dynamic Island ░░     │  top inset (~59pt with status bar)
├──────────────────────────┤
│        content           │  safe area: 16pt margins, 8pt spacing grid
│        content           │
├──────────────────────────┤
│ ░░ Home indicator ░░     │  bottom inset (~34pt)
└──────────────────────────┘
```

- Default layout respects safe areas automatically — don't disable them casually.
- `.ignoresSafeArea()` is for **decorative** backgrounds (edge-to-edge color, full-bleed images) only; interactive content stays inside.

```swift
ZStack {
    Color("Brand").ignoresSafeArea()          // ✅ decorative background
    VStack { Button("Save") { } }             // stays safe
}

// ❌ WRONG: interactive button under the home indicator
Button("Save") { }
    .frame(maxHeight: .infinity)
    .ignoresSafeArea(.all)
```

### Margins & grid

| Element | Value |
|---|---|
| Screen-edge margin | 16pt (iPhone), 20pt+ (iPad) |
| Minimum spacing | 8pt (4pt only in compact, dense UI) |
| Content rhythm | multiples of 8pt |
| Card/row padding | 16pt |

Use `safeAreaPadding(.horizontal, 16)` (iOS 17+) or `padding(.horizontal, 16)`; avoid hand-placing absolute offsets.

### Touch targets: 44pt minimum

```swift
// ✅ 44×44pt minimum hit area, even for a small visual
Button { play() } label: { Image(systemName: "play.fill") }
    .frame(minWidth: 44, minHeight: 44)
    .contentShape(Rectangle())       // expands the tappable region

// ❌ WRONG: 20×20pt invisible target — an accessibility failure
Button { play() } label: { Image(systemName: "play.fill") }
```

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Targets < 44×44pt | `.frame(minWidth: 44, minHeight: 44)` + `contentShape` |
| Content under Dynamic Island / home indicator | Respect safe areas; `ignoresSafeArea` for decoration only |
| Less than 8pt between tappable neighbors | 8–12pt gap |

---

## 5. iOS Navigation Patterns

### NavigationStack (push)

```swift
NavigationStack {
    List(items) { item in
        NavigationLink(value: item) { Row(item) }
    }
    .navigationDestination(for: Item.self) { item in
        ItemDetail(item: item)                    // ✅ lazy, value-based push
    }
    .navigationTitle("Items")
    .navigationBarTitleDisplayMode(.large)        // or .inline
}
```

`NavigationLink(value:)` + `navigationDestination(for:)` beats `NavigationLink(destination:)`: destinations are lazy and typed, and you can push programmatically via `NavigationPath`.

### TabView rules

```
🏠        🔍        ➕        ❤️        👤
Home    Search    New      Saved    Profile

Rules:
├── 2–5 tabs (never more, never fewer than 2)
├── SF Symbol + label per tab (filled variant on selection)
├── One tab per top-level mode — no hidden "more"
└── Don't disable the tab bar; hide per-tab content instead
```

```swift
TabView {
    HomeView().tabItem { Label("Home", systemImage: "house") }
    SearchView().tabItem { Label("Search", systemImage: "magnifyingglass") }
    ProfileView().tabItem { Label("Profile", systemImage: "person") }
}
```

iOS 18+ renders the new floating tab bar automatically; iOS 26 applies Liquid Glass materials — keep using `.tabItem`.

### Sheets & detents

```swift
.sheet(isPresented: $showComposer) {
    ComposerView()
        .presentationDetents([.medium, .large])                 // iOS 16+
        .presentationDragIndicator(.visible)
        .presentationBackgroundInteraction(.enabled(upThrough: .medium))  // iOS 16.4+
}

// Full-screen immersive task
.fullScreenCover(isPresented: $showPlayer) { PlayerView() }
```

| Presentation | Use |
|---|---|
| `.sheet` (pageSheet) | Default secondary task |
| `.fullScreenCover` | Immersive (video, camera, onboarding) |
| `.presentationDetents` | Half-sheet workflows (iOS 16+) |
| `.alert` / `.confirmationDialog` | Critical or choice-based interruptions |

### Gestures: don't break system ones

- Edge-swipe back is expected — never disable or intercept the left-edge swipe.
- Swipe-down dismisses sheets — keep it unless the task demands otherwise (`interactiveDismissDisabled` only for required input).
- Long-press = context menu; two-finger scroll = nested scrolling (iPad).

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Override the back gesture | Use `NavigationStack` push/back semantics |
| 6+ tabs | 2–5 tabs |
| Full-screen cover for trivial tasks | Sheets with detents where possible |
| Custom "back" buttons that break swipe-back | System back + `.navigationTitle` |

---

## 6. iOS Components in SwiftUI

### Buttons

```swift
Button("Continue") { }.buttonStyle(.borderedProminent)  // primary, filled
Button("Cancel") { }.buttonStyle(.bordered)             // secondary, outline
Button { delete() } label: { Label("Delete", systemImage: "trash") }
    .buttonStyle(.bordered).tint(.red)
Button("Learn More") { }.buttonStyle(.plain)            // tertiary, text
```

Styles (iOS 15+): `.bordered`, `.borderedProminent`, `.tinted`, `.plain`, `.borderless`, `.automatic`. Use `ButtonRole(.destructive)` so destructive actions color correctly and confirm properly.

### Lists

```swift
List(items) { item in
    HStack { Text(item.title); Spacer(); Text(item.subtitle).foregroundStyle(.secondary) }
}
.listStyle(.insetGrouped)        // default iOS 14+ — rounded grouped cards
// .plain, .grouped, .sidebar (iPad)
```

### searchable

```swift
List(filtered) { item in Text(item.title) }
    .searchable(text: $query,
                placement: .navigationBarDrawer(displayMode: .always),
                prompt: "Search items")
    .searchSuggestions {
        Text("Recent: \(query)").searchCompletion(query)
        Text("Favorites").searchCompletion("favorites")
    }
    .searchScopes($scope) {
        Text("All").tag(Scope.all)
        Text("Favorites").tag(Scope.favs)
    }
```

### Segmented picker

```swift
Picker("Filter", selection: $filter) {
    Text("All").tag(Filter.all)
    Text("Active").tag(Filter.active)
    Text("Done").tag(Filter.done)
}
.pickerStyle(.segmented)
```

2–5 equal segments; text OR icons, not both mixed.

### Text fields & keyboards

```swift
@FocusState private var field: Field?

TextField("Email", text: $email)
    .keyboardType(.emailAddress)
    .textInputAutocapitalization(.never)
    .autocorrectionDisabled()
    .submitLabel(.next)
    .focused($field, equals: .email)
    .onSubmit { field = .password }

SecureField("Password", text: $password)
    .focused($field, equals: .password)
    .submitLabel(.go)
```

Keyboard config: `keyboardType(.numberPad/.decimalPad/.emailAddress/.URL)`, `.textInputAutocapitalization(.never/.words)`, `.returnKeyType(.done/.search)`, `.onSubmit`, and `.scrollDismissesKeyboard(.interactively)` (iOS 16+) to dismiss.

---

## 7. iOS-Specific Patterns

### Pull-to-refresh

```swift
List(items) { ... }
    .refreshable { await model.load(force: true) }   // iOS 15+, native spinner
```

### Swipe actions

```swift
.swipeActions(edge: .trailing, allowsFullSwipe: true) {
    Button(role: .destructive) { delete(item) }
        label: { Label("Delete", systemImage: "trash") }
}
.swipeActions(edge: .leading, allowsFullSwipe: false) {
    Button { pin(item) } label: { Label("Pin", systemImage: "pin") }.tint(.orange)
}
```

Trailing = destructive/edit; leading = constructive. Destructive actions red and last.

### Context menus

```swift
.contextMenu {
    Button("Copy", systemImage: "doc.on.doc") { copy(item) }
    Button("Share", systemImage: "square.and.arrow.up") { share(item) }
    Divider()
    Button(role: .destructive) { delete(item) }
        label: { Label("Delete", systemImage: "trash") }
}
```

Long-press on iOS. Preview via `.contextMenu(preview:)`. Max ~8 actions; destructive last and red.

### ShareLink

```swift
ShareLink(item: url, subject: Text("Check this out"))          // iOS 16+
ShareLink(item: text) { Label("Share", systemImage: "square.and.arrow.up") }
```

### Widgets & Live Activities (brief)

- **WidgetKit**: `StaticConfiguration`/`AppIntentConfiguration` + `TimelineProvider`; widget and app share data via an App Group container, not direct DB access.
- **Live Activities** (iOS 16.1+): ActivityKit — `ActivityConfiguration` in the widget extension, `ActivityAttributes` for state, updates via `ActivityCenter`.
- **App Intents** (iOS 16+): conform to `AppIntent`, use `@IntentParameter`, expose actions to Siri/Shortcuts/Spotlight.

---

## 8. SF Symbols

```swift
Image(systemName: "bell")
    .symbolVariant(.fill)                    // selected state: bell.fill (iOS 15+)
    .symbolRenderingMode(.hierarchical)      // monochrome | multicolor | palette | hierarchical
    .imageScale(.large)                      // .small .medium .large
    .foregroundStyle(.tint)

// Palette: two+ explicit colors (iOS 15+)
Image(systemName: "person.crop.circle.badge.plus")
    .symbolRenderingMode(.palette)
    .foregroundStyle(.blue, .red)

// Animated (iOS 17+)
Image(systemName: "checkmark.circle.fill")
    .symbolEffect(.bounce, value: didComplete)
Image(systemName: isPlaying ? "pause.fill" : "play.fill")
    .contentTransition(.symbolEffect(.replace))   // morph between symbols
```

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Custom icon when an SF Symbol exists | `Image(systemName:)` first; custom only when none fit |
| Fixed symbol color that breaks dark mode | `.foregroundStyle(.tint/.secondary)` |
| Assume a symbol exists on older iOS | Guard with `if UIImage(systemName:) != nil` or availability |
| Static icons where animation helps | `.symbolEffect` (iOS 17+) for state changes |

---

## 9. iOS Accessibility

### VoiceOver

```swift
Button { play() } label: { Image(systemName: "play.fill") }
    .accessibilityLabel("Play")
    .accessibilityHint("Starts the current track")

Text("\(count) items")
    .accessibilityLabel("\(count) items selected")   // state conveyed

// Combine decorative container content (sparingly)
VStack { ... }.accessibilityElement(children: .combine)
```

Every interactive element: label (what), hint (optional — how/why), traits (`.isButton`, `.isSelected`, `.isHeader`), value (current state). SwiftUI buttons get traits automatically — add labels for icon-only controls.

### Dynamic Type scaling

- Semantic fonts scale automatically; verify from xSmall to the accessibility max (53pt body).
- Fixed-size views (badges, graphs) may need `.minimumScaleFactor` or a layout change at accessibility sizes.
- `@Environment(\.sizeCategory)` to branch when needed — rarely.

### Reduce Motion & contrast

```swift
@Environment(\.accessibilityReduceMotion) private var reduceMotion
@Environment(\.accessibilityContrast) private var contrast     // iOS 17+

if reduceMotion {
    // instant transitions
} else {
    // animating presentation
}
```

### Testability & Voice Control

```swift
.accessibilityIdentifier("login_button")   // XCUITest: app.buttons["login_button"]
```

Voice Control users trigger by visible label — keep text labels meaningful; avoid labels that differ wildly from visible text.

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Unlabeled icon buttons | `accessibilityLabel` on every icon-only control |
| Rely on color/shape alone | Label + hint + traits + value |
| Long combined accessibility elements | One focused element per logical control |
| Custom animations ignoring Reduce Motion | Respect `accessibilityReduceMotion` |

---

## 10. iOS Checklist

### Before every screen
- [ ] Safe areas respected; interactive content never under Dynamic Island/home indicator
- [ ] All text uses Dynamic Type styles (or `relativeTo:` custom fonts)
- [ ] Touch targets ≥ 44×44pt
- [ ] Dark mode looks intentional (semantic colors)
- [ ] VoiceOver: every control labeled; state conveyed
- [ ] SF Symbols used where available; correct variant for selection

### Before iOS release
- [ ] All orientations & split view (iPad) tested
- [ ] Keyboard: no occlusion, `.scrollDismissesKeyboard`, submit flows
- [ ] Offline states: loading/empty/failed for every network screen
- [ ] Localization: base language + at least one target; RTL if applicable
- [ ] Dynamic Type at accessibility sizes audited
- [ ] VoiceOver + Voice Control smoke test on key flows
- [ ] Reduced Motion respected
- [ ] Low Power Mode and background/foreground transitions handled
- [ ] Widgets/Live Activities/App Intents if shipped: timeline refresh and expiration handled

---

> **Remember:** iOS users judge an app by whether it feels native in the first seconds. System components, Dynamic Type, safe areas, and standard gestures are not optional polish — they are the baseline.
