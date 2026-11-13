---
title: "VideoColorSpace: VideoColorSpace() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videocolorspace/videocolorspace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoColorSpace: VideoColorSpace() constructor

The **`VideoColorSpace()`** constructor creates a new `VideoColorSpace` object which represents a video color space.

## Syntax

```js
new VideoColorSpace()
new VideoColorSpace(options)
```

### Parameters

All values default to `null` when they are not present.

- `options` (optional)
    An object containing the following:
    - `primaries` (optional)
        One of the following strings:
        - `"bt709"`
        - `"bt470bg"`
        - `"smpte170m"`
    - `transfer` (optional)
        One of the following strings:
        - `"bt709"`
        - `"smpte170m"`
        - `"iec61966-2-1"`
    - `matrix` (optional)
        One of the following strings:
        - `"rgb"`
        - `"bt709"`
        - `"bt470bg"`
        - `"smpte170m"`
    - `fullRange` (optional)
        A `Boolean`, `true` if full-range color values are used in the video.

## Examples

The following example creates a new `VideoColorSpace` object with `VideoColorSpace.primaries` set to `"bt709"`, and `VideoColorSpace.primaries` set to `true`.

```js
const options = {
  primaries: "bt709",
  fullRange: true,
};

const colorSpace = new VideoColorSpace(options);
console.log(colorSpace);
```
