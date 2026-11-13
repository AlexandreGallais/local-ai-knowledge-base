---
title: "Window: vrdisplayconnect event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/vrdisplayconnect_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: vrdisplayconnect event

The **`vrdisplayconnect`** event of the WebVR API is fired when a compatible VR display is connected to the computer.

> **Note:**
> This event was part of the old WebVR API. It has been superseded by the WebXR Device API.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("vrdisplayconnect", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onvrdisplayconnect = (event) => { }
```

## Event type

A `VRDisplayEvent`. Inherits from `Event`.

## Examples

You can use the `vrdisplayconnect` event in an `addEventListener` method:

```js
window.addEventListener("vrdisplayconnect", () => {
  info.textContent = "Display connected.";
  reportDisplays();
});
```

Or use the `onvrdisplayconnect` event handler property (but note that this replaces other event listeners added using `onvrdisplayconnect`, if any):

```js
window.onvrdisplayconnect = () => {
  info.textContent = "Display connected.";
  reportDisplays();
};
```

## Specifications

This event was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR Device API, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
