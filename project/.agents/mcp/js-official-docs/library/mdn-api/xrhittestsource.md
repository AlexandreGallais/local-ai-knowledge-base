---
title: "XRHitTestSource"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrhittestsource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRHitTestSource

The **`XRHitTestSource`** interface of the WebXR Device API handles hit test subscriptions. You can get an `XRHitTestSource` object by using the `XRSession.requestHitTestSource()` method.

This object doesn't itself contain hit test results, but it is used to compute hit tests for each `XRFrame` by calling `XRFrame.getHitTestResults()`, which returns `XRHitTestResult` objects.

## Instance properties

None.

## Instance methods

- `XRHitTestSource.cancel()` (experimental)
    Unsubscribes from the hit test.

## Examples

### Getting an `XRHitTestSource` object for a session

Call `XRSession.requestHitTestSource()` to get a hit test source.

```js
const xrSession = navigator.xr.requestSession("immersive-ar", {
  requiredFeatures: ["local", "hit-test"],
});

let hitTestSource = null;

xrSession
  .requestHitTestSource({
    space: viewerSpace, // obtained from xrSession.requestReferenceSpace("viewer");
    offsetRay: new XRRay({ y: 0.5 }),
  })
  .then((viewerHitTestSource) => {
    hitTestSource = viewerHitTestSource;
  });

// frame loop
function onXRFrame(time, xrFrame) {
  let hitTestResults = xrFrame.getHitTestResults(hitTestSource);

  // do things with the hit test results
}
```

### Unsubscribe from hit test

To unsubscribe from a hit test source, call `XRHitTestSource.cancel()`. Since the object will no longer be usable, you can clean up and set the `XRHitTestSource` object to `null`.

```js
hitTestSource.cancel();
hitTestSource = null;
```

## See also

- `XRTransientInputHitTestSource`
