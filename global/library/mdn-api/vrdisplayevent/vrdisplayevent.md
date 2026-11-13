---
title: "VRDisplayEvent: VRDisplayEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplayevent/vrdisplayevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplayEvent: VRDisplayEvent() constructor

The **`VRDisplayEvent()`** constructor creates a `VRDisplayEvent` object.

> **Note:**
> This constructor was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Syntax

```js
new VRDisplayEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `vrdisplayconnect`, `vrdisplaydisconnect`, `vrdisplayactivate`, `vrdisplaydeactivate`, `vrdisplayblur`,
    `vrdisplaypointerrestricted`, `vrdisplaypointerunrestricted`, or `vrdisplaypresentchange`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `display`
        The `VRDisplay` the event is to be associated with.
    - `reason`
        A string representing the human-readable reason why the event is to be fired (see `VRDisplayEvent.reason`).

### Return value

A new `VRDisplayEvent` object.

## Examples

```js
const myEventObject = new VRDisplayEvent("custom", {
  display: vrDisplay,
  reason: "Custom reason",
});
```

## Specifications

This constructor was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
