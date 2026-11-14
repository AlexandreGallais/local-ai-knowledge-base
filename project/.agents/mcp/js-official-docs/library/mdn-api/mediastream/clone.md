---
title: "MediaStream: clone() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastream/clone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStream: clone() method

The **`clone()`** method of the `MediaStream`
interface creates a duplicate of the `MediaStream`. This new
`MediaStream` object has a new unique `id` and
contains clones of every `MediaStreamTrack` contained by the
`MediaStream` on which `clone()` was called.

## Syntax

```js
clone()
```

### Parameters

None.

### Return value

A new `MediaStream` instance which has a new unique ID and contains clones
of every `MediaStreamTrack` contained by the `MediaStream` on
which `clone()` was called.
