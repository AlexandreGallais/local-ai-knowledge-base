---
title: "HTMLElement: offsetWidth property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/offsetwidth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: offsetWidth property

The **`offsetWidth`** read-only property of the `HTMLElement` interface returns the layout width of an element as an integer.

Typically, `offsetWidth` is a measurement in pixels of the element's CSS width, including any borders, padding, and vertical scrollbars (if rendered). It does not include the width of pseudo-elements such as `::before` or `::after`.

If the element is hidden (for example, by setting `style.display` on the element or one of its ancestors to `"none"`), then `0` is returned.

## Value

An integer.

## See also

- Determining the dimensions of elements
- `Element.clientWidth`
- `Element.scrollWidth`
- `HTMLElement.offsetHeight`
- `HTMLElement.offsetLeft`
- `HTMLElement.offsetTop`
- `Element.getBoundingClientRect()`
