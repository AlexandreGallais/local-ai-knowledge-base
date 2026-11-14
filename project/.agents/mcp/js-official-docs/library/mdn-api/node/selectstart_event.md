---
title: "Node: selectstart event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/selectstart_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: selectstart event

The **`selectstart`** event of the Selection API is fired when a user starts a new selection.

If the event is canceled, the selection is not changed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("selectstart", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onselectstart = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
// addEventListener version
document.addEventListener("selectstart", () => {
  console.log("Selection started");
});

// onselectstart version (but note that this replaces other event listeners
// added using onselectstart, if any)
document.onselectstart = () => {
  console.log("Selection started.");
};
```

## See also

- `selectionchange`
