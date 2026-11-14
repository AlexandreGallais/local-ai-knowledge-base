---
title: "PannerNode: setPosition() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pannernode/setposition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PannerNode: setPosition() method

> **Note:**
> The suggested replacement for this deprecated method is to instead set the `positionX`, `positionY`, and `positionZ` attributes directly.

The `setPosition()` method of the `PannerNode` Interface defines the position of the audio source relative to the listener (represented by an `AudioListener` object stored in the `BaseAudioContext.listener` attribute.) The three parameters `x`, `y` and `z` are unitless and describe the source's position in 3D space using the right-hand Cartesian coordinate system.

The `setPosition()` method's default value of the position is `(0, 0, 0)`.

## Syntax

```js
setPosition(x, y, z)
```

### Parameters

- `x`
    The x position of the panner in 3D space.
- `y`
    The y position of the panner in 3D space.
- `z`
    The z position of the panner in 3D space.

### Return value

None (`undefined`).

## Examples

See `BaseAudioContext.createPanner()` for example code.

## See also

- Using the Web Audio API
