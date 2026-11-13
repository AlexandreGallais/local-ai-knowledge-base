---
title: "SourceBuffer: abort event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sourcebuffer/abort_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SourceBuffer: abort event

The **`abort`** event of the `SourceBuffer` interface is fired when the buffer appending is aborted, because the `SourceBuffer.abort()` or `SourceBuffer.remove()` method is called while the `SourceBuffer.appendBuffer()` algorithm is still running. The `updating` property transitions from `true` to `false`. This event is fired before the `updateend` event.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("abort", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onabort = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Aborting an append operation

This example demonstrates how to abort an append operation and handle the `abort` event.

```js
const sourceBuffer = source.addSourceBuffer(mimeCodec);
sourceBuffer.addEventListener("abort", () => {
  downloadStatus.textContent = "Canceled";
});
sourceBuffer.addEventListener("update", () => {
  downloadStatus.textContent = "Done";
});
sourceBuffer.addEventListener("updateend", () => {
  source.endOfStream();
});
cancelButton.addEventListener("click", () => {
  if (sourceBuffer.updating) {
    sourceBuffer.abort();
  }
});
downloadStatus.textContent = "Downloading...";
fetch(assetURL)
  .then((response) => response.arrayBuffer())
  .then((data) => {
    downloadStatus.textContent = "Decoding...";
    sourceBuffer.appendBuffer(data);
  });
```

## See also

- `SourceBuffer.abort()`
