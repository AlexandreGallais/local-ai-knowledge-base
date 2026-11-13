---
title: "VideoColorSpace"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videocolorspace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoColorSpace

The **`VideoColorSpace`** interface of the `WebCodecs API` represents the color space of a video.

## Constructor

- `VideoColorSpace()`
    Creates a new `VideoColorSpace` object.

## Instance properties

- `VideoColorSpace.primaries` (read-only)
    A string containing the color primary describing the color gamut of a video sample.
- `VideoColorSpace.transfer` (read-only)
    A string containing the transfer characteristics of video samples.
- `VideoColorSpace.matrix` (read-only)
    A string containing the matrix coefficients describing the relationship between sample component values and color coordinates.
- `VideoColorSpace.fullRange` (read-only)
    A `Boolean`. If `true` indicates that full-range color values are used.

## Instance methods

- `VideoColorSpace.toJSON()`
    Returns a JSON-serializable plain object representing the `VideoColorSpace` object. Automatically called by `JSON.stringify()`.

## Examples

In the following example, `colorSpace` is a `VideoColorSpace` object returned from `VideoFrame`. The object is then printed to the console.

```js
let colorSpace = VideoFrame.colorSpace;
console.log(colorSpace);
```
