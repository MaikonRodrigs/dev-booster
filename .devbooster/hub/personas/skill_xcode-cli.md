---
name: xcode-cli
description: Xcode command-line mastery for building, testing, and shipping Apple apps without the Xcode GUI. xcodebuild, xcrun simctl and simulators, code signing and provisioning, notarization, SwiftPM CLI, LLDB/Instruments, crash symbolication, archive/TestFlight/App Store. Use when running Xcode commands in the terminal, debugging build errors, managing simulators, resolving signing issues, or preparing an Apple app release. Triggers on xcode, xcodebuild, xcrun, simctl, simulator, code signing, provisioning, entitlement, notarization, fastlane, swift build, swift test, swift package, testflight, app store connect, build failed, xcode error.
allowed-tools: Read, Glob, Grep, Bash, Edit, Write
---

# Xcode CLI (Command-Line Mastery)

> **Philosophy:** The terminal is the source of truth. Whatever Xcode shows interactively, `xcodebuild` can reproduce — use the CLI to verify before signing off.
> **Core Principle:** NEVER say "builds fine" without actually building. Build, test, and launch from the shell.

---

## 🔴 MANDATORY: Read Reference Files Before Working!

**⛔ DO NOT run Xcode commands or declare Apple builds done until you read the relevant file:**

| File | Content | Status |
| --- | --- | --- |
| **[xcode-workflow.md](xcode-workflow.md)** | **⚠️ ALL CLI mechanics: xcodebuild, simctl, signing, SwiftPM, debugging, release** | **⬜ CRITICAL FIRST** |

> 🧠 **xcode-workflow.md is PRIORITY!** It contains the exact commands and the common failure modes. Read it before running ANY `xcodebuild`/`xcrun` invocation.
> 💡 **Code-level guidance** (SwiftUI, state, data, platform design) lives in the `swift-apps` skill — this skill covers tooling only.

---

## ⚠️ CRITICAL: ASK BEFORE ASSUMING (MANDATORY)

> **STOP! If the request is open-ended, DO NOT guess the command.**

| Aspect | Ask | Why |
| --- | --- | --- |
| **Xcode version** | "Which Xcode? (16, 26?)" | Destination names and flags drift between versions |
| **Project vs workspace** | "Is there an `.xcworkspace` (CocoaPods) or `.xcodeproj`?" | `-workspace` vs `-project` changes the invocation |
| **Scheme / target** | "Which scheme?" | `xcodebuild -list` first if unknown |
| **Destination** | "Simulator, device, or archive?" | `-destination 'generic/platform=iOS'` for archives |
| **Signing** | "Is a development team available? Account logged in?" | Device builds fail without it |
| **Deployment target** | "Minimum OS version?" | Wrong target = APIs unavailable / link errors |
| **Mac vs iOS** | "macOS app? Sandboxed?" | Notarization + entitlements differ |

---

## ⛔ AI XCODE ANTI-PATTERNS (YASAK LİSTESİ)

> 🚫 **These are AI default tendencies that MUST be avoided!**

| ❌ NEVER DO | Why It's Wrong | ✅ ALWAYS DO |
| --- | --- | --- |
| **Claiming a build works without running `xcodebuild`** | Broken code ships | Build, test, launch — then claim done |
| **Guessing `-destination` format** | "Unable to find a destination" errors | `xcodebuild -showdestinations` first |
| **Hand-editing `project.pbxproj`** | Corrupts the project | Xcode, XcodeGen, or Tuist |
| **`-skipCodeSigning` for device builds** | App won't install | Resolve signing; automatic signing |
| **Ignoring exit code / grepping only output** | Misses build failures | Confirm `** BUILD SUCCEEDED **` in output |
| **Forgetting `-derivedDataPath`** | Can't find the built `.app` | Explicit path for scripts/CI |
| **`sleep()` in test scripts** | Flaky CI | `waitForExistence` / proper waits |
| **Deleting caches to "fix" anything** | Masks real issues | Read the error; targeted fix |

---

## 📝 CHECKPOINT (MANDATORY Before Any Xcode Work)

> **Before running any Xcode/Apple build command, complete this checkpoint:**

