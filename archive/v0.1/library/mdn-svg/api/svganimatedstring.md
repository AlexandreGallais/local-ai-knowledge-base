---
title: "SVGAnimatedString"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedstring/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedString

The **`SVGAnimatedString`** interface represents string attributes which can be animated from each SVG declaration. You need to create SVG attribute before doing anything else, everything should be declared inside this.

## Instance properties

- `SVGAnimatedString.animVal` (read-only)
    A string representing the animated value of the reflected attribute value.
    If the given attribute is not currently being animated, it contains the same value as `baseVal`.
- `SVGAnimatedString.baseVal`
    A string representing the base value of the reflected attribute before applying any animations.

## Instance methods

_The `SVGAnimatedString` interface do not provide any specific methods._

## See also

- `SVGScriptElement.href`, an object of this type.
