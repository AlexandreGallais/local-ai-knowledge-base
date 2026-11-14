---
title: "XRSession: select event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/select_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: select event

The WebXR **`select`** event is sent to an `XRSession` when one of the session's input sources has completed a primary action.

The `beforexrselect` is fired before this event and can prevent this event from being raised.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("select", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onselect = (event) => { }
```

## Event type

An `XRInputSourceEvent`. Inherits from `Event`.

## Description

### Trigger

Triggered when a user presses triggers or buttons, taps a touchpad, speaks a command or performs a recognizable gesture when using a video tracking system or handheld controller with an accelerometer.

### Use cases

The `selectstart` and `selectend` events tell you when you might want to display something to the user indicating that the primary action is going on. This might be drawing a controller with the activated button in a new color, or showing the targeted object being grabbed and moved around, starting when `selectstart` arrives and stopping when `selectend` is received.

The `select` event tells your code that the user has completed an action. This might be as simple as throwing an object or pulling the trigger of a gun in a game, or as involved as placing a dragged object at a new location.

If your primary action is a simple trigger action and you don't need to animate anything while the trigger is engaged, you can ignore the `selectstart` and `selectend` events and act on the start event.

## Examples

The following example uses `addEventListener()` to set up a handler for the `select` event. The handler fetches the pose representing the target ray for `tracked-pointer` inputs and sends the pose's transform to a function called `myHandleSelectWithRay()`.

```js
xrSession.addEventListener("select", (event) => {
  if (event.inputSource.targetRayMode === "tracked-pointer") {
    let targetRayPose = event.frame.getPose(
      event.inputSource.targetRaySpace,
      myRefSpace,
    );
    if (targetRayPose) {
      myHandleSelectWithRay(targetRayPose.transform);
    }
  }
});
```

You can also set up a handler for `select` events by setting the `XRSession` object's `onselect` event handler property to a function that handles the event (but note that this replaces other event listeners added using `onselect`, if any):

```js
xrSession.onselect = (event) => {
  if (event.inputSource.targetRayMode === "tracked-pointer") {
    let targetRayPose = event.frame.getPose(
      event.inputSource.targetRaySpace,
      myRefSpace,
    );
    if (targetRayPose) {
      myHandleSelectWithRay(targetRayPose.transform);
    }
  }
};
```

## See also

- `selectstart` and `selectend`
- `beforexrselect`