```
🧠 CHECKPOINT:

Project type: [ .xcodeproj / .xcworkspace / Swift Package ]
Scheme:       [ from xcodebuild -list ]
Destination:  [ simulator / device / generic (archive) ]
Signing:      [ automatic / manual / team ]
Target OS:    [ e.g. iOS 17+ / macOS 14+ ]
Files Read:   [ skill files read ]

3 Commands I Will Run:
1. _______________
2. _______________
3. _______________

Verification I Will Perform:
- [ ] xcodebuild build → ** BUILD SUCCEEDED **
- [ ] Tests pass (if applicable)
- [ ] App launches on simulator/device
```

> 🔴 **Can't fill the checkpoint? → GO BACK AND READ xcode-workflow.md.**

---

## 🧭 CLI Decision Tree

```
WHAT DO YOU NEED TO DO?
        │
        ├── Build the app          → xcodebuild build -scheme X -destination Y
        ├── Run tests              → xcodebuild test ... -resultBundlePath
        ├── Manage simulators      → xcrun simctl (boot, install, screenshot, push…)
        ├── Fix signing            → Xcode accounts / security find-identity / automatic signing
        ├── macOS distribution     → Developer ID + hardened runtime + xcrun notarytool
        ├── Package a library      → swift build / swift test / swift package
        ├── Investigate a crash    → xcrun symbolicatecrash / Instruments / LLDB
        └── Release to TestFlight  → xcodebuild archive → -exportArchive → Transporter
```

| Job | Tool | Notes |
| --- | --- | --- |
| Build/test/archive | `xcodebuild` | `-scheme` + `-destination` are the core flags |
| Simulators | `xcrun simctl` | Boot, install, launch, screenshot, push, privacy |
| Code signing | Xcode automatic + `security`/`codesign` | Certificates + profiles + entitlements |
| Notarization (macOS) | `xcrun notarytool` | Required for direct distribution |
| SwiftPM | `swift build/test/package` | Libraries, executables, dependencies |
| Debugging | LLDB + Instruments | Time Profiler, Leaks, Allocations |
| Release | `xcodebuild archive` + `-exportArchive` | TestFlight/App Store via Transporter |

---

## 📋 Pre-Execution Checklist

- [ ] **Xcode version confirmed?** (`xcodebuild -version`)
- [ ] **Scheme confirmed?** (`xcodebuild -list -project App.xcodeproj`)
- [ ] **Destination confirmed?** (`xcodebuild -showdestinations -scheme App`)
- [ ] **Signing configured?** (team set; automatic signing on)
- [ ] **DerivedData path decided?** (`-derivedDataPath build/DerivedData`)
- [ ] **Deployment target verified?** (matches dependencies)
- [ ] **Clean state?** (only clean when a stale cache is the suspected culprit)

---

## 📚 Reference Files

For deeper guidance on specific areas:

| File | When to Use |
| --- | --- |
| [xcode-workflow.md](xcode-workflow.md) | **FIRST!** All CLI commands, flags, signing, simulators, release |
| [`swift-apps` skill](../swift-apps/SKILL.md) | Swift/SwiftUI code guidance (this skill covers tooling) |
| [`swift-backend` skill](../swift-backend/SKILL.md) | Server-side Swift (Vapor) — Linux/Docker builds |

---

> **Remember:** the CLI is how you verify, and verification is what makes "done" real. When in doubt, run `xcodebuild -list` and `-showdestinations` before anything else.

# Content from xcode-workflow.md

# Xcode Workflow Reference (CLI)

> Read when working inside Xcode projects — project structure, building, signing, SwiftPM, debugging, and release, all from the terminal.
> **This file is PRIORITY: it contains the exact commands and the "artimanhas" (tricks) that make Xcode CLI work — destination formats, simctl, signing, notarization, and the failure modes that trip up AI agents.**

---

## 1. Xcode Project Anatomy

### `project.pbxproj`

`MyApp.xcodeproj/project.pbxproj` is a property-list file that defines everything: targets, build settings, file references, build phases. Prefer editing in Xcode or a generator (XcodeGen/Tuist) — hand-editing is brittle.

