---
title: "XRSession: squeeze event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/squeeze_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: squeeze event

The WebXR **`squeeze`** event is sent to an `XRSession` when one of the session's input sources has completed a primary squeeze action. Examples of common kinds of primary action are users pressing triggers or buttons, tapping a touchpad, speaking a command, or performing a recognizable gesture when using a video tracking system or handheld controller with an accelerometer.

For details on how the `squeezestart`, `squeeze`, and `squeezeend` events work, and how you should react to them, see Inputs and input sources.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("squeeze", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsqueeze = (event) => { }
```

## Event type

An `XRInputSourceEvent`. Inherits from `Event`.

## Description

### Trigger

Triggered when users are squeezing the controller, making a hand gesture that mimes grabbing something, or using (squeezing) a trigger.

### Use cases

The `squeezestart` event indicates that the user has begun a squeeze action.

If the primary squeeze action ends successfully, the session is sent a `squeeze` event.

A `squeezeend` event is sent to indicate that the squeeze action is no longer underway. This is sent whether the squeeze action succeeded or not.

## Examples

The following example uses `addEventListener()` to set up a handler for the `squeeze` event. The handler fetches the pose representing the target ray for `tracked-pointer` inputs and sends the pose's transform to a function called `myHandleSqueezeWithRay()`.

This code treats the squeeze as an instantaneous action that doesn't involve tracking an ongoing activity. If you need to track a squeeze action that isn't instantaneous, listen for the `squeezestart` and `squeezeend` events to sense when the squeeze action begins and ends.

```js
xrSession.addEventListener("squeeze", (event) => {
  if (event.inputSource.targetRayMode === "tracked-pointer") {
    let targetRayPose = event.frame.getPose(
      event.inputSource.targetRaySpace,
      myRefSpace,
    );
    if (targetRayPose) {
      myHandleSqueezeWithRay(targetRayPose.transform);
    }
  }
});
```

You can also set up a handler for `squeeze` events by setting the `XRSession` object's `onsqueeze` event handler property to a function that handles the event (but note that this replaces other event listeners added using `onsqueeze`, if any):

```js
xrSession.onsqueeze = (event) => {
  if (event.inputSource.targetRayMode === "tracked-pointer") {
    let targetRayPose = event.frame.getPose(
      event.inputSource.targetRaySpace,
      myRefSpace,
    );
    if (targetRayPose) {
      myHandleSqueezeWithRay(targetRayPose.transform);
    }
  }
};
```

## See also

- `squeezestart` and `squeezeend` event
