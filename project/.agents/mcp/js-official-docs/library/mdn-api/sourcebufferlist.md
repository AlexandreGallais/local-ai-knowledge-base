---
title: "SourceBufferList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sourcebufferlist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SourceBufferList

The **`SourceBufferList`** interface represents a simple container list for multiple `SourceBuffer` objects.

The source buffer list containing the `SourceBuffer`s appended to a particular `MediaSource` can be retrieved using the `MediaSource.sourceBuffers` property.

The individual source buffers can be accessed using the bracket notation `[]`.

## Instance properties

- `SourceBufferList.length` (read-only)
    Returns the number of `SourceBuffer` objects in the list.

## Instance methods

_Inherits methods from its parent interface, `EventTarget`._

## Events

- `addsourcebuffer`
    Fired when a `SourceBuffer` is added to the list.
- `removesourcebuffer`
    Fired when a `SourceBuffer` is removed from the list.

## Examples

This example shows how to access the active source buffers of the `MediaSource` connected to an already playing `HTMLVideoElement`.

```js
// Video is an already playing video using a MediaSource srcObject
const video = document.querySelector("video");
const mediaSource = video.srcObject;
const sourceBufferList = mediaSource.activeSourceBuffers;
for (const sourceBuffer of sourceBufferList) {
  // Do something with each SourceBuffer, such as call abort()
  sourceBuffer.abort();
}
```

## See also

- `MediaSource`
- `SourceBuffer`