| Component | What it is |
| --- | --- |
| **Targets** | Buildable products: app, unit tests, UI tests, frameworks, extensions |
| **Schemes** | "How to build/run/test a target" presets: configuration, destination, test bundle |
| **Build configurations** | `Debug` (fast builds, `#if DEBUG` on) and `Release` (optimized, stripped) |
| **Build phases** | Ordered steps: `Sources` (compile), `Resources` (bundle), `Frameworks` (link), `Copy Files` |
| **Info.plist** | App metadata; with `GENERATE_INFOPLIST_FILE = YES` Xcode generates it from build settings |

### Asset Catalogs (`Assets.xcassets`)

| Catalog | Purpose |
| --- | --- |
| `AppIcon` | Single-size 1024px icon (Xcode 16+/iOS 18+ style, no per-size slots) |
| `AccentColor` | Semantic accent color |
| `Colors` | Named colors with dark/light variants |
| `Images` | Vector (PDF) or raster assets with scales |

> 🚫 **NEVER** rename/delete targets or build phases by hand-editing `pbxproj` — use Xcode, XcodeGen, or Tuist.

---

## 2. Command Line Builds (MANDATORY for AI agents)

Never touch a project and declare it done without an `xcodebuild` verification.

### The Commands

```bash
# list schemes + targets
xcodebuild -list -project MyApp.xcodeproj

# list available destinations (simulators, devices, macOS)
xcodebuild -showdestinations -project MyApp.xcodeproj -scheme MyApp

# build
xcodebuild -project MyApp.xcodeproj -scheme MyApp \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  -configuration Debug \
  -derivedDataPath build/DerivedData \
  -quiet build

# test (builds + runs unit/UI tests)
xcodebuild test -project MyApp.xcodeproj -scheme MyApp \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  -derivedDataPath build/DerivedData \
  -resultBundlePath build/result.xcresult

# archive (Release, for distribution)
xcodebuild archive -project MyApp.xcodeproj -scheme MyApp \
  -destination 'generic/platform=iOS' \
  -archivePath build/MyApp.xcarchive
```

### Flag Reference

| Flag | Purpose |
| --- | --- |
| `-project` / `-workspace` | `.xcodeproj` or `.xcworkspace` (CocoaPods / SPM-with-workspace) |
| `-scheme` | Required unless using `-target` |
| `-destination` | `platform=iOS Simulator,name=iPhone 16,OS=26.0`, `platform=macOS`, `generic/platform=iOS` (archive) |
| `-configuration` | `Debug` / `Release` (defaults to the scheme setting) |
| `-derivedDataPath` | Control where products land (default `~/Library/Developer/Xcode/DerivedData`) |
| `-quiet` | Errors/warnings only — use in CI logs |
| `-only-testing:` / `-skip-testing:` | Scope test runs |
| `-resultBundlePath` | Write `.xcresult` for coverage + attachments |

### Build Verification Mandate

> 🚫 **NEVER** say "builds fine" without running an actual build.
> ✅ **ALWAYS** run `xcodebuild build -scheme <App> -destination <device>` and confirm `** BUILD SUCCEEDED **` in the output — not just exit code 0.

---

## 3. Simulators (simctl)

`xcrun simctl` drives simulators without the Xcode UI.

```bash
# list everything / bootable ones
xcrun simctl list devices
xcrun simctl list devices available

# boot, open the Simulator app, shutdown
xcrun simctl boot "iPhone 16"
open -a Simulator
xcrun simctl shutdown all

# install & launch your app
xcrun simctl install booted build/MyApp.app
xcrun simctl launch booted com.example.MyApp

# terminate, screenshot, erase (nukes app state — use for state reset)
xcrun simctl terminate booted com.example.MyApp
xcrun simctl io booted screenshot build/shot.png
xcrun simctl erase "iPhone 16"

# simulate a push notification (payload JSON)
xcrun simctl push booted com.example.MyApp payload.apns
```

### Useful Variants

