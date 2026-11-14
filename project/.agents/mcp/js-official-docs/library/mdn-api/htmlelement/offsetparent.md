---
title: "HTMLElement: offsetParent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/offsetparent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: offsetParent property

The **`HTMLElement.offsetParent`** read-only property returns a
reference to the element which is the closest (nearest in the containment hierarchy)
positioned ancestor element.

A positioned ancestor might be:

- a containing block for absolutely-positioned elements
- an element with a different effective zoom value (that is, the product of all zoom scales of its parents) from this element
- `td`, `th`, `table` in case the element itself is static positioned.

If there is no positioned ancestor element, the `body` is returned.

> **Note:**
> `offsetParent` returns `null` in the following situations:
>
> - The element or any ancestor has the `display` property set to
>   `none`.
> - The element has the `position` property set to `fixed` and its containing block is the viewport.
>   If the containing block is not the viewport, `offsetParent` returns the nearest ancestor that forms
>   a containing block, for example, an ancestor with `transform`, `perspective`, or `filter` styles set.
> - The element is `<body>` or `<html>`.

`offsetParent` is useful because
`offsetTop` and
`offsetLeft` are relative to its padding edge.

## Value

An object reference to the element in which the current element is offset.
