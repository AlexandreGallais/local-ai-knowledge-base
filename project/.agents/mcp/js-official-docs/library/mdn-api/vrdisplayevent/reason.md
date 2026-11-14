---
title: "VRDisplayEvent: reason property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplayevent/reason/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplayEvent: reason property

The **`reason`** read-only property of the `VRDisplayEvent` interface returns a human-readable reason why the event was fired.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

## Value

A string representing the reason why the event was fired. The available reasons are defined in the `VRDisplayEventReason` enum, and are as follows:

- `mounted` — The `VRDisplay` has detected that the user has put it on (or it has been otherwise activated).
- `navigation` — The page has been navigated to from a context that allows this page to begin presenting immediately, such as from another site that was already in VR presentation mode.
- `requested` — The user agent has requested that VR presentation mode be started. This allows user agents to include a consistent UI to enter VR across different sites.
- `unmounted` — The `VRDisplay` has detected that the user has taken it off (or it has been otherwise slept/put on standby).

## Examples

```js
window.addEventListener("vrdisplaypresentchange", (e) => {
  console.log(
    `Display ${e.display.displayId} presentation has changed. Reason given: ${e.reason}.`,
  );
});
```

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
