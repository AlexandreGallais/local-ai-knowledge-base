---
title: "XRInputSourcesChangeEvent: added property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourceschangeevent/added/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourcesChangeEvent: added property

The read-only `XRInputSourcesChangeEvent`
property `added` is a list of zero or
more input sources, each identified using an `XRInputSource` object,
which have been newly made available for use.

## Value

An `Array` of zero or more `XRInputSource` objects, each
representing one input device added to the XR system.

## Examples

The example below creates a handler for the
`inputsourceschange` event that
processes the lists of added and removed from the WebXR system. It looks for new and
removed devices whose `targetRayMode` is
`tracked-pointer`.

```js
xrSession.oninputsourcescchange = (event) => {
  for (const input of event.added) {
    if (input.targetRayMode === "tracked-pointer") {
      addedPointerDevice(input);
    }
  }
  for (const input of event.removed) {
    if (input.targetRayMode === "tracked-pointer") {
      removedPointerDevice(input);
    }
  }
};
```
