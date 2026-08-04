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
