---
title: "XRInputSource: hand property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsource/hand/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSource: hand property

The read-only **`hand`** property of the `XRInputSource` interface is a `XRHand` object providing access to a hand-tracking device.

## Value

An `XRHand` object or `null` if the `XRSession` has not been requested with the `hand-tracking` feature descriptor.

## Examples

```js
navigator.xr
  .requestSession({ optionalFeatures: ["hand-tracking"] })
  .then(/* … */);

function renderFrame(session, frame) {
  // …

  for (const inputSource of session.inputSources) {
    if (inputSource.hand) {
      // render a hand model, perform gesture detection, etc.
    }
  }
}
```

## See also

- `XRHand`
