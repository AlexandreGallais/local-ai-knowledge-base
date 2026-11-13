---
title: "XRHitTestResult: getPose() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrhittestresult/getpose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRHitTestResult: getPose() method

The **`getPose()`** method of the `XRHitTestResult` interface returns the `XRPose` of the hit test result relative to the given base space.

## Syntax

```js
getPose(baseSpace)
```

### Parameters

- `baseSpace`
    An `XRSpace` to use as the base or origin for computing the relative position and orientation of hit test results.

### Return value

Returns an `XRPose` object.

## Examples

### Getting the hit test result's pose

The following example uses `getPose()` to query a single hit test result's pose.

```js
let hitTestResults = xrFrame.getHitTestResults(hitTestSource);

if (hitTestResults.length > 0) {
  let pose = hitTestResults[0].getPose(referenceSpace);
}
```

## See also

- `XRFrame.getPose()`