| Command | Use |
| --- | --- |
| `simctl get_app_container booted com.example.MyApp data` | Locate app sandbox/data |
| `simctl privacy booted grant photos com.example.MyApp` | Pre-grant permissions |
| `simctl status_bar booted override --time 9:41` | Fake status bar for screenshots |
| `simctl spawn booted log stream --predicate 'subsystem == "com.example.MyApp"'` | Stream app logs |

---

## 4. Code Signing & Provisioning

### The Pieces

| Piece | What it is |
| --- | --- |
| **Development team** | Apple ID / org — every target needs one |
| **Signing certificate** | Identity: `Apple Development` (dev) / `Apple Distribution` / `Developer ID Application` (macOS) |
| **Provisioning profile** | Binds cert + bundle ID + devices + entitlements |
| **Automatic signing** | Xcode creates/manages profiles for you (`Signing & Capabilities`) |
| **Entitlements** | Capabilities granted to the app (push, iCloud, app groups, sandbox) — `.entitlements` file |

### Common Errors & Fixes

| Error | Fix |
| --- | --- |
| "Signing for 'X' requires a development team" | Select team in `Signing & Capabilities`; set `DEVELOPMENT_TEAM = ABC123XYZ` |
| "No profiles for 'com.example.MyApp' were found" | Enable automatic signing; ensure the bundle ID isn't already used by another account |
| "Certificate not found" / "identity not found" | Re-download in Xcode → Settings → Accounts; `security find-identity -v -p codesigning` |
| "Provisioning profile doesn't include this device" | Rebuild profiles with the device registered (automatic signing handles it) |
| "CodeSign error: no identity found" | Set `CODE_SIGN_IDENTITY`; never `-skipCodeSigning` for device builds |

### macOS Distribution Specifics

- App Store: `Apple Distribution` profiles — no notarization needed.
- Direct download: **Developer ID Application** cert + **hardened runtime**, then notarize:

```bash
xcrun notarytool submit build/MyApp.dmg --keychain-profile "AC_PASSWORD" --wait
xcrun stapler staple build/MyApp.dmg
```

---

## 5. Swift Package Manager

### `Package.swift` Anatomy

```swift
// swift-tools-version:6.0
import PackageDescription

let package = Package(
    name: "MyKit",
    platforms: [.iOS(.v17), .macOS(.v14)],
    products: [
        .library(name: "MyKit", targets: ["MyKit"]),
    ],
    dependencies: [
        .package(url: "https://github.com/pointfreeco/swift-snapshot-testing.git",
                 from: "1.17.0"),
    ],
    targets: [
        .target(
            name: "MyKit",
            dependencies: [
                .product(name: "SnapshotTesting", package: "swift-snapshot-testing"),
            ],
            resources: [.process("Resources")]
        ),
        .testTarget(name: "MyKitTests", dependencies: ["MyKit"]),
    ]
)
```

### CLI

```bash
swift build
swift test
swift test --filter CartTests
swift package resolve
swift package show-dependencies
```

### SPM in Xcode

