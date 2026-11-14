---
title: "XRSession: selectstart event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/selectstart_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: selectstart event

The WebXR **`selectstart`** event is sent to an `XRSession` when the user begins a primary action on one of its input sources.

The `beforexrselect` is fired before this event and can prevent this event from being raised.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("selectstart", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onselectstart = (event) => { }
```

## Event type

An `XRInputSourceEvent`. Inherits from `Event`.

## Description

### Trigger

Triggered when the user presses triggers or buttons, taps a touchpad, speaks a command, or performs a recognizable gesture when using a video tracking system or handheld controller with an accelerometer.

### Use cases

The `selectstart` and `selectend` events tell you when you might want to display something to the user indicating that the primary action is going on. This might be drawing a controller with the activated button in a new color, or showing the targeted object being grabbed and moved around, starting when `selectstart` arrives and stopping when `selectend` is received.

The `select` event tells your code that the user has completed the action they want to complete. This might be as simple as throwing an object or pulling the trigger of a gun in a game, or as involved as placing a dragged object in a new location.

If your primary action is a simple trigger action and you don't need to animate anything while the trigger is engaged, you can ignore the `selectstart` and `selectend` events and act on the start event.

## Examples

The following example uses `addEventListener()` to establish handlers for the selection events: `selectstart`, `selectend`, and `select`. This snippet is the core of an event handler to allow the user to grab objects in the scene and move them around.

In this case, a single function is used to handle all three events, allowing them to share certain code that's the same regardless of which of the three events is received. Only after completing those tasks does the `onSelectionEvent()` function below dispatch the action out to a specialized function to handle things.

After checking to ensure that the received event is a `tracked-pointer` event (the only kind we handle here), the target ray's pose is obtained using `getPose()`.

If the target ray pose was fetched successfully, the code then uses the value of `Event` property `type` to route control to an appropriate function to handle the event which arrived:

- For `selectstart` events, a `myBeginTracking()` function is called with the target ray pose's `matrix`. The `myBeginTracking()` function would presumably start the presentation of the object-dragging process, using the transform to perform a hit test, determining which object to pick up. `myBeginTracking()` returns an object representing the object the user has begun to drag.
- Upon receiving a `select` event, the `myDropObject()` function is called with the target object, and the current target ray pose transform as inputs. This places the object into its new position in the world and triggers any effects that may arise, like scheduling an animation of a splash if dropped in water, etc.
- The `selectend` event results in a `myStopTracking()` function being called with the object being dragged and the final target ray pose's transform.

```js
xrSession.addEventListener("selectstart", onSelectionEvent);
xrSession.addEventListener("select", onSelectionEvent);
xrSession.addEventListener("selectend", onSelectionEvent);

function onSelectionEvent(event) {
  let source = event.inputSource;
  let targetObj = null;

  if (source.targetRayMode !== "tracked-pointer") {
    return;
  }

  let targetRayPose = event.frame.getPose(source.targetRaySpace, myRefSpace);
  if (!targetRayPose) {
    return;
  }

  switch (event.type) {
    case "selectstart":
      targetObj = myBeginTracking(targetRayPose.matrix);
      break;
    case "select":
      myDropObject(targetObj, targetRayPose.matrix);
      break;
    case "selectend":
      myStopTracking(targetObj, targetRayPose.matrix);
      break;
  }
}
```

You can also set up a handler for `selectend` events by setting the `XRSession` object's `onselectend` event handler property to a function that handles the event (but note that this replaces other event listeners added using `onselectstart`, `onselect`, and `onselectend`, if any):

```js
xrSession.onselectstart = onSelectionEvent;
xrSession.onselect = onSelectionEvent;
xrSession.onselectend = onSelectionEvent;
```

## See also

- `select` and `selectend`
- `beforexrselect`
