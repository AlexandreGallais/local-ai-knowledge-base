---
title: "DOMRectReadOnly: DOMRectReadOnly() constructor"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/domrectreadonly/domrectreadonly/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMRectReadOnly: DOMRectReadOnly() constructor

The **`DOMRectReadOnly()`** constructor creates a new `DOMRectReadOnly` object.

## Syntax

```js
new DOMRectReadOnly(x, y, width, height)
```

### Parameters

- `x`
    The `x` coordinate of the `DOMRectReadOnly`'s
    origin.
- `y`
    The `y` coordinate of the `DOMRectReadOnly`'s
    origin.
- `width`
    The width of the `DOMRectReadOnly`.
- `height`
    The height of the `DOMRectReadOnly`.

## Examples

To create a new `DOMRectReadOnly`, you could run a line of code like so:

```js
const myDOMRect = new DOMRectReadOnly(0, 0, 100, 100);
// running 'myDOMRect' in the console would then return
// DOMRectReadOnly { x: 0, y: 0, width: 100, height: 100, top: 0, right: 100, bottom: 100, left: 0 }
```

## See also

- `DOMPoint`
- `DOMRect`
