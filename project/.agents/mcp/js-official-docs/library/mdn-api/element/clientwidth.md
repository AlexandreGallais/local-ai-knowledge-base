---
title: "Element: clientWidth property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/clientwidth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: clientWidth property

The **`clientWidth`** read-only property of the `Element` interface is zero for inline elements and elements with no CSS; otherwise, it's the inner width of an element in pixels. It includes padding but excludes borders, margins, and vertical scrollbars (if present).

When `clientWidth` is used on the root element (the `<html>` element), (or on `<body>` if the document is in quirks mode), the viewport's width (excluding any scrollbar) is returned.

## Value

An integer.

## See also

- Determining the dimensions of elements
- `HTMLElement.offsetWidth`
- `Element.scrollWidth`
- `Element.clientHeight`
- `Element.clientLeft`
- `Element.clientTop`
- `Element.getBoundingClientRect()`
