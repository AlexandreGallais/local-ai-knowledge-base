---
title: "DOMRectReadOnly: fromRect() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domrectreadonly/fromrect_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMRectReadOnly: fromRect() static method

The **`fromRect()`** static method of the
`DOMRectReadOnly` object creates a new `DOMRectReadOnly`
object with a given location and dimensions.

## Syntax

```js
DOMRectReadOnly.fromRect()
DOMRectReadOnly.fromRect(rectangle)
```

### Parameters

- `rectangle` (optional)
    An object specifying the location and dimensions of a rectangle. All properties
    default to `0`. The properties are:
    - `x`: The coordinate of the left side of the rectangle.
    - `y`: The coordinate of the top side of the rectangle.
    - `width`: The width of the rectangle.
    - `height`: The height of the rectangle.

### Return value

An instance of `DOMRectReadOnly`.
