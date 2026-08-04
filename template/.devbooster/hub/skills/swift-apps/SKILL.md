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
