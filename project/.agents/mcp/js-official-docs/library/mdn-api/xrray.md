---
title: "XRRay"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRRay

The **`XRRay`** interface of the WebXR Device API is a geometric ray described by an origin point and a direction vector.

`XRRay` objects can be passed to `XRSession.requestHitTestSource()` or `XRSession.requestHitTestSourceForTransientInput()` to perform hit testing.

## Constructor

- `XRRay()` (experimental)
    Creates a new `XRRay` object.

## Instance properties

- `XRRay.direction` (read-only) (experimental)
    A `DOMPointReadOnly` representing the ray's 3-dimensional directional vector.
- `XRRay.matrix` (read-only) (experimental)
    A transform that can be used to position objects along the `XRRay`. This is a 4 by 4 matrix given as a 16 element `Float32Array` in column major order.
- `XRRay.origin` (read-only) (experimental)
    A `DOMPointReadOnly` representing the 3-dimensional point in space that the ray originates from, in meters.

## Instance methods

None.

## Examples

### Using `XRRay` to request a hit test source

The `XRSession.requestHitTestSource()` method takes an `XRRay` object for its `offsetRay` option. In this example, the hit test source is positioned slightly above the viewer as the application has some UI elements at the bottom while wanting to maintain the perception of a centered cursor.

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
```

## See also

- `XRSession.requestHitTestSource()`
- `XRHitTestResult`
