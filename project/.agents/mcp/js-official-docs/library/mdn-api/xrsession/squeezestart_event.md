---
title: "XRSession: squeezestart event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/squeezestart_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: squeezestart event

The WebXR event **`squeezestart`** is sent to an `XRSession` when the user begins a primary squeeze action on one of its input sources.

Primary squeeze actions are actions which are meant to represent gripping or squeezing using your hands, and may be simulated using triggers on hand controllers.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("squeezestart", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsqueezestart = (event) => { }
```

## Event type

An `XRInputSourceEvent`. Inherits from `Event`.

## Description

### Trigger

Triggered when users begin squeezing the controller, making a hand gesture that mimes grabbing something, or using (squeezing) a trigger.

### Use cases

The `squeezestart` event is sent indicating that the user has begun a squeeze action.

If the primary squeeze action ends successfully, the session is sent a `squeeze` event.

A `squeezeend` event is sent to indicate that the squeeze action is no longer underway. This is sent whether the squeeze action succeeded or not.

## Examples

The following example uses `addEventListener()` to establish handlers for the squeeze events: `squeezestart`, `squeezeend`, and `squeeze`. This snippet is the core of an event handler to allow the user to grab objects in the scene and move them around.

In this case, a single function is used to handle all three events, allowing them to share certain code that's the same regardless of which of the three events is received. Only after completing those tasks does the `onSqueezeEvent()` function below dispatch the action out to a specialized function to handle things.

After checking to ensure that the received event is a `tracked-pointer` event (the only kind we handle here), the target ray's pose is obtained using `getPose()`.

If the target ray pose was fetched successfully, the code then uses the value of `Event` property `type` to route control to an appropriate function to handle the event which arrived:

- For `squeezestart` events, a `myBeginTracking()` function is called with the target ray pose's `matrix`. The `myBeginTracking()` function would presumably start the presentation of the object-dragging process, using the transform to perform a hit test, determining which object to pick up. `myBeginTracking()` returns an object representing the object the user has begun to drag.
- Upon receiving a `squeeze` event, the `myDropObject()` function is called with the target object, and the current target ray pose transform as inputs. This places the object into its new position in the world and triggers any effects that may arise, like scheduling an animation of a splash if dropped in water, etc.
- The `squeezeend` event results in a `myStopTracking()` function being called with the object being dragged and the final target ray pose's transform.

```js
xrSession.addEventListener("squeezestart", onSqueezeEvent);
xrSession.addEventListener("squeeze", onSqueezeEvent);
xrSession.addEventListener("squeezeend", onSqueezeEvent);

function onSqueezeEvent(event) {
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
    case "squeezestart":
      targetObj = myBeginTracking(targetRayPose.matrix);
      break;
    case "squeeze":
      myDropObject(targetObj, targetRayPose.matrix);
      break;
    case "squeezeend":
      myStopTracking(targetObj, targetRayPose.matrix);
      break;
  }
}
```

You can also set up a handler for these events by setting the `XRSession` object's event handler properties to a function that handles the event (but note that this replaces other event listeners added using `onsqueezestart`, `onsqueeze`, and `onsqueezeend`, if any):

```js
xrSession.onsqueezestart = onSqueezeEvent;
xrSession.onsqueeze = onSqueezeEvent;
xrSession.onsqueezeend = onSqueezeEvent;
```
