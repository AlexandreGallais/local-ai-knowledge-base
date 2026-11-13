---
title: "SVGAnimatedRect"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedrect/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedRect

The **`SVGAnimatedRect`** interface represents an `SVGRect` attribute that can be animated.

## Instance properties

- `baseVal` (read-only)
    The base value of the given attribute before applying any animations.
- `animVal` (read-only)
    The current animated value of the given attribute as a read-only `SVGRect`. If the given attribute is not currently being animated, then the `SVGRect` will have the same contents as `baseVal`. The object referenced by `animVal` will always be distinct from the one referenced by `baseVal`, even when the attribute is not animated.

## Instance methods

_The `SVGAnimatedRect` interface does not provide any specific methods._
