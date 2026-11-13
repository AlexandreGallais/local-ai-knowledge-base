---
title: "DOMRectReadOnly"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/domrectreadonly/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMRectReadOnly

The **`DOMRectReadOnly`** interface specifies the standard properties (also used by `DOMRect`) to define a rectangle whose properties are immutable.

## Constructor

- `DOMRectReadOnly()`
    Defined to create a new `DOMRectReadOnly` object.

## Instance properties

- `DOMRectReadOnly.x` (read-only)
    Returns the x coordinate of the `DOMRectReadOnly`'s origin.
- `DOMRectReadOnly.y` (read-only)
    Returns the y coordinate of the `DOMRectReadOnly`'s origin.
- `DOMRectReadOnly.width` (read-only)
    Returns the width of the `DOMRectReadOnly`.
- `DOMRectReadOnly.height` (read-only)
    Returns the height of the `DOMRectReadOnly`.
- `DOMRectReadOnly.top` (read-only)
    Returns the top coordinate value of the `DOMRectReadOnly` (usually the same as `y`).
- `DOMRectReadOnly.right` (read-only)
    Returns the right coordinate value of the `DOMRectReadOnly` (usually the same as `x + width`).
- `DOMRectReadOnly.bottom` (read-only)
    Returns the bottom coordinate value of the `DOMRectReadOnly` (usually the same as `y + height`).
- `DOMRectReadOnly.left` (read-only)
    Returns the left coordinate value of the `DOMRectReadOnly` (usually the same as `x`).

## Static methods

- `DOMRectReadOnly.fromRect()`
    Creates a new `DOMRectReadOnly` object with a given location and dimensions.

## Instance methods

- `DOMRectReadOnly.toJSON()`
    Returns a JSON-serializable plain object representing the `DOMRectReadOnly` object. Automatically called by `JSON.stringify()`.

## See also

- `DOMPoint`
