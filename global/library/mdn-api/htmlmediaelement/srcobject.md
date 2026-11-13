---
title: "HTMLMediaElement: srcObject property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/srcobject/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: srcObject property

The **`srcObject`** property of the
`HTMLMediaElement` interface sets or returns the object which serves as
the source of the media associated with the `HTMLMediaElement`, or `null` if not assigned.

The object can be a `MediaStream`, a `MediaSource`, a
`Blob`, or a `File` (which inherits from `Blob`).

> **Note:**
> As of March 2020, only Safari has full support for `srcObject`, i.e., using `MediaSource`, `MediaStream`, `Blob`, and `File` objects as values. Other browsers support `MediaStream` objects; until they catch up, consider falling back to creating a URL with `URL.createObjectURL()` and assigning it to `HTMLMediaElement.src` (see below for an example). In addition, as of version 108 Chromium supports attaching a dedicated worker `MediaSource` object by assigning that object's `MediaSourceHandle` instance (transferred from the worker) to `srcObject`.

## Value

A `MediaStream`, `MediaSource`, `Blob`, or
`File` object (though see the compatibility table for what is actually
supported), or `null` if not assigned.

## Usage notes

Older versions of the Media Source specification required using
`URL.createObjectURL()` to create an object URL then
setting `src` to that URL. Now you can just set
`srcObject` to the `MediaStream` directly.

## Examples

### Basic <example-value>

In this example, a `MediaStream` from a camera is assigned to a
newly-created `` element.

```js
const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
const video = document.createElement("video");
video.srcObject = mediaStream;
```

In this example, a new `MediaSource` is assigned to a newly-created
`` element.

```js
const mediaSource = new MediaSource();
const video = document.createElement("video");
video.srcObject = mediaSource;
```

### Supporting fallback to the src property

The examples below support older browser versions that require you to create an object
URL and assign it to `src` if `srcObject` isn't supported.

First, a `MediaStream` from a camera is assigned to a newly-created
`` element, with fallback for older browsers.

```js
const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
const video = document.createElement("video");
if ("srcObject" in video) {
  video.srcObject = mediaStream;
} else {
  // Avoid using this in new browsers, as it is going away.
  video.src = URL.createObjectURL(mediaStream);
}
```

Second, a new `MediaSource` is assigned to a newly-created
`` element, with fallback for older browsers and browsers that
don't yet support assignment of `MediaSource` directly.

```js
const mediaSource = new MediaSource();
const video = document.createElement("video");
// Older browsers may not have srcObject
if ("srcObject" in video) {
  try {
    video.srcObject = mediaSource;
  } catch (err) {
    if (err.name !== "TypeError") {
      throw err;
    }
    // Even if they do, they may only support MediaStream
    video.src = URL.createObjectURL(mediaSource);
  }
} else {
  video.src = URL.createObjectURL(mediaSource);
}
```

### Constructing a `MediaSource` in a worker and passing it to the main thread to play

The `MediaSource.handle` property can be accessed inside a dedicated worker and the resulting `MediaSourceHandle` object is then transferred over to the thread that created the worker (in this case the main thread) via a `postMessage()` call:

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
