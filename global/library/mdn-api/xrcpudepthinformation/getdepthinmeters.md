---
title: "XRCPUDepthInformation: getDepthInMeters() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcpudepthinformation/getdepthinmeters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCPUDepthInformation: getDepthInMeters() method

The **`getDepthInMeters()`** method of the `XRCPUDepthInformation` interface returns the depth in meters at (x, y) in normalized view coordinates (origin in the top left corner).

## Syntax

```js
getDepthInMeters(x, y)
```

### Parameters

- `x`
    X coordinate (origin at the left, grows to the right).
- `y`
    Y coordinate (origin at the top, grows downward).

### Return value

None (`undefined`).

### Exceptions

- A `RangeError` is thrown if `x` or `y` are greater than 1.0 or less than 0.0.

## Examples

```js
const distance = depthInfo.getDepthInMeters(x, y);
```
