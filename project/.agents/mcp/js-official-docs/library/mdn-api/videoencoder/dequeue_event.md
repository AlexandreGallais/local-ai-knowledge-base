---
title: "VideoEncoder: dequeue event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoencoder/dequeue_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoEncoder: dequeue event

The **`dequeue`** event of the `VideoEncoder` interface fires to signal a decrease in `VideoEncoder.encodeQueueSize`.

This eliminates the need for developers to use a `setTimeout()` poll to determine when the queue has decreased, and more work should be queued up.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("dequeue", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondequeue = (event) => { }
```

## Example

```js
videoEncoder.addEventListener("dequeue", (event) => {
  // Queue up more encoding work
});
```
