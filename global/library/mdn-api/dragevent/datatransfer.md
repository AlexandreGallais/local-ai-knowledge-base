---
title: "DragEvent: dataTransfer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dragevent/datatransfer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DragEvent: dataTransfer property

The **`DragEvent.dataTransfer`** read-only property holds the drag
operation's data (as a `DataTransfer` object).

## Value

A `DataTransfer` object which contains the `drag event's data`.

The property can be `null` when the event is created using the constructor. It is never `null` when dispatched by the browser.

## Examples

This example illustrates accessing the drag and drop data within the
`dragend` event handler.

```js
function processData(d) {
  // Process the data …
}

dragTarget.addEventListener("dragend", (ev) => {
  // Call the drag and drop data processor
  if (ev.dataTransfer !== null) processData(ev.dataTransfer);
});
```
