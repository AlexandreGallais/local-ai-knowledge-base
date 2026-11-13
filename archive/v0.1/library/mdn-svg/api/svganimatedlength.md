---
title: "SVGAnimatedLength"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedlength/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
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
