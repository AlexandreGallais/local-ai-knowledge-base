---
title: "XRLightProbe"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrlightprobe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRLightProbe

The **`XRLightProbe`** interface of the WebXR Device API contains lighting information at a given point in the user's environment. You can get an `XRLighting` object using the `XRSession.requestLightProbe()` method.

This object doesn't itself contain lighting values, but it is used to collect lighting states for each `XRFrame`. See `XRLightEstimate` for the estimated lighting values for an `XRLightProbe`.

## Instance properties

- `XRLightProbe.onreflectionchange`
    Event handler property for the `reflectionchange` event.
- `XRLightProbe.probeSpace` (read-only) (experimental)
    An `XRSpace` tracking the position and orientation the lighting estimations are relative to.

## Instance methods

None.

## Events

- `reflectionchange` (experimental)
    Fired each time the estimated reflection cube map changes. (This happens when the user moves around and the environment's lighting changes.)

## Examples

### Getting an `XRLightProbe` object for a session

Use the `XRSession.requestLightProbe()` method to get a light probe.

```js
const lightProbe = await xrSession.requestLightProbe();
```

### Getting a probe pose within an `XRFrame`

Pass the light probe's `probeSpace` to `XRFrame.getPose()` to get a light probe for a pose.

```js
const probePose = xrFrame.getPose(lightProbe.probeSpace, xrReferenceSpace);
```

### Using the `reflectionchange` event

Pass `XRLightProbe` to get a reflection cube map whenever the `reflectionchange` event fires. See also `XRWebGLBinding.getReflectionCubeMap()`.

```js
const glBinding = new XRWebGLBinding(xrSession, gl);
const lightProbe = await xrSession.requestLightProbe();
let glCubeMap = glBinding.getReflectionCubeMap(lightProbe);

lightProbe.addEventListener("reflectionchange", () => {
  glCubeMap = glBinding.getReflectionCubeMap(lightProbe);
});
```

## See also

- `XRSession.requestLightProbe()`
