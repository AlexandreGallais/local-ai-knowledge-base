---
title: "HTMLTextAreaElement: select event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/select_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: select event

The **`select`** event of the `HTMLTextAreaElement` interface fires when the selection's extent or direction is changed programmatically, or when the user selects text.

For general information about this event, see `HTMLInputElement`: `select` event.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("select", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onselect = (event) => { }
```

## Event type

A generic `Event`.
