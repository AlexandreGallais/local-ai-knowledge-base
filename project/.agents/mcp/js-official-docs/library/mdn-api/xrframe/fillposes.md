---
title: "XRFrame: fillPoses() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/fillposes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame: fillPoses() method

The **`fillPoses()`** method of the `XRFrame` interface populates a `Float32Array` with the matrices of the poses relative to a given base space and returns `true` if successful for all spaces.

## Syntax

```js
fillPoses(spaces, baseSpace, transforms)
```

### Parameters

- `spaces`
    An array of `XRSpace` objects for which to get the poses.
- `baseSpace`
    An `XRSpace` object to use as the base or origin for the relative position and orientation.
- `transforms`
    A `Float32Array` that is populated with the matrices of the poses relative to the given `baseSpace`.

### Return value

A boolean indicating if all of the spaces have a valid pose.

### Exceptions

- `TypeError`
    Thrown if the length of `spaces` multiplied by 16 is larger than the number of elements in `transforms`.

## Examples

### Obtaining poses for all joints of a hand

To efficiently get all poses for all 25 joints of each `XRHand`, you can use the `fillPoses()` method.

```js
let poses1 = new Float32Array(16 * 25);
let poses2 = new Float32Array(16 * 25);

function onXRFrame(xrFrame, renderer) {
  let hand1 = xrFrame.session.inputSources[0].hand;
  xrFrame.fillPoses(hand1.values(), renderer.referenceSpace, poses1);
  let hand2 = xrFrame.session.inputSources[1].hand;
  xrFrame.fillPoses(hand2.values(), renderer.referenceSpace, poses2);
}
```

## See also

- `XRHand`
- `XRJointSpace`
- `Float32Array`
