---
title: "XRHitTestResult"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrhittestresult/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRHitTestResult

The **`XRHitTestResult`** interface of the WebXR Device API contains a single result of a hit test. You can get an array of `XRHitTestResult` objects for a frame by calling `XRFrame.getHitTestResults()`.

## Instance properties

None.

## Instance methods

- `XRHitTestResult.createAnchor()` (experimental)
    Returns a `Promise` that resolves with an `XRAnchor` created from the hit test result.
- `XRHitTestResult.getPose()` (experimental)
    Returns the `XRPose` of the hit test result relative to the given base space.

## Examples

### Getting `XRHitTestResult` objects within the frame loop

In addition to showing `XRHitTestResult` within a frame loop, this example demonstrates a few things you must do before requesting this object. While setting up the session, specify `"hit-test"` as one of the `requiredFeatures`. Next, call `XRSession.requestHitTestSource()` with the desired references. (Obtain this by calling `XRSession.requestReferenceSpace()`.) This returns a `XRHitTestSource`. That you will use in the frame loop to get `XRHitTestResult` objects.

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

### Getting the hit test result's pose

Use `getPose()` to query the result's pose.

```js
let hitTestResults = xrFrame.getHitTestResults(hitTestSource);

if (hitTestResults.length > 0) {
  let pose = hitTestResults[0].getPose(referenceSpace);
}
```

### Creating an anchor from a hit test result

Once you find intersections on real-world surfaces using hit testing, you can create an `XRAnchor` to attach a virtual object to that location.

```js
hitTestResult.createAnchor().then(
  (anchor) => {
    // add anchored objects to the scene
  },
  (error) => {
    console.error(`Could not create anchor: ${error}`);
  },
);
```

## See also

- `XRTransientInputHitTestResult`
- `XRPose`
- `XRAnchor`
