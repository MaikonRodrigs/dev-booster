---
name: swift-apps
description: Swift and SwiftUI for native Apple apps (iOS, iPadOS, macOS, watchOS, tvOS). Language, SwiftUI views and state, SwiftData/Core Data, platform guidelines, and testing. Use when building or editing native Apple apps with SwiftUI, when the project contains .xcodeproj/.swift files, or when working on Swift language, SwiftUI, AppKit/UIKit bridges, SwiftData, or native Apple platform features. Triggers on swift, swiftui, xcode, ios, ipados, macos, watchos, tvos, swift data, appkit, uikit.
allowed-tools: Read, Glob, Grep, Bash, Edit, Write
---

# Swift & SwiftUI (Apple Platforms)

> **Philosophy:** Native-first. Platform-respectful. SwiftUI by default, AppKit/UIKit when needed.
> **Core Principle:** Apple platforms are not websites. Swift concurrency is not optional. ASK platform, deployment target, and architecture before writing code.

---

## 🔴 MANDATORY: Read Reference Files Before Working!

**⛔ DO NOT start development until you read the relevant files:**

### Universal (Always Read)

| File | Content | Status |
| --- | --- | --- |
| **[swift-language.md](swift-language.md)** | **Swift fundamentals, concurrency, memory — foundation of every Apple app** | **⬜ CRITICAL FIRST** |
| **[swiftui-core.md](swiftui-core.md)** | **Views, layout, state, navigation, lists, animation** | **⬜ CRITICAL** |
| **[swiftui-data.md](swiftui-data.md)** | **SwiftData/Core Data, persistence, Codable, async loading** | **⬜ CRITICAL** |
| **[swiftui-testing.md](swiftui-testing.md)** | **XCTest, Swift Testing, UI tests, testability** | **⬜ CRITICAL** |
| [platform-ios.md](platform-ios.md) | iOS/iPadOS HIG, Dynamic Type, SF Symbols, safe areas | ⬜ Read |
| [platform-macos.md](platform-macos.md) | macOS menus, windows, toolbars, keyboard, sandbox | ⬜ Read |
| [platform-watchos-tvos.md](platform-watchos-tvos.md) | watchOS/tvOS constraints, focus engine, complications | ⬜ Read |

> 🧠 **swift-language.md is PRIORITY!** Swift 6 concurrency cannot be learned from SwiftUI alone.
> 🛠️ **Xcode builds, simulators, signing, and shipping → load the `xcode-cli` skill** (`.devbooster/hub/personas/skill_xcode-cli.md`). This skill covers code, not tooling.

### Platform-Specific (Read Based on Target)

| Platform | File | Content | When to Read |
| --- | --- | --- | --- |
| **iOS / iPadOS** | [platform-ios.md](platform-ios.md) | HIG, safe areas, Dynamic Type, SF Symbols | Building for iPhone/iPad |
| **macOS** | [platform-macos.md](platform-macos.md) | Menu bar, windows, keyboard, sandbox | Building for Mac |
| **watchOS / tvOS** | [platform-watchos-tvos.md](platform-watchos-tvos.md) | Small screens, focus engine, complications | Building for Watch/TV |

> 🔴 **macOS project? Read platform-macos.md FIRST!** Menu bar, keyboard focus, windows, and sandbox rules break iOS habits.
> 🔴 **watchOS project? Read platform-watchos-tvos.md FIRST!** Tiny screens change every layout decision.
> 🧠 **Design depth?** The `mobile-design` skill's `platform-ios.md` covers HIG visual details; this skill covers the code.

---

## ⚠️ CRITICAL: ASK BEFORE ASSUMING (MANDATORY)

> **STOP! If the request is open-ended, DO NOT default to your favorites.**

| Aspect | Ask | Why |
| --- | --- | --- |
| **Platform** | "iOS, iPadOS, macOS, watchOS, tvOS, or visionOS?" | Changes navigation, layout, lifecycle, and HIG |
| **Deployment target** | "Minimum OS version?" | iOS 17 vs 16 changes the entire API surface |
| **Swift / Xcode version** | "Swift 5 or 6? Xcode 16 or 26?" | Swift 6 makes strict concurrency mandatory |
| **UI framework** | "SwiftUI, UIKit, or AppKit?" | SwiftUI default; UIKit/AppKit only for complex custom UI |
| **State / architecture** | "@Observable or ObservableObject?" | @Observable (iOS 17+) is the modern default |
| **Data layer** | "SwiftData, Core Data, remote, or files?" | Persistence shapes models and concurrency |
| **Apple frameworks** | "Which? (StoreKit, MapKit, HealthKit…)" | Each brings entitlements and its own rules |
| **Code signing** | "Is a signing team available?" | Device builds fail without it |
| **Mac sandbox** | "Sandbox enabled? Which entitlements?" | Required for macOS App Store distribution |

---

## ⛔ AI SWIFT ANTI-PATTERNS (YASAK LİSTESİ)

> 🚫 **These are AI default tendencies that MUST be avoided!**
> 🚫 **If you recognize one of these in your draft, STOP and fix it before proceeding.**

#### Performance Sins

| ❌ NEVER DO | Why It's Wrong | ✅ ALWAYS DO |
| --- | --- | --- |
| **Huge `View` body (>200 lines)** | Recomputed as a whole; unreadable, untestable | Small bodies; extract subviews |
| **Non-lazy `ForEach` over large datasets** | Every row built up front; memory spikes | `List` or `LazyVStack`/`LazyHStack` |
| **`@Published` churn on whole models** | Re-renders every observer for one change | `@Observable` granular tracking (iOS 17+) |
| **Force-unwrapping (`!`, `try!`, `as!`)** | Production crashes on nil | `guard`/`if let`, `throws`, `Result` |
| **Disk/network work in `body`** | Blocks the main thread; jank | `async`/`await` in a model/service layer |
| **Unstable list identity** | Rows recreated, focus and scroll lost | Stable, unique `Identifiable` ids |

#### SwiftUI Sins

| ❌ NEVER DO | Why It's Wrong | ✅ ALWAYS DO |
| --- | --- | --- |
| **Fixed font sizes (`system(size:)`)** | Breaks Dynamic Type accessibility | Semantic styles: `.font(.body/.title)` |
| **Ignoring safe areas / `.ignoresSafeArea()` everywhere** | Content under home indicator or notch | Respect safe area; `safeAreaInset` for pinned UI |
| **Wrong `.frame`/`.padding` order** | Wrong sizes, clipped content | Order modifiers deliberately (swiftui-core §3) |
| **`AnyView` to hide bad types** | Erases type; breaks structural identity | `@ViewBuilder`, generics, `Group` |
| **`ScrollView` + `VStack` for lists** | Builds every row eagerly | `LazyVStack`/`LazyHStack`/`List` |
| **Screens without `#Preview`** | Slow iteration, broken layouts slip through | `#Preview` for every screen and state |

#### Architecture Sins

