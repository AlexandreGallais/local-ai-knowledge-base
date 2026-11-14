---
title: "AudioData: allocationSize() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodata/allocationsize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioData: allocationSize() method

The **`allocationSize()`** method of the `AudioData` interface returns the size in bytes required to hold the current sample as filtered by options passed into the method.

## Syntax

```js
allocationSize(options)
```

### Parameters

- `options`
    An object containing the following:
    - `planeIndex`
        The index of the plane to return the size of.
    - `frameOffset` (optional)
        An integer giving an offset into the plane data indicating which plane to begin from. Defaults to `0`.
    - `frameCount` (optional)
        An integer giving the number of frames to return the size of. If omitted then all frames in the plane will be used, beginning with the frame specified in `frameOffset`.

### Return value

An integer containing the number of bytes needed to hold the samples described by `options`.

## Examples

The following example gets the size of the plane at index `1`.

```js
let size = AudioData.allocationSize({ planeIndex: 1 });
```
