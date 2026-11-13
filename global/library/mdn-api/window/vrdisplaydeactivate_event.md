---
title: "Window: vrdisplaydeactivate event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/vrdisplaydeactivate_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: vrdisplaydeactivate event

The **`vrdisplaydeactivate`** event of the WebVR API is fired when a VR display can no longer be presented to, for example if an HMD has gone into standby or sleep mode due to a period of inactivity.

> **Note:**
> This event was part of the old WebVR API. It has been superseded by the WebXR Device API.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("vrdisplaydeactivate", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onvrdisplaydeactivate = (event) => { }
```

## Event type

A `VRDisplayEvent`. Inherits from `Event`.

## Examples

You can use the `vrdisplaydeactivate` event in an `addEventListener` method:

```js
window.addEventListener("vrdisplaydeactivate", () => {
  info.textContent = "Display deactivated.";
  reportDisplays();
});
```

Or use the `onvrdisplaydeactivate` event handler property (but note that this replaces other event listeners added using `onvrdisplaydeactivate`, if any):

```js
window.onvrdisplaydeactivate = () => {
  info.textContent = "Display deactivated.";
  reportDisplays();
};
```

## Specifications

This event was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR Device API, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
