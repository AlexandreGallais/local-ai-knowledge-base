---
title: "DOMRect"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMRect

A **`DOMRect`** describes the size and position of a rectangle.

The type of box represented by the `DOMRect` is specified by the method or property that returned it. For example, `Range.getBoundingClientRect()` specifies the rectangle that bounds the content of the range using such objects.

It inherits from its parent, `DOMRectReadOnly`.

## Constructor

- `DOMRect()`
    Creates a new `DOMRect` object.

## Instance properties

_`DOMRect` inherits properties from its parent, `DOMRectReadOnly`. The difference is that they are not read-only anymore._

- `DOMRect.x`
    The x coordinate of the `DOMRect`'s origin (typically the top-left corner of the rectangle).
- `DOMRect.y`
    The y coordinate of the `DOMRect`'s origin (typically the top-left corner of the rectangle).
- `DOMRect.width`
    The width of the `DOMRect`.
- `DOMRect.height`
    The height of the `DOMRect`.
- `DOMRectReadOnly.top` (read-only)
    Returns the top coordinate value of the `DOMRect` (has the same value as `y`, or `y + height` if `height` is negative).
- `DOMRectReadOnly.right` (read-only)
    Returns the right coordinate value of the `DOMRect` (has the same value as `x + width`, or `x` if `width` is negative).
- `DOMRectReadOnly.bottom` (read-only)
    Returns the bottom coordinate value of the `DOMRect` (has the same value as `y + height`, or `y` if `height` is negative).
- `DOMRectReadOnly.left` (read-only)
    Returns the left coordinate value of the `DOMRect` (has the same value as `x`, or `x + width` if `width` is negative).

## Static methods

_`DOMRect` may also inherit static methods from its parent, `DOMRectReadOnly`._

- `DOMRect.fromRect()`
    Creates a new `DOMRect` object with a given location and dimensions.

## Instance methods

_`DOMRect` may inherit methods from its parent, `DOMRectReadOnly`._

## See also

- `DOMPoint`
