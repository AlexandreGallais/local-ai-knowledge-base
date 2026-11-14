---
title: "HTMLTextAreaElement: selectionchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/selectionchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: selectionchange event

The **`selectionchange`** event of the Selection API is fired when the text selection within a `<textarea>` element is changed in either extent or direction, whether the selection is a caret or a range of characters.

For general information about this event, see `HTMLInputElement`: `selectionchange` event.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("selectionchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onselectionchange = (event) => { }
```

## Event type

A generic `Event`.
