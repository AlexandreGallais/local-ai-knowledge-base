---
title: "MediaSourceHandle"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasourcehandle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSourceHandle

The **`MediaSourceHandle`** interface of the `Media Source Extensions API` is a proxy for a `MediaSource` that can be transferred from a dedicated worker back to the main thread and attached to a media element via its `HTMLMediaElement.srcObject` property. `MediaSource` objects are not transferable because they are event targets, hence the need for `MediaSourceHandle`s.

It can be accessed via the `MediaSource.handle` property.

Each `MediaSource` object created inside a dedicated worker has its own distinct `MediaSourceHandle`. The `MediaSource.handle` getter will always return the `MediaSourceHandle` instance specific to the associated dedicated worker `MediaSource` instance. If the handle has already been transferred to the main thread using `postMessage()`, the handle instance in the worker is technically detached and can't be transferred again.

`MediaSourceHandle` is a transferable object.

## Instance properties

None.

## Instance methods

None.

## Examples

The `handle` property can be accessed inside a dedicated worker and the resulting `MediaSourceHandle` object is then transferred over to the thread that created the worker (in this case the main thread) via a `postMessage()` call:

```js
// Inside dedicated worker
let mediaSource = new MediaSource();
let handle = mediaSource.handle;
// Transfer the handle to the context that created the worker
postMessage({ arg: handle }, [handle]);

mediaSource.addEventListener("sourceopen", () => {
  // Await sourceopen on MediaSource before creating SourceBuffers
  // and populating them with fetched media — MediaSource won't
  // accept creation of SourceBuffers until it is attached to the
  // HTMLMediaElement and its readyState is "open"
});
```

Over in the main thread, we receive the handle via a `message` event handler, attach it to a `` via its `HTMLMediaElement.srcObject` property, and `play` the video:

```js
worker.addEventListener("message", (msg) => {
  let mediaSourceHandle = msg.data.arg;
  video.srcObject = mediaSourceHandle;
  video.play();
});
```

> **Note:**
> `MediaSourceHandle`s cannot be successfully transferred into or via a shared worker or service worker.

## See also

- MSE-in-Workers Demo by Matt Wolenetz
- `Media Source Extensions API`
- `MediaSource`
- `SourceBuffer`
