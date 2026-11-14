---
title: "AudioListener"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiolistener/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioListener

The `AudioListener` interface represents the position and orientation of the unique person listening to the audio scene, and is used in audio spatialization. All `PannerNode`s spatialize in relation to the `AudioListener` stored in the `BaseAudioContext.listener` attribute.

It is important to note that there is only one listener per context and that it isn't an `AudioNode`.

## Instance properties

> **Note:**
> The position, forward, and up value are set and retrieved using different syntaxes. Retrieval is done by accessing, for example, `AudioListener.positionX`, while setting the same property is done with `AudioListener.positionX.value`.

- `AudioListener.positionX` (read-only)
    Represents the horizontal position of the listener in a right-hand cartesian coordinate system. The default is 0.
- `AudioListener.positionY` (read-only)
    Represents the vertical position of the listener in a right-hand cartesian coordinate system. The default is 0.
- `AudioListener.positionZ` (read-only)
    Represents the longitudinal (back and forth) position of the listener in a right-hand cartesian coordinate system. The default is 0.
- `AudioListener.forwardX` (read-only)
    Represents the horizontal position of the listener's forward direction in the same cartesian coordinate system as the position (`positionX`, `positionY`, and `positionZ`) values. The forward and up values are linearly independent of each other. The default is 0.
- `AudioListener.forwardY` (read-only)
    Represents the vertical position of the listener's forward direction in the same cartesian coordinate system as the position (`positionX`, `positionY`, and `positionZ`) values. The forward and up values are linearly independent of each other. The default is 0.
- `AudioListener.forwardZ` (read-only)
    Represents the longitudinal (back and forth) position of the listener's forward direction in the same cartesian coordinate system as the position (`positionX`, `positionY`, and `positionZ`) values. The forward and up values are linearly independent of each other. The default is -1.
- `AudioListener.upX` (read-only)
    Represents the horizontal position of the top of the listener's head in the same cartesian coordinate system as the position (`positionX`, `positionY`, and `positionZ`) values. The forward and up values are linearly independent of each other. The default is 0.
- `AudioListener.upY` (read-only)
    Represents the vertical position of the top of the listener's head in the same cartesian coordinate system as the position (`positionX`, `positionY`, and `positionZ`) values. The forward and up values are linearly independent of each other. The default is 1.
- `AudioListener.upZ` (read-only)
    Represents the longitudinal (back and forth) position of the top of the listener's head in the same cartesian coordinate system as the position (`positionX`, `positionY`, and `positionZ`) values. The forward and up values are linearly independent of each other. The default is 0.

## Instance methods

- `AudioListener.setOrientation()` (deprecated)
    Sets the orientation of the listener.
- `AudioListener.setPosition()` (deprecated)
    Sets the position of the listener.

> **Note:**
> Although these methods are deprecated they are currently the only way to set the orientation and position in Firefox (see Firefox bug 1283029).

## Deprecated features

The `setOrientation()` and `setPosition()` methods have been replaced by setting their property value equivalents. For example `setPosition(x, y, z)` can be achieved by setting `positionX.value`, `positionY.value`, and `positionZ.value` respectively.

## Example

See `BaseAudioContext.createPanner()` for example code.

## See also

- Using the Web Audio API
