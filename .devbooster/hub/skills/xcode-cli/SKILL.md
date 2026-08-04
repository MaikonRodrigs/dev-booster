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
