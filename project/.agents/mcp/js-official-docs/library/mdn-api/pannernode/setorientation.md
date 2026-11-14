---
title: "PannerNode: setOrientation() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pannernode/setorientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PannerNode: setOrientation() method

> **Note:**
> The suggested replacement for this deprecated method is to instead set the `orientationX`, `orientationY`, and `orientationZ` attributes directly.

The `setOrientation()` method of the `PannerNode` Interface defines the direction the audio source is playing in.

This can have a big effect if the sound is very directional — controlled by the three cone-related attributes `PannerNode.coneInnerAngle`, `PannerNode.coneOuterAngle`, and `PannerNode.coneOuterGain`. In such a case, a sound pointing away from the listener can be very quiet or even silent.

The three parameters `x`, `y` and `z` are unitless and describe a direction vector in 3D space using the right-hand Cartesian coordinate system. The default value of the direction vector is `(1, 0, 0)`.

## Syntax

```js
setOrientation(x, y, z)
```

### Parameters

- `x`
    The x value of the panner's direction vector in 3D space.
- `y`
    The y value of the panner's direction vector in 3D space.
- `z`
    The z value of the panner's direction vector in 3D space.

### Return value

None (`undefined`).

## Examples

See `BaseAudioContext.createPanner()` for example code.

## See also

- Using the Web Audio API
