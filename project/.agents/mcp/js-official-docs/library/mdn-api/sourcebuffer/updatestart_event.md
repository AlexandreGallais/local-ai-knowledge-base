---
title: "SourceBuffer: updatestart event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sourcebuffer/updatestart_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SourceBuffer: updatestart event

The **`updatestart`** event of the `SourceBuffer` interface signals the beginning of an `appendBuffer()` or `remove()` operation. The `updating` attribute transitions from `false` to `true`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("updatestart", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onupdatestart = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Listening for the updatestart event

```js
const sourceBuffer = source.addSourceBuffer(mimeCodec);
sourceBuffer.addEventListener("updatestart", () => {
  downloadStatus.textContent = "Modifying buffer...";
});
sourceBuffer.addEventListener("updateend", () => {
  downloadStatus.textContent = "Modification complete";
});
```

## See also

- `SourceBuffer.appendBuffer()`
- `SourceBuffer.remove()`
