---
title: "SourceBuffer: updateend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sourcebuffer/updateend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SourceBuffer: updateend event

The **`updateend`** event of the `SourceBuffer` interface signals the (not necessarily successful) completion of an `appendBuffer()` or `remove()` operation. The `updating` attribute transitions from `true` to `false`. This event is fired after the `update`, `error`, or `abort` events.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("updateend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onupdateend = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Handling the updateend event after appending data

This example demonstrates how to handle the `updateend` event. Note that we handle each completion event separately, and only use `updateend` for finalizing the stream.

```js
const sourceBuffer = source.addSourceBuffer(mimeCodec);
sourceBuffer.addEventListener("abort", () => {
  downloadStatus.textContent = "Canceled";
});
sourceBuffer.addEventListener("error", () => {
  downloadStatus.textContent = "Error occurred during decoding";
});
sourceBuffer.addEventListener("update", () => {
  downloadStatus.textContent = "Done";
});
sourceBuffer.addEventListener("updateend", () => {
  source.endOfStream();
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

- `SourceBuffer.appendBuffer()`
- `SourceBuffer.remove()`
