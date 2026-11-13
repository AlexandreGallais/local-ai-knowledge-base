---
title: "XRTransientInputHitTestResult: inputSource property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrtransientinputhittestresult/inputsource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRTransientInputHitTestResult: inputSource property

The _read-only_ **`inputSource`** property of the `XRTransientInputHitTestResult` interface represents an `XRInputSource` object that was used to compute the `results` array.

## Value

An `XRInputSource` object.

## Examples

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

- `XRInputSource`
