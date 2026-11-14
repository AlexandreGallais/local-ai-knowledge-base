---
title: "XRFrame: getHitTestResultsForTransientInput() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/gethittestresultsfortransientinput/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame: getHitTestResultsForTransientInput() method

The **`getHitTestResultsForTransientInput()`** method of the `XRFrame` interface returns an array of `XRTransientInputHitTestResult` objects containing transient input hit test results for a given `XRTransientInputHitTestSource`.

## Syntax

```js
getHitTestResultsForTransientInput(hitTestSource)
```

### Parameters

- `hitTestSource`
    An `XRTransientInputHitTestSource` object that contains transient input hit test subscriptions.

### Return value

An array of `XRTransientInputHitTestResult` objects.

## Examples

### Getting transient input hit test results

To request a transient input hit test source, start an `XRSession` with the `hit-test` session feature enabled. Next, request the hit test source with `XRSession.requestHitTestSourceForTransientInput()` and store it for later use in the frame loop. Finally, call `getHitTestResultsForTransientInput()` to obtain the result.

```js
const xrSession = navigator.xr.requestSession("immersive-ar", {
  requiredFeatures: ["local", "hit-test"],
});

let transientHitTestSource = null;
xrSession
  .requestHitTestSourceForTransientInput({
    profile: "generic-touchscreen",
    offsetRay: new XRRay(),
  })
  .then((touchScreenHitTestSource) => {
    transientHitTestSource = touchScreenHitTestSource;
  });

// frame loop
function onXRFrame(time, xrFrame) {
  let hitTestResults = xrFrame.getHitTestResultsForTransientInput(
    transientHitTestSource,
  );
  // do things with the transient hit test results
}
```

## See also

- `XRTransientInputHitTestResult`
- `XRTransientInputHitTestSource`
- `XRRay`
