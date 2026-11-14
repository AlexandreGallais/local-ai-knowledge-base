---
title: "PannerNode: orientationY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pannernode/orientationy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PannerNode: orientationY property

The **`orientationY`** property of the `PannerNode` interface
indicates the Y (vertical) component of the direction the audio source is facing, in 3D Cartesian coordinate space.

The complete vector is defined by the position of the audio source, given as
(`positionX`, `positionY`,
`positionZ`), and the orientation
of the audio source (that is, the direction in which it's facing), given as
(`orientationX`,
`orientationY`,
`orientationZ`).

Depending on the directionality of the sound (as specified using the attributes
`coneInnerAngle`,
`coneOuterAngle`, and
`coneOuterGain`), the orientation of the
sound may alter the perceived volume of the sound as it's being played. If the sound
is pointing toward the listener, it will be louder than if the sound is pointed away
from the listener.

The `AudioParam` contained by this property is read only; however, you
can still change the value of the parameter by assigning a new value to its
`AudioParam.value` property.

## Value

An `AudioParam` whose `value` is the Y component of the
direction the audio source is facing, in 3D Cartesian coordinate space.

## Examples

See `PannerNode.orientationX` for example code that demonstrates the effect on volume of changing the `PannerNode` orientation parameters in combination with `coneInnerAngle` and `coneOuterAngle`.

## See also

- Using the Web Audio API
- Web Audio spatialization basics
- `PannerNode`
