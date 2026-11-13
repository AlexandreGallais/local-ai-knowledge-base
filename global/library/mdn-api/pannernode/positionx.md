---
title: "PannerNode: positionX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pannernode/positionx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PannerNode: positionX property

The **`positionX`** property of the `PannerNode` interface specifies the X coordinate of the audio source's position in 3D Cartesian
coordinates, corresponding to the _horizontal_ axis (left-right).

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
`codeOuterGain`), the orientation of the
sound may alter the perceived volume of the sound as it's being played. If the sound
is pointing toward the listener, it will be louder than if the sound is pointed away
from the listener.

The `AudioParam` contained by this property is read only; however, you
can still change the value of the parameter by assigning a new value to its
`AudioParam.value` property.

## Value

An `AudioParam` whose `value` is the X coordinate of the audio
source's position, in 3D Cartesian coordinates. The default value is 0.

## Examples

The following example starts an oscillator, and pans it to the left after 1 second, to
the right after 2 seconds, and back to the center after 3 seconds.

```js
const context = new AudioContext();

const osc = new OscillatorNode(context);
const panner = new PannerNode(context);

panner.positionX.setValueAtTime(-1, context.currentTime + 1);
panner.positionX.setValueAtTime(1, context.currentTime + 2);
panner.positionX.setValueAtTime(0, context.currentTime + 3);

osc.connect(panner).connect(context.destination);

osc.start(0);
```

## See also

- Using the Web Audio API
- Web Audio spatialization basics
- `PannerNode`
