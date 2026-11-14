---
title: "VRDisplayEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplayevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplayEvent

The **`VRDisplayEvent`** interface of the WebVR API represents the event object of WebVR-related events (see the list of WebVR window extensions).

> **Note:**
> This interface was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Constructor

- `VRDisplayEvent()` (deprecated) (non-standard)
    Creates a `VRDisplayEvent` object instance.

## Instance properties

_`VRDisplayEvent` also inherits properties from its parent object, `Event`._

- `VRDisplayEvent.display` (deprecated) (read-only) (non-standard)
    The `VRDisplay` associated with this event.
- `VRDisplayEvent.reason` (deprecated) (read-only) (non-standard)
    A human-readable reason why the event was fired.

## Examples

```js
window.addEventListener("vrdisplaypresentchange", (e) => {
  console.log(
    `Display ${e.display.displayId} presentation has changed. Reason given: ${e.reason}.`,
  );
});
```

## Specifications

This interface was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
