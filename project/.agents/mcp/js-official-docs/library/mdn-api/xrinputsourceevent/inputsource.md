---
title: "XRInputSourceEvent: inputSource property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourceevent/inputsource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourceEvent: inputSource property

The `XRInputSourceEvent` interface's read-only
**`inputSource`** property specifies the
`XRInputSource` which generated the input event. This information
lets you handle the event appropriately given the particulars of the user input device
being manipulated.

## Value

An `XRInputSource` object identifying the source of the user input event.
This event indicates an action the user has taken using a WebXR input controller, such
as a hand controller, motion sensing device, or other input apparatus.

## Examples

The snippet below shows a handler for the `select` event which looks specifically for events which happen on `gaze`
input devices. The device type is identified by looking at the
`XRInputSource` in `inputSource` and its
`targetRayMode` property.

```js
xrSession.onselect = (event) => {
  let source = event.inputSource;

  if (source.targetRayMode === "gaze") {
    /* handle selection using a gaze input */
  }
};
```
