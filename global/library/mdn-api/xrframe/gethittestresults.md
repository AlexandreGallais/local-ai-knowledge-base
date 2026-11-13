---
title: "XRFrame: getHitTestResults() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/gethittestresults/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame: getHitTestResults() method

The **`getHitTestResults()`** method of the `XRFrame` interface returns an array of `XRHitTestResult` objects containing hit test results for a given `XRHitTestSource`.

## Syntax

```js
getHitTestResults(hitTestSource)
```

### Parameters

- `hitTestSource`
    An `XRHitTestSource` object that contains hit test subscriptions.

### Return value

An array of `XRHitTestResult` objects.

## Examples

### Getting hit test results

To request a hit test source, start an `XRSession` with the `hit-test` session feature enabled. Next, request the hit test source with `XRSession.requestHitTestSource()` and store it for later use in the frame loop. Finally, call `getHitTestResults()` to obtain the result.

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

## See also

- `XRHitTestResult`
- `XRHitTestSource`
- `XRRay`
