---
title: "DOMPoint: DOMPoint() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dompoint/dompoint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMPoint: DOMPoint() constructor

The **`DOMPoint()`** constructor
creates and returns a new `DOMPoint` object, given the values for some or
all of its properties.

You can also create a `DOMPoint` by calling the
`DOMPoint.fromPoint()` static function. That function accepts any object with the required parameters, including a `DOMPoint` or
`DOMPointReadOnly`.

## Syntax

```js
new DOMPoint()
new DOMPoint(x)
new DOMPoint(x, y)
new DOMPoint(x, y, z)
new DOMPoint(x, y, z, w)
```

### Parameters

- `x` (optional)
    The `x` coordinate for the new `DOMPoint`.
- `y` (optional)
    The `y` coordinate for the new `DOMPoint`.
- `z` (optional)
    The `z` coordinate for the new `DOMPoint`.
- `w` (optional)
    The perspective value of the new `DOMPoint`.

## Examples

This example creates a `DOMPoint` representing the top-left corner of the
current window, then creates a second point based on the first, which is then offset by
100 pixels both vertically and horizontally.

```js
const windTopLeft = new DOMPoint(window.screenX, window.screenY);
const newTopLeft = DOMPoint.fromPoint(windTopLeft);
newTopLeft.x += 100;
newTopLeft.y += 100;
```

## See also

- `DOMPointReadOnly()`
- `DOMRect`
- `DOMMatrix`
