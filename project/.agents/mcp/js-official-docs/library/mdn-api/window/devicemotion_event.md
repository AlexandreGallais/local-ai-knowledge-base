---
title: "Window: devicemotion event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/devicemotion_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: devicemotion event

The **`devicemotion`** event is fired at a regular interval and indicates the acceleration rate of the device with/without the contribution of the gravity force at that time. It also provides information about the rate of rotation, if available.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("devicemotion", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondevicemotion = (event) => { }
```

## Event type

A `DeviceMotionEvent`. Inherits from `Event`.

## Examples

```js
function handleMotionEvent(event) {
  const x = event.accelerationIncludingGravity.x;
  const y = event.accelerationIncludingGravity.y;
  const z = event.accelerationIncludingGravity.z;

  // Do something awesome.
}

window.addEventListener("devicemotion", handleMotionEvent);
```

## See also

- `deviceorientation`
