---
title: "XRVisibilityMaskChangeEvent: session property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrvisibilitymaskchangeevent/session/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRVisibilityMaskChangeEvent: session property

The **`session`** read-only property of the `XRVisibilityMaskChangeEvent` interface indicates the `XRSession` to which the event belongs.

## Value

An `XRSession` object indicating which WebXR session the event belongs to.

## Examples

### Basic usage

This example indicates how you might check a custom `userRequestsSessionEnd` value when the `visibilitymaskchange` event fires to see whether the user has manually selected an option to end the XR session. If so, you can access the `XRSession` via the `session` property and end the session using `XRSession.end()`.

If the user has not selected this option, you could run some kind of function to render the new view based on the other values available in the `XRVisibilityMaskChangeEvent` object.

```js
xrSession.addEventListener("visibilitymaskchange", (e) => {
  if (userRequestsSessionEnd) {
    e.session.end();
  } else {
    renderNewView(e.index, e.eye, e.indices, e.vertices);
  }
});
```
