---
title: "PannerNode: PannerNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pannernode/pannernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PannerNode: PannerNode() constructor

The **`PannerNode()`** constructor of the Web Audio API creates a new `PannerNode` object instance.

## Syntax

```js
new PannerNode(context)
new PannerNode(context, options)
```

### Parameters

- `context`
    A `BaseAudioContext` representing the audio context you want the node to be associated with.
- `options` (optional)
    A `PannerOptions` dictionary object defining the properties you want the `PannerNode` to have:
    - `panningModel`
        The `PannerNode.panningModel` you want the `PannerNode` to have (the default is `equalpower`.)
    - `distanceModel`
        The `PannerNode.distanceModel` you want the `PannerNode` to have (the default is `inverse`.)
    - `positionX`
        The `PannerNode.positionX` you want the `PannerNode` to have (the default is `0`.)
    - `positionY`
        The `PannerNode.positionY` you want the `PannerNode` to have (the default is `0`.)
    - `positionZ`
        The `PannerNode.positionZ` you want the `PannerNode` to have (the default is `0`.)
    - `orientationX`
        The `PannerNode.orientationX` you want the `PannerNode` to have (the default is `1`.)
    - `orientationY`
        The `PannerNode.orientationY` you want the `PannerNode` to have (the default is `0`.)
    - `orientationZ`
        The `PannerNode.orientationZ` you want the `PannerNode` to have (the default is `0`.)
    - `refDistance`
        The `PannerNode.refDistance` you want the `PannerNode` to have. The default is `1`, and negative values are not allowed.
    - `maxDistance`
        The `PannerNode.maxDistance` you want the `PannerNode` to have. The default is `10000`, and non-positive values are not allowed.
    - `rolloffFactor`
        The `PannerNode.rolloffFactor` you want the `PannerNode` to have. The default is `1`, and negative values are not allowed.
    - `coneInnerAngle`
        The `PannerNode.coneInnerAngle` you want the `PannerNode` to have (the default is `360`.)
    - `coneOuterAngle`
        The `PannerNode.coneOuterAngle` you want the `PannerNode` to have (the default is `360`.)
    - `coneOuterGain`
        The `PannerNode.coneOuterGain` you want the `PannerNode` to have. The default is `0`, and its value can be in the range 0–1.
    - `channelCount`
        Represents an integer used to determine how many channels are used when up-mixing and down-mixing connections to any inputs to the node. (See
        `AudioNode.channelCount` for more information.) Its usage and precise
        definition depend on the value of `channelCountMode`.
    - `channelCountMode`
        Represents an enumerated value describing the way channels must be matched between
        the node's inputs and outputs. (See `AudioNode.channelCountMode` for more
        information including default values.)
    - `channelInterpretation`
        Represents an enumerated value describing the meaning of the channels. This
        interpretation will define how audio up-mixing and down-mixing will happen.
        The possible values are `"speakers"` or `"discrete"`. (See
        `AudioNode.channelCountMode` for more information including default
        values.)

### Exceptions

- `RangeError`
    Thrown if the `refDistance`, `maxDistance`, or `rolloffFactor` properties have been given a value that is outside the accepted range.
- `InvalidStateError` `DOMException`
    Thrown if the `coneOuterGain` property has been given a value outside the accepted range (0–1).

## Examples

```js
const ctx = new AudioContext();

const options = {
  positionX: 1,
  maxDistance: 5000,
};

const myPanner = new PannerNode(ctx, options);
```
