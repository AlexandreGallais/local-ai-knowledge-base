---
title: "VideoFrame: clone() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoframe/clone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoFrame: clone() method

The **`clone()`** method of the `VideoFrame` interface creates a new `VideoFrame` object referencing the same media resource as the original.

## Syntax

```js
clone()
```

### Parameters

None.

### Return value

A new cloned `VideoFrame` object.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `VideoFrame` object has been transferred.

## Examples

The following example clones a copy of `VideoFrame` as `videoFrame2`.

```js
let videoFrame2 = VideoFrame.clone();
```
