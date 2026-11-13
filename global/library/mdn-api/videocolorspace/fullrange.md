---
title: "VideoColorSpace: fullRange property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videocolorspace/fullrange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoColorSpace: fullRange property

The **`fullRange`** read-only property of the `VideoColorSpace` interface returns `true` if full-range color values are used.

## Value

A `Boolean`, `true` if full-range color values are used.

## Examples

In the following example, `colorSpace` is a `VideoColorSpace` object returned from `VideoFrame`. The value of `fullRange` is printed to the console.

```js
let colorSpace = VideoFrame.colorSpace;
console.log(colorSpace.fullRange);
```
