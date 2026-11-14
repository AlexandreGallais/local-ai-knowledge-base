---
title: "AudioListener: setPosition() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiolistener/setposition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioListener: setPosition() method

The `setPosition()` method of the `AudioListener` Interface defines the position of the listener.

The three parameters `x`, `y` and `z` are unitless and describe the listener's position in 3D space according to the right-hand Cartesian coordinate system. `PannerNode` objects use this position relative to individual audio sources for spatialization.

The default value of the position vector is `(0, 0, 0)`.

> **Note:**
> As this method is deprecated, use the three `positionX`, `positionY`, and `positionZ` properties instead.

## Syntax

```js
setPosition(x, y, z)
```

### Parameters

- `x`
    The x position of the listener in 3D space.
- `y`
    The y position of the listener in 3D space.
- `z`
    The z position of the listener in 3D space.

### Return value

None (`undefined`).

## Examples

See `BaseAudioContext.createPanner()` for example code.

## See also

- Using the Web Audio API
