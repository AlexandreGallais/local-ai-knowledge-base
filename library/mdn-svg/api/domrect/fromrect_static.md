---
title: "DOMRect: fromRect() static method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/domrect/fromrect_static/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMRect: fromRect() static method

The **`fromRect()`** static method of the
`DOMRect` object creates a new `DOMRect`
object with a given location and dimensions.

## Syntax

```js
DOMRect.fromRect()
DOMRect.fromRect(rectangle)
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

An instance of `DOMRect`.
