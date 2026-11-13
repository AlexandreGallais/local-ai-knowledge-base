---
title: "XRTransientInputHitTestSource"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrtransientinputhittestsource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRTransientInputHitTestSource

The **`XRTransientInputHitTestSource`** interface of the WebXR Device API handles transient input hit test subscriptions. You can get an `XRTransientInputHitTestSource` object by calling the `XRSession.requestHitTestSourceForTransientInput()`.

This object doesn't itself contain transient input hit test results, but it is used to compute hit tests for each `XRFrame` by calling `XRFrame.getHitTestResultsForTransientInput()`, which returns `XRTransientInputHitTestResult` objects.

## Instance properties

None.

## Instance methods

- `XRTransientInputHitTestSource.cancel()` (experimental)
    Unsubscribes from the transient input hit test.

## Examples

### Getting an `XRTransientInputHitTestSource` object for a session

Use the `XRSession.requestHitTestSourceForTransientInput()` method to get a transient input hit test source.

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

### Unsubscribe from a transient input hit test

To unsubscribe from a transient input hit test source, use the `XRTransientInputHitTestSource.cancel()` method. Since the object will no longer be usable, you can clean up and set the `XRTransientInputHitTestSource` object to `null`.

```js
transientHitTestSource.cancel();
transientHitTestSource = null;
```

## See also

- `XRTransientInputHitTestResult`
