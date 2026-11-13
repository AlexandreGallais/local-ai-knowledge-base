---
title: "XRTransientInputHitTestResult"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrtransientinputhittestresult/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRTransientInputHitTestResult

The **`XRTransientInputHitTestResult`** interface of the WebXR Device API contains an array of results of a hit test for transient input, grouped by input source.

You can get an array of `XRHitTestResult` objects for a frame by calling `XRFrame.getHitTestResultsForTransientInput()`.

## Instance properties

- `XRTransientInputHitTestResult.inputSource` (read-only) (experimental)
    Represents the `XRInputSource` that was used to compute the `results` array.
- `XRTransientInputHitTestResult.results` (read-only) (experimental)
    Represents an array of `XRHitTestResult` objects containing the hit test results for the input source, ordered by the distance along the ray used to perform the hit test, with the closest result at position 0.

## Instance methods

None.

## Examples

### Accessing transient input hit test results

Two arrays are used to access transient input hit test results. First, you get an array of `XRTransientInputHitTestResult` objects by calling `XRFrame.getHitTestResultsForTransientInput()`. Second, to get to the actual `XRHitTestResult` objects for an input source, you dereference the `results` property on one of the `XRTransientInputHitTestResult` objects.

```js
// frame loop
function onXRFrame(time, xrFrame) {
  let hitTestResults = xrFrame.getHitTestResultsForTransientInput(
    transientHitTestSource,
  );

  hitTestResults.forEach((resultsPerInputSource) => {
    resultsPerInputSource.results.forEach((hitTest) => {
      // do something with the hit test
      hitTest.getPose(referenceSpace);
    });
  });
}
```

### Filtering input sources

The `inputSource` property allows you to filter hit test results by input source.

```js
// frame loop
function onXRFrame(time, xrFrame) {
  let hitTestResults = xrFrame.getHitTestResultsForTransientInput(
    transientHitTestSource,
  );

  hitTestResults.forEach((resultsPerInputSource) => {
    if (resultsPerInputSource.inputSource === myPreferredInputSource) {
      // act on hit test results from the preferred input source
    }
  });
}
```

## See also

- `XRHitTestResult`
- `XRInputSource`
