---
title: "HMDVRDevice: getEyeParameters() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hmdvrdevice/geteyeparameters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HMDVRDevice: getEyeParameters() method

The **`getEyeParameters()`** method of the `HMDVRDevice` interface returns current parameters for the eye specified as its argument ("left" or "right") — stored in a `VREyeParameters` object.

This includes field of view information, and more.

## Syntax

```js
getEyeParameters(whichEye)
```

### Parameters

- `whichEye`
    A string representing the eye you want to return information about. The value can be `left` or `right`.

### Return value

A `VREyeParameters` object.

## Examples

The following example is taken from the Mozilla VR Team's threejs-vr-boilerplate code — to be precise, the VREffect.js file. Early on in the code the `getEyeParameters()` method is used to access information about each eye, which is then used for rendering calculations later on.

```js
if (vrHMD.getEyeParameters !== undefined) {
  const eyeParamsL = vrHMD.getEyeParameters("left");
  const eyeParamsR = vrHMD.getEyeParameters("right");

  eyeTranslationL = eyeParamsL.eyeTranslation;
  eyeTranslationR = eyeParamsR.eyeTranslation;
  eyeFOVL = eyeParamsL.recommendedFieldOfView;
  eyeFOVR = eyeParamsR.recommendedFieldOfView;
} else {
  // …
}
```

## See also

- WebVR API
