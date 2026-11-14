---
title: "Element: clientHeight property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/clientheight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: clientHeight property

The **`clientHeight`** read-only property of the `Element` interface is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner height of an element in pixels. It includes padding but excludes borders, margins, and horizontal scrollbars (if present).

`clientHeight` can be calculated as: CSS `height` + CSS `padding` - height of horizontal scrollbar (if present).

When `clientHeight` is used on the root element (the `<html>` element), (or on `<body>` if the document is in quirks mode), the viewport's height (excluding any scrollbar) is returned.

## Value

An integer.

## See also

- Determining the dimensions of elements
- `HTMLElement.offsetHeight`
- `Element.scrollHeight`
- `Element.clientWidth`
- `Element.clientLeft`
- `Element.clientTop`
- `Element.getBoundingClientRect()`