- Add local packages via File → Add Package Dependencies → "Add Local…"; they become workspace dependencies.
- **SPM vs CocoaPods:** CocoaPods (`Podfile`, `pod install`, `.xcworkspace`) is legacy — keep it for existing projects, use SPM for new work. Carthage is effectively dormant.
- **Generated projects (brief):** [XcodeGen](https://github.com/yonaskolb/XcodeGen) (`project.yml` → `xcodegen generate`) and [Tuist](https://tuist.io) (`Project.swift`) for repo-generated `.xcodeproj` — great for monorepos and CI reproducibility.

| ❌ NEVER | ✅ ALWAYS |
| --- | --- |
| Commit `DerivedData/` or `.build/` | `gitignore` build outputs |
| Reference a package by path in release builds | Pin to tags (`from:`, `exact:`) |
| Hand-edit `.xcodeproj` for every change | Change targets in Xcode or a generator config |

---

## 6. Previews

```swift
// ✅ CORRECT: #Preview macro (Xcode 15+, iOS 17+ / macOS 14+)
#Preview("Cart with items") {
    CartView()
        .modelContainer(PreviewData.container)     // inject preview dependencies
}

// ✅ CORRECT: preview parameters (Xcode 16+)
#Preview {
    @Previewable @State var cart = Cart()
    CartView(cart: cart)
}
```

| Feature | Notes |
| --- | --- |
| Canvas | Instant render; pin variants (dark mode, size) from the bottom toolbar |
| Live preview | `⌘⌥P` / "Live" — runs the app, interactive |
| Preview on device | Requires app target + signing; use for camera/permissions |
| Data | Keep previews deterministic: `PreviewData` fixtures, no network |

### Limitations

- Previews don't run tests or exercise the full app lifecycle.
- Deployment target can be lower than iOS 17 (the macro is compile-time), but the *developing* machine needs Xcode 15+.
- Missing `.modelContainer` / environment injection is the #1 cause of preview crashes.

---

## 7. Debugging

### LLDB Essentials

```lldb
(lldb) po myObject          # print object description
(lldb) p cart.total         # print value
(lldb) expr cart.total = 0  # mutate state mid-session
(lldb) bt                   # backtrace
(lldb) breakpoint set --file ViewController.swift --line 42
(lldb) continue             # continue / next / step
(lldb) frame variable       # locals
```

| Feature | Where |
| --- | --- |
| Symbolic breakpoint | Break on any class's symbol (`viewDidLoad`) |
| Exception breakpoint | All Swift/Obj-C exceptions → finds the crash line |
| Data breakpoints | Break when a variable's memory changes |
| View Hierarchy debugger | Debug area top-right button — inspect views, constraints, frames |
| Network panel | See requests/responses; breakpoints on API calls |

### Instruments

| Instrument | Diagnoses |
| --- | --- |
| **Time Profiler** | CPU hotspots — sample, then fix the top stack |
| **Leaks** | Retain cycles / leaked objects |
| **Allocations** | Memory growth, transient spikes |
| **Core Animation** | Off-screen rendering, layer churn |
| **Zombies** | Messages to deallocated objects |
| **Energy Log** | Background activity, timers, location |

### Crash Logs & Unified Logging

```bash
# symbolicate a crash (point DEVELOPER_DIR at the Xcode with matching dSYMs)
xcrun symbolicatecrash -o out.crash in.crash

# inspect logs from simulator
xcrun simctl spawn booted log show --last 1h --predicate 'eventMessage CONTAINS "MyApp"'
```

```swift
// ✅ CORRECT: unified logging
import os
let logger = Logger(subsystem: "com.example.MyApp", category: "network")
logger.error("Request failed: \(error, privacy: .public)")
```

> Device crashes: Xcode → Window → Organizer / Devices window.

### Debug vs Release Traps

| ❌ NEVER | ✅ ALWAYS |
| --- | --- |
| Assert release behavior using `#if DEBUG` code paths you never run | Smoke-test a `Release` build locally |
| Rely on `print` (no timestamps/filtering) | `Logger` with subsystems and categories |
| `fatalError` on user input paths | Validate inputs; `assert` only invariants |
| Profile in Debug | Profile in `Release` |

---

## 8. Info.plist & Entitlements

### Key Info.plist Keys

| Key | Purpose |
| --- | --- |
| `NSCameraUsageDescription`, `NSMicrophoneUsageDescription` | Required usage strings — app crashes without them on access |
| `NSPhotoLibraryUsageDescription` / `NSPhotoLibraryAddUsageDescription` | Photo library read / add-only |
| `NSLocationWhenInUseUsageDescription`, `NSLocationAlwaysAndWhenInUseUsageDescription` | Location access |
| `NSFaceIDUsageDescription` | Face ID |
| `UILaunchScreen` | Empty dict `{}` = system default launch screen |
| `CFBundleShortVersionString` / `CFBundleVersion` | Marketing version / build number |
| `UISupportedInterfaceOrientations` | Portrait-only apps, etc. |
| `ITSAppUsesNonExemptEncryption` | Export-compliance question in App Store Connect |

> With `GENERATE_INFOPLIST_FILE = YES`, use `INFOPLIST_KEY_*` build settings instead of a hand-maintained file.

### macOS Entitlements (Sandboxed Apps)

| Entitlement | Key |
| --- | --- |
| App Sandbox | `com.apple.security.app-sandbox` = true |
| User-selected files (read/write) | `com.apple.security.files.user-selected.read-write` |
| Outgoing network | `com.apple.security.network.client` |
| Listening sockets | `com.apple.security.network.server` |
| App Groups (iOS + macOS) | `com.apple.security.application-groups` = `group.com.example.app` |

> App Group entitlements must match the provisioning profile, or signing fails at install.

---

## 9. Release Workflow

### Versioning

```bash
# bump build number / marketing version (all targets)
xcrun agvtool new-version -all 42
xcrun agvtool new-marketing-version -all 2.4.0
```

`CFBundleVersion` must increase for every TestFlight / App Store upload of the same version.

### Archive → TestFlight → App Store

```bash
xcodebuild archive -project MyApp.xcodeproj -scheme MyApp \
  -destination 'generic/platform=iOS' \
  -archivePath build/MyApp.xcarchive

xcodebuild -exportArchive \
  -archivePath build/MyApp.xcarchive \
  -exportOptionsPlist build/ExportOptions.plist \
  -exportPath build/export
```

| Step | Checklist |
| --- | --- |
| Before archive | Release build clean, tests green, version bumped, assets complete |
| App Store Connect | Upload via Xcode Organizer / Transporter (`xcrun altool --upload-app` is legacy); fill privacy labels |
| TestFlight | `app-store-connect` export method; internal + external test groups |
| App Review | Launch screen, usage descriptions, export compliance |
| Post-release | Monitor crash reports; bump build number for hotfixes |

### Fastlane (brief)

| Lane action | Replaces |
| --- | --- |
| `gym` | `xcodebuild archive` + `-exportArchive` |
| `match` | Managing signing certs/profiles across a team |
| `deliver` | App Store upload + metadata |
| `pilot` | TestFlight upload/distribution |
| `snapshot` | UI-test-driven store screenshots |

---

## 10. Common Build Errors & Fixes

| Error | Cause | Fix |
| --- | --- | --- |
| "Signing for 'X' requires a development team" | No team on target | Set `DEVELOPMENT_TEAM`; enable automatic signing |
| "The iOS deployment target ... is newer than the deployment target of 'Pod'" | Dependency requires a newer OS | Raise target or update the dependency |
| "framework not found" | Missing linked framework | Add to Frameworks phase; check SPM product dependency |
| "Multiple commands produce ..." | Same file in two build phases | Deduplicate file references / `Copy Bundle Resources` |
| Sendable / actor-isolation errors (Swift 6) | Shared mutable state crossing concurrency domains | `Sendable` value types, `@MainActor` for UI, locks with `@unchecked Sendable` |
| "duplicate symbol '_main'" | Two files define the same symbol | Remove duplicate source / duplicated library |
| Info.plist "data couldn't be read" | Corrupt/duplicated keys | `plutil -lint`; check `INFOPLIST_KEY_*` overlap |
| Entitlements "profile doesn't include" | Profile ≠ entitlements | Regenerate profiles; match `application-groups` |
| "Command PhaseScriptExecution failed" | Script phase crash | Run the script manually; check `set -e` paths |
| `xcodebuild` exit 65, no errors | No matching scheme/destination | `xcodebuild -list` + `-showdestinations` first |

---

## 11. Build Verification Checklist

> 🔴 **MANDATORY before declaring any Xcode/Swift work done:**

- [ ] `xcodebuild -list -project MyApp.xcodeproj` — scheme exists.
- [ ] Clean build: `xcodebuild build -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16' -derivedDataPath build/DD` → `** BUILD SUCCEEDED **`.
- [ ] Tests: `xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16'` → `** TEST SUCCEEDED **`.
- [ ] App launches: `xcrun simctl launch booted com.example.MyApp`.
- [ ] No console errors: `xcrun simctl spawn booted log stream --predicate 'process == "MyApp"'`.
- [ ] New files are members of the correct target (else "cannot find type" link errors).
- [ ] SwiftPM packages resolve; `Package.resolved` committed.

---

> **The CLI is the source of truth.** What Xcode shows interactively, `xcodebuild` can reproduce — use it to verify before you sign off.
