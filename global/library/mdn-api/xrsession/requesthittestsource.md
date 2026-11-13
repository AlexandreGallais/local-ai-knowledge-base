---
title: "XRSession: requestHitTestSource() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/requesthittestsource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: requestHitTestSource() method

The **`requestHitTestSource()`** method of the
`XRSession` interface returns a `Promise` that resolves with an `XRHitTestSource` object that can be passed to `XRFrame.getHitTestResults()`.

## Syntax

```js
requestHitTestSource(options)
```

### Parameters

- `options`
    An object containing configuration options, specifically:
    - `space`
        The `XRSpace` that will be tracked by the hit test source.
    - `entityTypes` (optional)
        An `Array` specifying the types of entities to be used for hit test source creation. If no entity type is specified, the array defaults to a single element with the `plane` type. Possible types:
        - `point`: Compute hit test results based on characteristic points detected.
        - `plane`: Compute hit test results based on real-world planes detected.
        - `mesh`: Compute hit test results based on meshes detected.
    - `offsetRay` (optional)
        The `XRRay` object that will be used to perform hit test. If no `XRRay` object has been provided, a new `XRRay` object is constructed without any parameters.

### Return value

A `Promise` that resolves with an `XRHitTestSource` object.

### Exceptions

Rather than throwing true exceptions, `requestHitTestSource()` rejects the
returned promise with a `DOMException`, specifically, one of the following:

- `NotSupportedError` `DOMException`
    Thrown if `hit-test` is not an enabled feature in `XRSystem.requestSession()`.
- `InvalidStateError` `DOMException`
    Thrown if the session has already ended.
- `NotAllowedError` `DOMException`
    Thrown if there is an unreasonable number of requests. Some user agents might limit usage for privacy reasons.

## Examples

### Requesting a hit test source

To request a hit test source, start an `XRSession` with the `hit-test` session feature enabled. Next, configure the hit test source and store it for later use in the frame loop and call `XRFrame.getHitTestResults()` to obtain the result.

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

- `XRSession.requestHitTestSourceForTransientInput()`