| ❌ NEVER DO | Why It's Wrong | ✅ ALWAYS DO |
| --- | --- | --- |
| **Business logic in views** | Untestable, duplicated across screens | `@Observable` model + service layer |
| **No model layer** | Logic scattered through UI | Own domain logic in models; views render |
| **Singletons everywhere** | Hidden dependencies, untestable | Inject via `init` or `@Environment` |
| **Massive `ObservableObject`** | Whole-object invalidation, re-render storms | Split models; prefer `@Observable` |

#### Xcode / Build Sins

| ❌ NEVER DO | Why It's Wrong | ✅ ALWAYS DO |
| --- | --- | --- |
| **Claiming done without building** | Broken code ships | Build, run, and test before claiming |
| **Ignoring signing errors** | App won't install on device | Configure team; resolve signing first |
| **Wrong deployment target** | Uses APIs newer than min OS | Set target; `if #available` guards |

---

## 📝 CHECKPOINT (MANDATORY Before Any Swift Work)

> **Before writing ANY Swift code, you MUST complete this checkpoint:**

```
🧠 CHECKPOINT:

Platform:      [ iOS / iPadOS / macOS / watchOS / tvOS / visionOS ]
Deployment:    [ e.g. iOS 17+ / macOS 14+ ]
Swift/Xcode:   [ e.g. Swift 6.0 / Xcode 16 / Xcode 26 ]
UI Framework:  [ SwiftUI / UIKit / AppKit ]
Files Read:    [ List the skill files you've read ]

3 Principles I Will Apply:
1. _______________
2. _______________
3. _______________

Anti-Patterns I Will Avoid:
1. _______________
2. _______________
3. _______________
```

**Example:**

```
🧠 CHECKPOINT:

Platform:      iOS (iPhone + iPad)
Deployment:    iOS 17+
Swift/Xcode:   Swift 6.0, Xcode 16
UI Framework:  SwiftUI
Files Read:    swift-language.md, swiftui-core.md, platform-ios.md

3 Principles I Will Apply:
1. @Observable models + @Bindable bindings (no ObservableObject)
2. List/LazyVStack for all scrolling data, stable IDs
3. Semantic fonts + Dynamic Type everywhere

Anti-Patterns I Will Avoid:
1. Force unwrapping optionals in UI code
2. 200-line View bodies → extract subviews
3. Disk/network work in body → async model layer
```

> 🔴 **Can't fill the checkpoint? → GO BACK AND READ THE SKILL FILES.**
> 🔴 **Re-run the checkpoint after any platform, deployment-target, or architecture change.**

---

## 🧭 Platform & Framework Decision Tree

```
WHAT ARE YOU BUILDING?
        │
        ├── Native Apple app
        │   ├── iOS/iPadOS → SwiftUI (UIKit only for exotic custom UI)
        │   ├── macOS → SwiftUI + AppKit bridges when needed
        │   ├── watchOS → SwiftUI (tiny screens, complications)
        │   └── tvOS → SwiftUI (focus engine)
        │
        ├── Cross-platform (Android too)
        │   └── React Native / Flutter ONLY if the team mandates it
        │
        └── Web + mobile from one codebase
            └── Not Swift — use the existing web stack

PERSISTENCE:
        ├── New app, iOS 17+ → SwiftData (@Model)
        ├── Legacy app / complex queries → Core Data
        ├── Need iCloud sync → SwiftData + CloudKit
        └── Tiny preferences → @AppStorage / UserDefaults

CONCURRENCY & STATE:
        ├── UI state → @Observable (iOS 17+), NOT Combine
        ├── Async work → async/await + Task
        ├── Streams/events → AsyncSequence / AsyncStream
        └── Existing Combine pipelines → keep, migrate gradually
```

| Need | Choose | Why |
| --- | --- | --- |
| Default UI framework | **SwiftUI** | Declarative, all Apple platforms, modern default |
| Complex custom UI | **UIKit (iOS) / AppKit (macOS)** | Wrap via `UIViewRepresentable`/`NSViewRepresentable` |
| New persistence | **SwiftData** | iOS 17+, macro-based, async-friendly |
| Legacy persistence | **Core Data** | Mature, complex queries, existing code |
| UI state | **@Observable** | Granular invalidation, minimal re-renders |
| Async work | **async/await** | Standard since Swift 5.5; mandatory in Swift 6 |
| Reactive pipelines | **Combine** | Legacy only — prefer async/await + @Observable |
| Xcode builds/shipping | **xcode-cli skill** | `xcodebuild`, `simctl`, signing, notarization |

