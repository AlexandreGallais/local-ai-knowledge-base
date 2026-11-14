---
title: "MediaSource"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource

The **`MediaSource`** interface of the `Media Source Extensions API` represents a source of media data for an `HTMLMediaElement` object. A `MediaSource` object can be attached to a `HTMLMediaElement` to be played in the user agent.

## Constructor

- `MediaSource()`
    Constructs and returns a new `MediaSource` object with no associated source buffers.

## Static properties

- `MediaSource.canConstructInDedicatedWorker` (read-only)
    A boolean; returns `true` if `MediaSource` worker support is implemented, providing a low-latency feature detection mechanism.

## Instance properties

- `MediaSource.activeSourceBuffers` (read-only)
    Returns a `SourceBufferList` object containing a subset of the `SourceBuffer` objects contained within `MediaSource.sourceBuffers` — the list of objects providing the selected video track, enabled audio tracks, and shown/hidden text tracks.
- `MediaSource.duration`
    Gets and sets the duration of the current media being presented.
- `MediaSource.handle` (read-only)
    Inside a dedicated worker, returns a `MediaSourceHandle` object, a proxy for the `MediaSource` that can be transferred from the worker back to the main thread and attached to a media element via its `HTMLMediaElement.srcObject` property.
- `MediaSource.readyState` (read-only)
    Returns an enum representing the state of the current `MediaSource`, whether it is not currently attached to a media element (`closed`), attached and ready to receive `SourceBuffer` objects (`open`), or attached but the stream has been ended via `MediaSource.endOfStream()` (`ended`.)
- `MediaSource.sourceBuffers` (read-only)
    Returns a `SourceBufferList` object containing the list of `SourceBuffer` objects associated with this `MediaSource`.

## Static methods

- `MediaSource.isTypeSupported()`
    Returns a boolean value indicating whether the current user agent supports the given MIME type — this is, if it can successfully create `SourceBuffer` objects for that MIME type.

## Instance methods

_Inherits methods from its parent interface, `EventTarget`._

- `MediaSource.addSourceBuffer()`
    Creates a new `SourceBuffer` of the given MIME type and adds it to the `MediaSource.sourceBuffers` list.
- `MediaSource.clearLiveSeekableRange()`
    Clears a seekable range previously set with a call to `setLiveSeekableRange()`.
- `MediaSource.endOfStream()`
    Signals the end of the stream.
- `MediaSource.removeSourceBuffer()`
    Removes the given `SourceBuffer` from the `MediaSource.sourceBuffers` list.
- `MediaSource.setLiveSeekableRange()`
    Sets the range that the user can seek to in the media element.

## Events

- `sourceclose`
    Fired when the `MediaSource` instance is not attached to a media element anymore.
- `sourceended`
    Fired when the `MediaSource` instance is still attached to a media element, but `endOfStream()` has been called.
- `sourceopen`
    Fired when a media element has opened the `MediaSource` instance and it is ready for data to be appended to the `SourceBuffer` objects in `sourceBuffers`.

## Examples

### Complete basic <example-value>

The following basic <example-value> loads a video using `XMLHttpRequest` and plays it as soon as it can. This example can be viewed live here (you can also download the source for further investigation).

```js
const video = document.querySelector("video");

const assetURL = "frag_bunny.mp4";
// Need to be specific for Blink regarding codecs
// ./mp4info frag_bunny.mp4 | grep Codec
const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
let mediaSource;

if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
  mediaSource = new MediaSource();
  console.log(mediaSource.readyState); // closed
  video.src = URL.createObjectURL(mediaSource);
  mediaSource.addEventListener("sourceopen", sourceOpen);
} else {
  console.error("Unsupported MIME type or codec: ", mimeCodec);
}

function sourceOpen() {
  console.log(this.readyState); // open
  const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  fetchAB(assetURL, (buf) => {
    sourceBuffer.addEventListener("updateend", () => {
      mediaSource.endOfStream();
      video.play();
      console.log(mediaSource.readyState); // ended
    });
    sourceBuffer.appendBuffer(buf);
  });
}

function fetchAB(url, cb) {
  console.log(url);
  const xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.responseType = "arraybuffer";
  xhr.onload = () => {
    cb(xhr.response);
  };
  xhr.send();
}
```

### Constructing a `MediaSource` in a dedicated worker and passing it to the main thread

The `handle` property can be accessed inside a dedicated worker, and the resulting `MediaSourceHandle` object is then transferred over to the thread that created the worker (in this case, the main thread) via a `postMessage()` call:

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

- `SourceBuffer`
- `SourceBufferList`
