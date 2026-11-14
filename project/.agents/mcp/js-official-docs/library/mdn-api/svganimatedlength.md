---
title: "SVGAnimatedLength"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedLength

The **`SVGAnimatedLength`** interface represents attributes of type \<length> which can be animated.

## Instance properties

- `baseVal` (read-only)
    An `SVGLength` representing the base value of the given attribute before applying any animations.
- `animVal` (read-only)
    If the given attribute or property is being animated,
    an `SVGLength` containing the current animated value of the attribute or property.
    If the given attribute or property is not currently being animated,
    an `SVGLength` containing the same value as `baseVal`.

## Instance methods

_This interface does not implement any specific methods._

## See also

- `SVGLength`
