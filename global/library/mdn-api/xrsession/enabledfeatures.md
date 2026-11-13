---
title: "XRSession: enabledFeatures property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/enabledfeatures/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: enabledFeatures property

The `XRSession` interface's _read-only_ **`enabledFeatures`** property returns an array of features enabled (granted) for an `XRSession`. This contains all `requiredFeatures` and a subset of `optionalFeatures` that have been requested with `XRSystem.requestSession()`.

## Value

An `Array` of strings.

## Examples

### Detecting available WebXR session features

The `XRSystem.requestSession()` method allows you to request XR session features. The features can be requested either as `requiredFeatures` (the `XRSession` must support the feature), or as `optionalFeatures` (the `XRSession` may support the feature). The `enabledFeatures` property identifies which features are actually available in the session.

```js
navigator.xr
  .requestSession("immersive-ar", {
    requiredFeatures: ["local", "hit-test"],
    optionalFeatures: ["anchors"],
  })
  .then((xrSession) => {
    // Log enabledFeatures
    console.log(xrSession.enabledFeatures);

    // Check if anchors can be used
    if (xrSession.enabledFeatures.includes("anchors")) {
      // Go ahead and set up anchors
    }
  });
```

## See also

- `XRSystem.requestSession()`
- Session features