| Element | iOS/iPadOS | macOS | watchOS/tvOS |
| --- | --- | --- | --- |
| Primary UI | SwiftUI | SwiftUI + AppKit | SwiftUI |
| Back navigation | Edge swipe / nav bar | Toolbar / ⌘[ | Swipe back |
| Menus | None | Menu bar (`Commands`) | None |
| Windows | Full screen | Multiple windows (`WindowGroup`) | Full screen |
| Pointer | Touch | Mouse + keyboard | Focus engine |

---

## 📋 Pre-Development Checklist

### Before Starting ANY Apple Project

- [ ] **Platform confirmed?** (iOS/iPadOS/macOS/watchOS/tvOS)
- [ ] **Deployment target set?** (matches the APIs you plan to use)
- [ ] **Swift language mode decided?** (5 vs 6 — strict concurrency)
- [ ] **UI framework chosen?** (SwiftUI by default)
- [ ] **Xcode project/target created?** (or Swift Package for library code)
- [ ] **Code signing team configured?** (device builds)
- [ ] **App icon + asset catalog set up?**
- [ ] **Info.plist keys documented?** (camera, location, network usage, etc.)
- [ ] **macOS: sandbox + entitlements planned?**
- [ ] **Localization strategy?** (String Catalog)
- [ ] **Architecture decided?** (@Observable models, service layer)

> **Swift 6 concurrency setting:** `SWIFT_STRICT_CONCURRENCY = complete` (or Swift 6 language mode) in Build Settings. Swift 6.1+ can opt into `SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor` (SE-0466) for new app targets.

### Before Every Screen/View

- [ ] **Semantic fonts, not fixed sizes?**
- [ ] **Safe areas respected?**
- [ ] **Loading / error / empty states?**
- [ ] **Dark mode tested?**
- [ ] **Dynamic Type tested (AX sizes)?**
- [ ] **VoiceOver labels on interactive elements?**
- [ ] **Lists lazy with stable IDs?**

### Before Build / PR

- [ ] **Builds cleanly (⌘B / `xcodebuild`)?**
- [ ] **Tests pass (Swift Testing / XCTest)?**
- [ ] **Swift 6 strict concurrency clean — zero errors/warnings?**
- [ ] **Product → Analyze: zero warnings?**
- [ ] **No force unwraps in production paths?**
- [ ] **No `print()`/debug logs left?**

---

## 📚 Reference Files

For deeper guidance on specific areas:

| File | When to Use |
| --- | --- |
| [swift-language.md](swift-language.md) | **FIRST!** Swift syntax, concurrency, memory — read before any code |
| [swiftui-core.md](swiftui-core.md) | Building SwiftUI views, layout, state, navigation, animation |
| [swiftui-data.md](swiftui-data.md) | SwiftData/Core Data, persistence, Codable, async loading |
| [swiftui-testing.md](swiftui-testing.md) | Unit + UI testing, Swift Testing, XCUITest |
| [platform-ios.md](platform-ios.md) | iOS/iPadOS design, HIG, Dynamic Type, SF Symbols |
| [platform-macos.md](platform-macos.md) | macOS design, menu bar, windows, sandbox |
| [platform-watchos-tvos.md](platform-watchos-tvos.md) | watchOS/tvOS constraints, focus, complications |
| [`xcode-cli` skill](../xcode-cli/SKILL.md) | Xcode builds, simulators, signing, notarization, SwiftPM CLI |

> The 4 CRITICAL files load before any Swift work; the platform files load per target. Tooling lives in the `xcode-cli` skill.

---

> **Remember:** Apple users expect instant launch and buttery scrolling. If it doesn't feel native, it's wrong. If it doesn't compile under Swift 6 strict concurrency, it doesn't ship.

# Content from platform-ios.md

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

# Content from platform-macos.md

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

# Content from platform-watchos-tvos.md

# watchOS & tvOS Platform Guidelines (SwiftUI)

> watchOS and tvOS conventions: glanceability, focus engine, crown, complications, WatchConnectivity, Top Shelf.
> **Read when building for watchOS or tvOS with SwiftUI. Compact, focused differences for wearable and TV screens.**

---

## 1. watchOS Philosophy

Interactions are measured in seconds. The watch is an accessory to the phone, not a replacement.

```
GLANCEABILITY: one glance = one answer
├── Primary value visible immediately
├── No menus, no settings, no search
└── One action per screen, reachable in one tap

BATTERY: every animation, sensor read, and network call costs battery
├── Prefer cached/computed data over live fetches
├── Defer heavy work to the iPhone via WatchConnectivity
└── Respect Always-On display (Luminance Reduced)

CONTEXT: the watch knows where you are (workout, notification, time)
├── Complications show at-a-glance data
└── Short interactions: answer, log, move on
```

| Design value | Implementation |
|---|---|
| **Glanceable** | Max 2–3 pieces of information per screen |
| **Short interactions** | Primary action first; no onboarding on-watch |
| **Battery-aware** | Cache, batch, and defer network work |
| **Phone-assisted** | Heavy logic/config lives in the iOS app |

---

## 2. watchOS SwiftUI Patterns

### Navigation (watchOS 10+)

```swift
// Stack navigation (watchOS 10+ redesign)
NavigationStack {
    List { ... }
        .navigationTitle("Tasks")
}

// Split view for list + detail (watchOS 10+)
NavigationSplitView {
    List(selection: $selection) { ... }
} detail: {
    DetailView()
}

// Paging between screens
TabView {
    TimelineView()
    StatsView()
}
.tabViewStyle(.page(indexDisplayMode: .automatic))
```

### Touch targets & type

- 44pt minimum targets (same rule as iOS, smaller screen — verify on 40mm and 46mm cases).
- Dynamic Type mandatory; semantic fonts; test Large accessibility sizes (text gets huge on a 40mm face).

### Digital Crown

```swift
@State private var progress = 0.0

ScrollView {
    ProgressView(value: progress)
}
.focusable()                                          // crown input requires focus
.digitalCrownRotation($progress, from: 0, through: 1, by: 0.01)
```

Crown is for: zoom, scrub, scroll, value entry. It replaces precision pinch/scroll on the small screen. Reserve `.digitalCrownAccessory(.visible)` for toolbars when needed.

### Always-On display

```swift
@Environment(\.isLuminanceReduced) private var dimmed  // true during Always-On

Text("\(steps) steps")
    .privacySensitive()          // hides the value on Always-On / glance
    .font(dimmed ? .body : .headline)   // simplify while dimmed
```

Always-On = power budget is tight: stop timers, drop animation framerates, dim or simplify content. Use materials; avoid solid black screens.

### Complications (WidgetKit, watchOS 10+)

ClockKit is deprecated (watchOS 10). Build complications with WidgetKit:

```swift
struct Complication: Widget {
    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: "stepsComplication",
                               intent: ConfigurationAppIntent.self,
                               provider: ComplicationProvider()) { entry in
            ComplicationView(entry: entry)
        }
    }
}
```

- Refresh data via `TimelineProvider` + `WidgetCenter.reloadTimelines`; complication refresh is battery-budgeted — don't reload aggressively.
- Share data with the app through an App Group container, not direct DB access.

### WatchConnectivity (WCSession)

```swift
let session = WCSession.default
session.delegate = delegate     // delegate calls arrive on the main thread
session.activate()

if session.isReachable {
    session.sendMessage(["cmd": "sync"],
                        replyHandler: { reply in ... }) { error in ... }
}
// Guaranteed delivery (queued, latest wins):
try session.updateApplicationContext(["lastSync": Date()])
session.transferUserInfo(["key": value])
session.transferFile(url, metadata: nil)
```

| Method | When |
|---|---|
| `sendMessage` | Interactive; phone app reachable now |
| `updateApplicationContext` | Latest-state sync; guaranteed, replaces previous |
| `transferUserInfo` | Queued payloads, ordered delivery |
| `transferFile` | Larger files (media, logs) |

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Assume the phone is reachable | Check `session.isReachable` / `isPaired` |
| Block the main thread in delegates | Dispatch UI updates to the main queue |
| Direct DB writes from the watch to phone storage | Message/context/file transfer over WCSession |
| Heavy UI work during workouts | Throttle updates; batch heart-rate samples |

### HealthKit & workouts

```swift
let store = HKHealthStore()
let read: Set<HKObjectType> = [
    .workoutType(), HKQuantityType(.heartRate), HKQuantityType(.activeEnergyBurned)
]
store.requestAuthorization(toShare: [.workoutType()], read: read) { ok, error in
    // run on the main queue
}

let config = HKWorkoutConfiguration()
config.activityType = .running
let session = try HKWorkoutSession(healthStore: store, configuration: config)
let builder = session.associatedWorkoutBuilder()
builder.dataSource = HKLiveWorkoutDataSource(healthStore: store,
                                             workoutConfiguration: config)
session.startActivity(with: Date())
builder.beginCollection(withStart: Date()) { _, _ in }
```

`HKLiveWorkoutDataSource` auto-collects metrics; call `endCollection` + `finishWorkout` to persist. Show live stats via the builder delegate.

### Short interactions & dictation

- Notifications: Short Look (brief) → Long Look (details + actions). Design for a 4-second glance; actions are the primary response.
- Dictation for text input: `@Environment(\.dictationContext)` (watchOS 9+) to present dictation; keep free-text entry minimal — prefer taps/scroll.

---

## 3. tvOS Philosophy

The 10-foot interface: viewed on a TV, driven by the Siri Remote. There is no touch and no hover — **focus** is the interaction.

```
FOCUS-DRIVEN: the selected item is the cursor
├── One item focused at a time, moved with directional input
├── Buttons are the primary control — no tiny tap targets
└── Focus ring + parallax make selection obvious

BUTTON-CENTRIC: every action is a button
├── No swipe, no long-press, no gestures
└── Menu = back, Play/Pause = primary media control

LARGE TEXT: reading distance is ~3m
├── Minimum readable text sizes (headlines ~38pt+ on screen)
└── Fewer, larger controls than iOS
```

| Design value | Implementation |
|---|---|
| **Focus clarity** | One obvious focused element per screen |
| **Simplicity** | Fewer columns, bigger cards |
| **Button-centric** | Text buttons, not icon taps |
| **Parallax** | Layered home-screen icon; subtle depth on cards |

---

## 4. tvOS SwiftUI Patterns

### The focus engine

```swift
@FocusState private var focused: ScreenField?

Button("Play") { start() }
    .focusable()
    .focused($focused, equals: .play)
    .onPlayPauseCommand { start() }

// Preferred initial focus (tvOS 15+)
.prefersDefaultFocus(true, in: .current)
// Or (tvOS 17+)
.defaultFocus(true, in: .current)

// Decorative content never takes focus
Image("hero").focusable(false).focusEffectDisabled()
```

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Leave a screen with no default focus | `prefersDefaultFocus` / `defaultFocus` |
| Rely on touch-like gestures | Buttons + `@FocusState` + focus movement |
| Custom focus ring styles that hide state | Default rings; custom only with strong visual state |
| Focusable controls clipped by a ScrollView edge | Keep them reachable by directional input |

### Directional & remote commands

```swift
.onMoveCommand { direction in
    switch direction {
    case .up, .down, .left, .right: move(direction)
    @unknown default: break
    }
}
.onPlayPauseCommand { togglePlayback() }
.onExitCommand { dismiss() }            // Menu button — don't block it
```

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Custom swipe handlers that shadow Menu | Let Menu = back/dismiss (system) |
| Require precise trackpad aim | Focus-driven movement over touch |
| Buttons that change focus randomly | Deterministic focus order (left→right, top→bottom) |

### Video & audio (AVKit)

```swift
import AVKit

VideoPlayer(player: player)          // SwiftUI AVPlayer wrapper
    .ignoresSafeArea()               // full-bleed playback
```

- Use AVPlayer/AVKit for media; subtitles, audio routes, and scrubbing are handled natively.
- Media apps should support immersive audio and HDR where the catalog provides it.

### Top Shelf & icon parallax

- **Top Shelf**: separate Top Shelf extension (TVServices) or Info.plist static items (`TVTopShelfItems`) — the hero row above your app icon.
- Dynamic Top Shelf: implement `TVTopShelfContentProvider` in the extension.
- **Home-screen icon parallax**: layered image asset (2–5 layers of PNG with depth); depth is automatic from the asset, not runtime code.

### Screen sizes & type

- Target 42″–85″ screens, 16:9. Design at 1920×1080 logical, test on 4K.
- Safe areas are minimal; letterboxing is handled by tvOS.
- Headlines ≥ 38–48pt on screen; body ≥ 24pt; never rely on sub-20pt text.

| ❌ NEVER | ✅ ALWAYS |
|---|---|
| Text smaller than ~20pt | Big, legible type for 3m viewing |
| Phone-style dense grids | Fewer, larger focusable cards |
| Controls without focus state | Focus ring + selection feedback everywhere |

---

## 5. Shared watchOS/tvOS Checklist

### Before release

- [ ] Dynamic Type at default + accessibility sizes verified (watch: 40mm/44mm/46mm+; tv: 1080p/4K)
- [ ] Focus engine complete (tv): default focus, deterministic order, Menu back behavior
- [ ] Every control reachable by button/remote — no gesture-only interactions
- [ ] Accessibility: VoiceOver labels on all controls; Reduce Motion respected
- [ ] Battery (watch): no runaway timers/animations; Always-On simplifies content
- [ ] WatchConnectivity failure paths handled (phone unreachable, queue limits)
- [ ] Complications/widgets: timeline refresh budget respected; placeholder states correct
- [ ] Workout/HealthKit: authorization requested only for needed types; privacy strings set
- [ ] App Store assets: layered icon (tv parallax), watch face gallery previews, screenshots at required sizes

---

> **Remember:** watchOS and tvOS punish apps that copy phone conventions. One glance on a wrist, one focused screen on a TV — everything else follows from those two constraints.

# Content from swift-language.md

# Swift Language Reference

> Read first — Swift fundamentals, concurrency, and memory. Correct Swift is the foundation of every Apple platform app.
> **This file is PRIORITY: value semantics and Swift 6 concurrency are where AI-generated Swift fails hardest.**

---

## 1. Value Types vs Reference Types

### Decision Table

| Type | Semantics | Use When |
| --- | --- | --- |
| **struct** | Value — copied on assignment | Default for models, DTOs, view state |
| **enum** | Value — one of a set of cases | State machines, options, Result-style models |
| **class** | Reference — shared identity | Rare; Cocoa interop, legacy code |
| **actor** | Reference + isolated mutable state | Shared mutable state across concurrency |

**Rules:**

- Prefer `struct`. Collections (`Array`/`Dictionary`/`Set`/`String`/`Data`) are copy-on-write — copies are cheap until one side mutates.
- Identity: `class` compares by reference (`===`); `struct` by value (`==` after `Equatable`).
- A `let` struct is fully immutable; mutate via `var` + `mutating` methods.

```swift
// ✅ CORRECT: value-type model — copies are isolated, no aliasing bugs
struct User { var name: String; var isAdmin: Bool }
var a = User(name: "Ana", isAdmin: false)
var b = a
b.isAdmin = true          // a.isAdmin is still false

// ❌ WRONG: shared mutable class — silent aliasing surprises
final class UserBox { var name = "Ana" }
let x = UserBox()
let y = x
y.name = "Bob"            // x.name changed too
```

---

## 2. Protocols & Generics

- Protocol-oriented design: define capabilities (`protocol Persistable`), model with `struct`, extend the protocol for behavior.
- Composition: `func save(_ x: Foo & Bar)`.
- **Opaque types (`some Protocol`)**: concrete type fixed but hidden — use for return values (`var body: some View`). No runtime cost.
- **Existentials (`any Protocol`)**: type-erased box, dynamic dispatch, heap allocation — use only for genuinely heterogeneous collections.
- Primary associated types (Swift 5.7+): `Collection<Element>`, `Sequence<Element>`.
- Constraints with `where` clauses: `func f<C: Collection>(_ c: C) where C.Element == Int`.

| Construct | Use | Cost |
| --- | --- | --- |
| `some P` (opaque) | Single fixed concrete type, hidden identity | None (static dispatch) |
| `any P` (existential) | Mixed concrete types in one container | Boxing + dynamic dispatch |
| Generic `<T: P>` | Reuse across types, keep concrete type | None (static dispatch) |

```swift
protocol Vehicle { var name: String { get }; func topSpeed() -> Double }

// ✅ CORRECT: opaque return — concrete type fixed, identity hidden
func makeVehicle() -> some Vehicle { Car() }

// ✅ CORRECT: generic + where clause — no dynamic dispatch
func fastest<C: Collection>(_ vehicles: C) -> Double where C.Element == Vehicle {
    vehicles.map { $0.topSpeed() }.max() ?? 0
}

// ❌ WRONG: `any` existential for everything — boxing + dynamic dispatch
let vehicles: [any Vehicle] = [Car(), Boat()]  // only when types truly differ
```

---

## 3. Error Handling & Optionals

- `throws`/`try`/`catch` for expected failures; `defer` for cleanup (runs LIFO at scope exit — never use it for logic ordering).
- `Result<Success, Failure>` for callback/return-style APIs.
- Unwrap ladder: `guard let` (early exit, required) > `if let` (scoped) > `??` default > `?.` chaining.
- `!` and `try!` are NEVER acceptable in production paths — a nil crashes the app.

```swift
func loadConfig() throws -> Config {
    defer { FileLock.shared.release() }     // ✅ runs on every exit path
    guard let url = URL(string: raw) else { throw ConfigError.badURL }
    ...
}

// ❌ WRONG: force unwrap + force try — crashes on any nil/throw
let url = URL(string: raw)!
let config = try! JSONDecoder().decode(Config.self, from: data)

// ✅ CORRECT: graceful optional handling
guard let url = URL(string: raw) else { return }
let config = try? JSONDecoder().decode(Config.self, from: data)  // nil on failure — handle it
```

```swift
// ✅ CORRECT: Result for callback-style APIs
func fetch(_ completion: @escaping (Result<Config, Error>) -> Void) { ... }
fetch { result in
    switch result {
    case .success(let config): render(config)
    case .failure(let error): show(error)
    }
}
```

---

## 4. Concurrency (async/await, Swift 5.5+ / 6)

### Core Building Blocks

| API | Role |
| --- | --- |
| `async`/`await` | Sequential async code, no callback pyramids |
| `Task { }` | Fire-and-forget work; inherits the surrounding actor context |
| `Task.detached { }` | Work NOT inheriting context — prefer `Task` |
| `async let` | Parallel child tasks |
| `TaskGroup` | Dynamic fan-out of many child tasks |
| `@MainActor` | Isolate UI code to the main thread |
| `@Sendable` | Values/closures safe to cross isolation boundaries |
| `nonisolated` | Actor member callable without isolation (must not touch state) |
| `AsyncSequence`/`AsyncStream` | Async iteration; bridge callbacks to `for await` |
| `withCheckedThrowingContinuation` | Bridge completion-handler APIs |

### Swift 6 Strict Concurrency — What Changes

- Compile-time data-race safety: sharing non-`Sendable` mutable state across isolation boundaries is an error.
- Region-based isolation (SE-0414): values may cross boundaries when ownership is provably exclusive.
- `nonisolated(unsafe)` (Swift 5.10+) escapes the checker for legacy globals — document why.
- Swift 6.1+ opt-in default isolation (SE-0466): `SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor` — new app types default to the main actor.
- Migration path: `SWIFT_STRICT_CONCURRENCY = minimal` → `targeted` → `complete` → Swift 6 language mode.
- Actors are reentrant: state can change at `await` points — re-check invariants after awaiting.
- Cancellation: `Task.isCancelled`, `try Task.checkCancellation()`, `Task.sleep(for:)` throws when cancelled.

### Migration Table: Swift 5 → Swift 6

| Swift 5 pattern | Swift 6-safe pattern |
| --- | --- |
| Shared mutable `class` singleton | `actor` or `@MainActor` singleton |
| Global mutable state | Isolated state (actor / `@MainActor`; `nonisolated(unsafe)` as documented last resort) |
| Completion-handler APIs | async/await wrappers via `withCheckedThrowingContinuation` |
| `@Published` model churn | `@Observable` (iOS 17+) with granular invalidation |
| Callbacks on arbitrary queues | Hop explicitly: `await MainActor.run { }` or `Task { @MainActor in }` |
| Unchecked `Sendable` conformances | Eliminate; prefer isolation |
| `DispatchQueue` for serial work | `actor` |

### Sendability Quick Check

- ✅ Sendable by default: value types (`struct`/`enum`) whose stored properties are Sendable; `final class` with only immutable `let` Sendable properties.
- ❌ NOT Sendable: mutable `class`, `var`-state singletons, `ObservableObject` models, UIKit/AppKit objects.
- ✅ A non-`Sendable` value may cross isolation if ownership moves (region-based isolation) — don't fight the compiler with `@unchecked Sendable`.

```swift
// ✅ CORRECT: actor isolates mutable state
actor Scoreboard {
    private var scores: [String: Int] = [:]
    func add(_ points: Int, for player: String) { scores[player, default: 0] += points }
}

// ✅ CORRECT: async let runs the two fetches concurrently
let (users, posts) = try await (fetchUsers(), fetchPosts())

// ❌ WRONG: data race — two tasks mutate shared state (Swift 6: compile error)
final class Counter { var n = 0 }
Task { counter.n += 1 }; Task { counter.n += 1 }

// ✅ CORRECT: bridge a callback API to async
func legacyLoad() async throws -> Data {
    try await withCheckedThrowingContinuation { continuation in
        legacyFetch { result in continuation.resume(with: result) }
    }
}
```

---

## 5. Memory Management (ARC)

- Strong reference cycles leak. **Prefer `weak` over `unowned`**: `unowned` crashes (precondition failure) if the instance is already gone. `unowned` is only safe when the referent provably outlives the closure.
- Escaping closures capture strongly by default — use capture lists: `[weak self]`, then `guard let self else { return }` (Swift 5.7+ shorthand).
- Value types are copy-on-write: passing `Array`/`String`/`Data` shares storage until one side mutates.

```swift
final class Downloader {
    var onComplete: (() -> Void)?

    func start() {
        // ❌ WRONG: strong capture — Downloader never deallocates
        onComplete = { self.finish() }

        // ✅ CORRECT: weak capture breaks the cycle
        onComplete = { [weak self] in
            guard let self else { return }
            self.finish()
        }
    }
}
```

---

## 6. Enums & Pattern Matching

- `enum` with associated values models states, results, and options better than strings or booleans — the compiler enforces exhaustiveness.
- Synthesized `Equatable`/`Hashable`: just declare conformance; the compiler generates it.
- `switch` is exhaustive; `if case`/`guard case` for single-case checks; `where` clauses refine patterns.
- Result-style modeling: represent each outcome as a case with payloads — no hidden state.

```swift
enum LoadState: Equatable {
    case idle
    case loading(progress: Double)
    case loaded([Item])
    case failed(String)
}

switch state {
case .loading(let p) where p > 0.5:   // pattern + where guard
    showProgress(p)
case .loaded(let items):
    render(items)
case .failed(let message):
    showError(message)
case .idle:
    break
}

if case .failed(let message) = state {
    logger.error(message)
}
```

---

## 7. Common Pitfalls

| ❌ NEVER | Why It's Wrong | ✅ ALWAYS |
| --- | --- | --- |
| `x!` force unwrap | Crashes on nil | `guard let` / `??` / explicit failure |
| `try!` / `as!` | Crashes on failure | `try?` + handle nil, `as?` + `guard` |
| Strong capture of `self` in escaping closure | Retain cycle | `[weak self]` + `guard let self` |
| Mutating a `let` struct property | Compile error | `var` + `mutating func` |
| Indexing `String` with `Int` | Wrong API / compile error | `String.Index`, `firstIndex(of:)` |
| Integer overflow (`Int8(127) + 1`) | Runtime trap | `&+` (explicit wrap) or `addingReportingOverflow` |
| `Any` for dynamic behavior | Erases type, slow dispatch | Generics / `some` / `any` deliberately |
| `defer` for ordering guarantees | LIFO surprises | `defer` only for cleanup |
| `==` on classes | Reference compare — silent bug | Implement `Equatable` intentionally |
| Global mutable state | Data races under Swift 6 | Actor / `@MainActor` isolation |

```swift
// ❌ WRONG: Int-indexing a String
let name = "Swift"
let c = name[1]                    // ❌ compile error

// ✅ CORRECT: String.Index
if let idx = name.firstIndex(of: "w") { let c = name[idx] }
```

---

## 8. Swift Checklist

### Before Writing Swift

- [ ] Language mode decided (5 vs 6)? Strict concurrency on?
- [ ] Value types first (`struct`/`enum`)? `class` only when identity required?
- [ ] Shared mutable state behind an `actor` or `@MainActor`?
- [ ] Errors modeled with `throws`/`Result` — zero force unwraps?
- [ ] UI code marked `@MainActor`?
- [ ] Generic/protocol design, not `Any`?

### Before PR

- [ ] Compiles under Swift 6 strict concurrency (zero errors AND warnings)?
- [ ] No `!`, `try!`, `as!` in production paths?
- [ ] No retain cycles — `weak` where needed?
- [ ] async/await used; no `Thread.sleep`/global `DispatchQueue` hacks?
- [ ] Tests cover error paths and concurrent access?
- [ ] `defer` used only for cleanup?

> **If any answer is no, fix it before continuing. Swift correctness is the foundation of every Apple app.**

# Content from swiftui-core.md

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

# Content from swiftui-data.md

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

# Content from swiftui-testing.md

# SwiftUI Testing Reference

> Read when writing tests for Swift/SwiftUI apps — unit, view, UI, and CI testing.

---

## 1. Testing Pyramid for Apple Apps

### The Pyramid

```
        ┌───────────────┐
        │   UI (E2E)    │  ← XCUITest: FEW, slow, catch integration regressions
        ├───────────────┤
        │  View / Model │  ← @Observable logic, ViewInspector: medium count
        │     Logic     │
        ├───────────────┤
        │     Unit      │  ← Models, services, formatters: MANY, ms-fast
        │    Tests      │
        └───────────────┘
```

| Layer | What it catches | Typical speed |
| --- | --- | --- |
| **Unit** | Wrong business rules, edge cases, decoding bugs | ms |
| **View logic** | Wrong state transitions, load/error flows | ms |
| **Integration** | Model + store (SwiftData/Core Data), networking stack, mapping | seconds |
| **UI (XCUITest)** | Broken navigation, missing accessibility, real-device runtime issues | minutes |

### The Mindset

- **Unit tests own the business rules**: price math, date formatting, validation, JSON decoding. If it runs without a device, test it without a device.
- **View-model tests own state**: `idle → loading → loaded`, `error → retry`. Testing the `@Observable` model directly is faster and more stable than driving the same path through UI.
- **UI tests own journeys, not assertions**: one happy-path login, one checkout, one empty state. If you need 200 UI tests, your pyramid is inverted.
- **Tests are documentation**: a failing test name reads as a spec. `emptyCartDisablesCheckout()` explains behavior better than a comment.
- > 🚫 If a *unit* test requires a simulator, the logic lives in the wrong layer.

---

## 2. XCTest

Still fully supported (Xcode 26 ships both XCTest and Swift Testing) — existing suites keep running.

### Structure

```swift
// ✅ CORRECT: XCTestCase with async setUp/tearDown
final class CartTests: XCTestCase {
    var cart: Cart!

    override func setUp() async throws {
        cart = Cart()
    }

    override func tearDown() async throws {
        cart = nil
    }

    func testAddItemIncrementsTotal() {
        cart.add(Item(name: "Milk", price: 1.99))
        XCTAssertEqual(cart.total, 1.99, accuracy: 0.001)
    }
}
```

### XCTAssert Family

| Assertion | Checks |
| --- | --- |
| `XCTAssertEqual(_:_:)` / `XCTAssertNotEqual` | Equality (`Equatable`) |
| `XCTAssertTrue` / `XCTAssertFalse` | Boolean condition |
| `XCTAssertNil` / `XCTAssertNotNil` | Optional state |
| `XCTAssertThrowsError` | Error thrown (optionally inspect it) |
| `XCTAssertNoThrow` | No error |
| `XCTUnwrap` | Unwraps an optional or fails the test (throws) |
| `XCTAssertEqual(_:_:accuracy:)` | Floating-point tolerance |
| `XCTFail` | Explicit unconditional failure |

### Async Test Methods & Expectations

```swift
// ✅ CORRECT: async throws test method
func testLoadProducts() async throws {
    let products = try await service.loadProducts()
    XCTAssertEqual(products.count, 3)
}

// ✅ CORRECT: expectation for callback/Combine APIs
func testNetworkCallback() {
    let exp = expectation(description: "request completes")
    var received: Data?
    client.fetch { result in
        received = result
        exp.fulfill()
    }
    wait(for: [exp], timeout: 2)
    XCTAssertNotNil(received)
}
```

### Performance Tests

```swift
func testSortPerformance() {
    measure {
        _ = largeArray.sorted()
    }
}
```

> ⚠️ `measure` is for hot paths only. On CI, treat metric variance as advisory; assert *correctness* with real assertions and use `.timeLimit`-style guards to catch regressions.

---

## 3. Swift Testing (Swift 6+, Xcode 16+)

The modern default for new suites: no class boilerplate, `#expect`/`#require` macros, parameterized tests, parallel-by-default execution, and native `async/await`.

```swift
// ✅ CORRECT: Swift Testing basics
import Testing

struct CartTests {
    @Test func emptyCartTotalIsZero() {
        let cart = Cart()
        #expect(cart.total == 0)
    }

    @Test func discountCapsAtFiftyPercent() throws {
        let price = try #require(Discount(rawValue: 0.6))  // fails test if nil
        #expect(price.amount == 0.5)
    }
}
```

### Macros

| Macro | Behavior |
| --- | --- |
| `#expect(condition)` | Records a failure if false, continues running |
| `#require(condition)` | Stops the test if false; returns the unwrapped value |

### Traits (annotate `@Test` / `@Suite`)

| Trait | Example |
| --- | --- |
| Tags | `@Test(.tags(.network))` — filter with `--filter` |
| enabled | `@Test(.enabled(if: isCI))` — skip locally, run on CI |
| timeLimit | `@Test(.timeLimit(.minutes(2)))` — kills runaway tests |
| bug | `@Test(.bug("APP-123"))` — links to a tracker |
| disabled | `@Test(.disabled("flaky on iOS 18"))` — quarantine, don't delete |
| serialized | `@Suite(.serialized)` — opt out of parallelism |

### Parameterized Tests

```swift
@Test(arguments: [
    ("milk", true),
    ("", false),
    ("   ", false),
])
func itemTitleIsValid(title: String, expected: Bool) {
    #expect(Item(title: title).isValid == expected)
}
```

### XCTest → Swift Testing Migration

| XCTest | Swift Testing |
| --- | --- |
| `final class XTests: XCTestCase` | `struct XTests` (or `@Suite struct XTests`) |
| `func testFoo()` | `@Test func foo()` |
| `XCTAssertEqual(a, b)` | `#expect(a == b)` |
| `XCTAssertTrue(cond)` | `#expect(cond)` |
| `XCTAssertThrowsError { ... }` | `#expect(throws: Error.self) { ... }` |
| `XCTUnwrap(x)` | `try #require(x)` |
| `setUp` / `tearDown` | `init()` / `deinit` |
| `wait(for:timeout:)` | `await` directly — concurrency-native |
| `measure { }` | `.timeLimit` trait; benchmark outside tests |
| `-only-testing:Target/Class/method` | `--filter "Suite/method"` |

> ✅ **Prefer Swift Testing for new code.** Keep XCTest for legacy suites and where a tool (some XCUITest setups, certain plugins) requires it.

---

## 4. Testing View Logic & View Models

### Rule: logic lives where it's testable

Keep business logic out of `body`. `@Observable` models and view models are plain Swift — test them directly, no UI needed.

```swift
@Observable final class ProductListModel {          // iOS 17+ / macOS 14+
    var products: [Product] = []
    var isLoading = false
    var errorMessage: String?

    func load() async {
        isLoading = true
        defer { isLoading = false }
        do {
            products = try await repository.fetchProducts()
        } catch {
            errorMessage = "Could not load products"
        }
    }
}

// ✅ CORRECT: test the model directly
@Test func loadFailureShowsError() async {
    let model = ProductListModel(
        repository: MockRepository(result: .failure(URLError(.badURL)))
    )
    await model.load()
    #expect(model.errorMessage != nil)
    #expect(model.products.isEmpty)
    #expect(model.isLoading == false)
}
```

### Dependency Injection Over Singletons

```swift
protocol ProductRepository: Sendable {
    func fetchProducts() async throws -> [Product]
}

struct MockRepository: ProductRepository {
    let result: Result<[Product], Error>
    func fetchProducts() async throws -> [Product] {
        try result.get()
    }
}
```

| ❌ NEVER | Why It's Wrong | ✅ ALWAYS |
| --- | --- | --- |
| `ProductService.shared` used inside the model | Can't swap in mocks; hidden global state | Inject protocols via `init(repository:)` |
| Model defaults that hit the network | Tests silently depend on network | Inject mocks; production default in the app |
| Testing a whole screen to change one state | Slow, brittle, needs UI | Test state transitions in the model |
| Branching business logic inside `body` | Untestable without UI | Extract to model methods / computed properties |

### Async Loading State Tests

Cover all four states: `idle`, `loading`, `loaded`, `error`.

```swift
@Test func loadingStateIsSetDuringFetch() async throws {
    let model = ProductListModel(repository: SlowRepository())
    async let _ = model.load()       // start the load
    await Task.yield()               // let it begin
    #expect(model.isLoading == true)
}
```

---

## 5. XCUITest (UI Tests)

### Launch & Test Mode

```swift
final class LoginUITests: XCTestCase {
    func testSuccessfulLogin() {
        let app = XCUIApplication()
        app.launchArguments += ["-ui-testing", "-reset-state"]   // app reads these
        app.launchEnvironment["UITEST_TOKEN"] = "stub-token"
        app.launch()

        let emailField = app.textFields["login.email"]           // accessibilityIdentifier
        XCTAssertTrue(emailField.waitForExistence(timeout: 5))
        emailField.tap()
        emailField.typeText("user@example.com")
        app.buttons["login.submit"].tap()

        XCTAssertTrue(app.staticTexts["dashboard.title"].waitForExistence(timeout: 5))
    }
}
```

### Setting Identifiers in SwiftUI

```swift
// ✅ CORRECT: stable, localization-proof identifiers
Button("Log In") { ... }
    .accessibilityIdentifier("login.submit")

// ❌ WRONG: matching visible text — breaks on localization and redesigns
// app.buttons["Log In"].tap()
```

### Queries & Interactions

| Pattern | Example |
| --- | --- |
| Element queries | `app.buttons["id"]`, `app.textFields["id"]`, `app.staticTexts["id"]`, `app.cells` |
| Hierarchy | `app.navigationBars["Title"].buttons["Back"]`, `app.tabBars.buttons["Home"]` |
| Counts | `app.cells.count`, `app.buttons.matching(identifier: "row").count` |
| Async wait | `.waitForExistence(timeout: 5)` before asserting |
| Input | `.tap()`, `.typeText("...")`, `.swipeUp()`, `.doubleTap()`, `.press(forDuration:)` |
| Keyboard | `app.keyboards.buttons["return"].tap()` |
| Alerts | `app.alerts["Error"].buttons["OK"].tap()` |

### Resetting State Between Tests

| ❌ NEVER | ✅ ALWAYS |
| --- | --- |
| Rely on state left by a previous test | Launch with `-reset-state`; reset `UserDefaults`/keychain in app code |
| `XCTAssertTrue(x.exists)` without a wait | `waitForExistence(timeout:)` first |
| `sleep(2)` to "wait for async UI" | `waitForExistence` / `wait(for:timeout:)` |
| Match on localized visible text | Match on `.accessibilityIdentifier` |

> UI tests run the real app process. Keep them few and journey-shaped; assert behavior, not pixels.

---

## 6. SwiftUI View Testing (ViewInspector)

Apple offers **no built-in unit testing for SwiftUI view trees**. The community standard is [ViewInspector](https://github.com/nalexn/ViewInspector) (SwiftPM: `nalexn/ViewInspector`).

```swift
// ✅ CORRECT: inspect the tree, invoke closures
final class ProfileViewTests: XCTestCase {
    func testGreetingShowsUserName() throws {
        let sut = ProfileView(userName: "Ada")
        let text = try sut.inspect().find(text: "Hello, Ada!")
        XCTAssertEqual(text.string(), "Hello, Ada!")
    }

    func testButtonTaps() throws {
        var tapped = false
        let sut = ProfileView(onTap: { tapped = true })
        try sut.inspect().button().tap()
        XCTAssertTrue(tapped)
    }
}
```

| Capability | Example |
| --- | --- |
| Traverse the tree | `try sut.inspect().find(viewWithAccessibilityIdentifier: "id")` |
| Read modifiers | `try sut.inspect().text().attributes().foregroundColor()` |
| Invoke actions | `try sut.inspect().button().tap()`, `.list().row(0).button().tap()` |
| Container wrappers | `.implicitAnyView()` when `AnyView`/`Group` wraps nodes |

### Limitations

- SwiftUI bodies are opaque; some nodes require `.implicitAnyView()` unwrapping.
- `@MainActor` views need `@MainActor` test methods.
- Not a substitute for model tests — use it for *view wiring*, not business logic.
- No Apple support → pin the package version and re-verify after Xcode upgrades.

---

## 7. Snapshot Testing

[swift-snapshot-testing](https://github.com/pointfreeco/swift-snapshot-testing) (Point-Free, SwiftPM: `pointfreeco/swift-snapshot-testing`) records output on first run, then diffs on later runs.

```swift
// ✅ CORRECT: view snapshot (needs a rendering context)
assertSnapshot(of: sut, as: .image)

// ✅ CORRECT: pure-value snapshots — no rendering
assertSnapshot(of: invoice.totalString, as: .lines)
assertSnapshot(of: apiResponse, as: .json)
```

| Strategy | Use for | Notes |
| --- | --- | --- |
| `.image` | Rendered views/layouts | Flaky across fonts/OS — pin simulator + OS |
| `.recursiveDescription` | SwiftUI view structure | Textual, stable across OS versions |
| `.lines` / `.dump` | Strings, structured data | Fastest, best diff output |
| `.json` | Codable payloads | Guards API contract drift |

### Discipline

| ❌ NEVER | ✅ ALWAYS |
| --- | --- |
| Re-record snapshots on every CI failure | Inspect the diff; update only intended changes |
| Snapshot dynamic content (dates, UUIDs) | Inject deterministic/frozen values |
| Image snapshots as your *only* coverage | Pair with unit tests — snapshots prove shape, not behavior |
| Giant full-screen images in every PR | Keep snapshots small and targeted |

Record deliberately: `assertSnapshot(of: x, as: .image, record: true)`, review the reference, commit, re-run with recording off.

---

## 8. Testing Async & Combine

### Async Test Patterns

```swift
// ✅ CORRECT: Swift Testing handles async natively
@Test func fetchReturnsSortedItems() async throws {
    let items = try await repository.fetchItems()
    #expect(items == items.sorted())
}
```

### Awaiting Publisher Output

```swift
// ✅ CORRECT: XCTest + expectation for Combine
func testPublisherEmitsValue() {
    let exp = expectation(description: "value received")
    var received: Int?
    let cancellable = subject
        .sink { value in
            received = value
            exp.fulfill()
        }
    subject.send(42)
    wait(for: [exp], timeout: 1)
    XCTAssertEqual(received, 42)
    cancellable.cancel()
}
```

### Cancellation Tests

```swift
@Test func cancelledTaskStopsLoading() async {
    let model = ProductListModel(repository: SlowRepository())
    let task = Task { await model.load() }
    await Task.yield()
    task.cancel()
    await task.value
    #expect(model.isLoading == false)   // load() must honor cancellation
}
```

### Mock URLProtocol for Network

```swift
// ✅ CORRECT: intercept URLSession without touching app code
final class MockURLProtocol: URLProtocol {
    static var handler: ((URLRequest) throws -> (HTTPURLResponse, Data))?

    override class func canInit(with request: URLRequest) -> Bool { true }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

    override func startLoading() {
        guard let handler = MockURLProtocol.handler else { return }
        let (response, data) = try! handler(request)
        client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
        client?.urlProtocol(self, didLoad: data)
        client?.urlProtocolDidFinishLoading(self)
    }
    override func stopLoading() {}
}
// setUp: URLProtocol.registerClass(MockURLProtocol.self) + a URLSession with MockURLProtocol in its configuration
```

| ❌ NEVER | ✅ ALWAYS |
| --- | --- |
| Hit real servers in tests | Protocol-injected repositories or `MockURLProtocol` |
| `sleep()` to "wait for async" | Expectations / `await` / `waitForExistence` |
| Ignore `CancellationError` | `Task.checkCancellation()` in loops; propagate with `try await` |
| One shared mock for every test | Per-test stubs; assert on injected inputs |

---

## 9. CI/CD

### Local & CI Test Run

```bash
# ✅ CORRECT: build + test on a simulator
xcodebuild test \
  -project MyApp.xcodeproj \
  -scheme MyApp \
  -destination 'platform=iOS Simulator,name=iPhone 16,OS=26.0' \
  -resultBundlePath build/MyApp.xcresult \
  -enableCodeCoverage YES

# ✅ CORRECT: run one class only
xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16' \
  -only-testing:MyAppTests/CartTests

# coverage + readable results
xcrun xccov view --report --json build/MyApp.xcresult
xcrun xcresulttool get --path build/MyApp.xcresult --format json > result.json
```

### Test Plans (`.xctestplan`)

- Created in Xcode or hand-edited; selected with `-testPlan MyApp`.
- Enable **parallelizable** (classes run in parallel), **randomExecutionOrder**, and **code coverage** per plan.
- Keep UI and unit tests in separate bundles: UI tests don't parallelize the same way.

| Flag | Effect |
| --- | --- |
| `-parallel-testing-enabled YES` | Run test bundles in parallel |
| `-parallel-testing-worker-count 4` | Cap parallel workers (CI sizing) |
| `-testPlan MyApp` | Use a specific test plan |
| `-skip-testing:MyAppUITests` | Skip a bundle |

### CI Providers

| Provider | Notes |
| --- | --- |
| **Xcode Cloud** | Native `xcodebuild`, test plans, archives to App Store Connect |
| **GitHub Actions** | `macos-15`/`macos-26` runners; cache `DerivedData` + SwiftPM; run `xcodebuild` directly |
| **Bitrise / CircleCI / Jenkins** | Same `xcodebuild` invocation; prefer result bundles over raw logs |

> Store `xcresult` artifacts on every run — failed UI tests ship with screenshots you can attach to PRs.

---

## 10. Testing Checklist

### Before Every PR

- [ ] Every model/service/formatter has unit tests (Swift Testing for new code).
- [ ] Every `@Observable` view model covers `idle / loading / loaded / error`.
- [ ] Decoding tests for every `Codable` API payload.
- [ ] No test hits the network; no test sleeps.
- [ ] Accessibility identifiers exist for every element UI tests touch.
- [ ] Local run green: `xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16'`.
- [ ] Clean build: `xcodebuild build -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16'`.

### Before Release

- [ ] Full suite on the minimum supported OS **and** the latest OS.
- [ ] UI smoke test on a physical device, not just the simulator.
- [ ] Coverage reviewed — critical flows (payments, auth, offline sync) fully covered.
- [ ] Snapshot references committed and current.
- [ ] Parallel test run on CI; flaky tests quarantined with `.disabled("flaky")`, not deleted.
- [ ] Result bundle archived with the release.

---

> **Tests are documentation.** Name them as behavior (`addingItemTwiceThrows`), keep them deterministic, and let the pyramid decide where each assertion lives.
