---
title: "SVGRect"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGRect

The **`SVGRect`**, an alias for `DOMRect`, represents a rectangle. Rectangles consist of an `x` and `y` coordinate pair identifying a minimum `x` value, a minimum `y` value, and a `width` and `height`, which are constrained to be non-negative.

An `SVGRect` object can be designated as read only, which means that attempts to modify the object will result in an exception being thrown.

## Instance properties

- `SVGRect.x`
    The exact effect of this coordinate depends on each element. If the attribute is not specified, the effect is as if a value of `0` were specified.
- `SVGRect.y`
    The exact effect of this coordinate depends on each element. If the attribute is not specified, the effect is as if a value of `0` were specified.
- `SVGRect.width`
    This represents the width of the rectangle. A value that is negative results to an error. A value of `0` disables rendering of the element
- `SVGRect.height`
    This represents the height of the rectangle. A value that is negative results to an error. A value of `0` disables rendering of the element.

## Instance methods

None.

## See also

- `DOMRect`
- `DOMPoint` alias `SVGPoint`
- `DOMMatrix` alias `SVGMatrix`
