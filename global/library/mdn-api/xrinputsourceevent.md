---
title: "XRInputSourceEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourceevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourceEvent

The WebXR Device API's **`XRInputSourceEvent`** interface describes an event which has occurred on a WebXR user input device such as a hand controller, gaze tracking system, or motion tracking system. More specifically, they represent a change in the state of an `XRInputSource`.

To learn more about handling inputs in a WebXR project, see the article Inputs and input sources.

## Constructor

- `XRInputSourceEvent()`
    Creates and returns a new `XRInputSourceEvent` object whose properties match those provided in the `eventInitDict` dictionary provided.

## Instance properties

- `frame` (read-only)
    An `XRFrame` object providing the needed information about the event frame during which the event occurred. This frame may have been rendered in the past rather than being a current frame. Because this is an _event_ frame, not an _animation_ frame, you cannot call the `XRFrame` method `getViewerPose()` on it; instead, use `getPose()`.
- `inputSource` (read-only)
    An `XRInputSource` object indicating which input source generated the input event.

## Instance methods

_The `XRInputSourceEvent` interface doesn't define any methods; however, several methods are inherited from the parent interface, `Event`._

## Event types

- `select`
    Sent to an `XRSession` when the sending input source has fully completed a primary action.
- `selectend`
    Sent to an `XRSession` when an ongoing primary action ends, or when an input source with an ongoing primary action has been disconnected from the system.
- `selectstart`
    Sent to an `XRSession` when an input source begins its primary action, indicating that the user has begun a command-like input, such as pressing a trigger or button, issuing a spoken command, tapping on a touchpad, or the like.
- `squeeze`
    Sent to an `XRSession` when the sending input source has fully completed a primary squeeze action.
- `squeezeend`
    Sent to an `XRSession` when an ongoing primary squeeze action ends or when an input source with an ongoing primary squeeze action is disconnected.
- `squeezestart`
    Sent to an `XRSession` when an input source begins its primary squeeze action, indicating that the user has begun to grab, squeeze, or grip the controller.

## Examples

The code below sets up handlers for primary action events in order to determine when the user clicks on (shoots at/pokes at/whatever) objects in the scene.

```js
xrSession.addEventListener("select", (event) => {
  let targetRayPose = event.frame.getPose(
    event.inputSource.targetRaySpace,
    myRefSpace,
  );

  if (targetRayPose) {
    let hit = myHitTest(targetRayPose.transform);
    if (hit) {
      /* handle the hit */
    }
  }
});
```
