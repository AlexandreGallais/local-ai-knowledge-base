---
title: "SVGAnimatedAngle"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedangle/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedAngle

The **`SVGAnimatedAngle`** interface is used for attributes of basic type \<angle> which can be animated.

## Instance properties

- `SVGAnimatedAngle.baseVal` (read-only)
    An `SVGAngle` representing the base value of the given attribute before applying any animations.
- `SVGAnimatedAngle.animVal` (read-only)
    A read only `SVGAngle` representing the current animated value of the given attribute. If the given attribute is not currently being animated, then the `SVGAngle` will have the same contents as `baseVal`. The object referenced by `animVal` will always be distinct from the one referenced by `baseVal`, even when the attribute is not animated.

## Instance methods

_The `SVGAnimatedAngle` interface does not provide any specific methods._
