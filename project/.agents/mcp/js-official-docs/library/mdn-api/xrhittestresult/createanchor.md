---
title: "XRHitTestResult: createAnchor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrhittestresult/createanchor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRHitTestResult: createAnchor() method

The **`createAnchor()`** method of the `XRHitTestResult` interface creates an `XRAnchor` from a hit test result that is attached to a real-world object.

## Syntax

```js
createAnchor()
```

### Parameters

None.

### Return value

A `Promise` resolving with an `XRAnchor` object.

## Examples

### Creating an anchor from a hit test result

The following example starts with an `XRHitTestResult` retrieved by calling `XRFrame.getHitTestResults()`. After calling `createAnchor()`, the Promise resolves with an `XRAnchor` to attach a virtual object to that location.

```js
hitTestResult.createAnchor().then(
  (anchor) => {
    // add anchored objects to the scene
  },
  (error) => {
    console.error(`Could not create anchor: ${error}`);
  },
);
```

## See also

- `XRAnchor`
- `XRFrame.createAnchor()`
