---
title: "Window: deviceorientationabsolute event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/deviceorientationabsolute_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: deviceorientationabsolute event

The **`deviceorientationabsolute`** event is fired when absolute device orientation changes.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("deviceorientationabsolute", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondeviceorientationabsolute = (event) => { }
```

## Event type

A `DeviceOrientationEvent`. Inherits from `Event`.

## See also

- `devicemotion` event
- `deviceorientation` event
- Detecting device orientation
