---
title: "XRFrame: fillJointRadii() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/filljointradii/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame: fillJointRadii() method

The **`fillJointRadii()`** method of the `XRFrame` interface populates a `Float32Array` with radii for a list of hand joint spaces and returns `true` if successful for all spaces.

## Syntax

```js
fillJointRadii(jointSpaces, radii)
```

### Parameters

- `jointSpaces`
    An array of `XRJointSpace` objects for which to obtain the radii.
- `radii`
    A `Float32Array` that is populated with the radii of the `jointSpaces`.

### Return value

A boolean indicating if all of the spaces have a valid pose.

### Exceptions

- `TypeError`
    Thrown if the length of `jointSpaces` is larger than the number of elements in `radii`.

## Examples

### Obtaining radii for all joints of a hand

To efficiently get all radii for all 25 joints of each `XRHand`, you can use the `fillJointRadii()` method.

```js
let radii1 = new Float32Array(25);
let radii2 = new Float32Array(25);

function onXRFrame(xrFrame, renderer) {
  let hand1 = xrFrame.session.inputSources[0].hand;
  xrFrame.fillJointRadii(hand1.values(), radii1);
  let hand2 = xrFrame.session.inputSources[1].hand;
  xrFrame.fillJointRadii(hand2.values(), radii2);
}
```

## See also

- `XRHand`
- `XRJointSpace`
- `Float32Array`
