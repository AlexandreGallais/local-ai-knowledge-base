---
title: "HTMLElement: draggable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/draggable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: draggable property

The **`draggable`** property of the `HTMLElement` interface gets and sets a `Boolean` primitive indicating if the element is draggable.

It reflects the value of the `draggable` HTML global attribute.

## Value

A `Boolean` primitive that is `true` if the element is draggable, `false` otherwise.

## Examples

The following example shows how to enable or disable the element's ability to drag via script:

```js
const draggableElement = document.querySelector(".draggable-element");
const notDraggableElement = document.querySelector(".not-draggable-element");

// enable the target element's ability to drag
draggableElement.draggable = true;

// disable the target element's ability to drag
notDraggableElement.draggable = false;
```

## See also

- `draggable` HTML global attribute
- HTML Drag and Drop API overview
