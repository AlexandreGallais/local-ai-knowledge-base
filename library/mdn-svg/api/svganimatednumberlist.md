---
title: "SVGAnimatedNumberList"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatednumberlist/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedNumberList

The **`SVGAnimatedNumberList`** interface represents a list of attributes of type \<number> which can be animated.

## Instance properties

- `SVGAnimatedNumberList.baseVal` (read-only)
    An `SVGNumberList` that represents the base value of the given attribute before applying any animations.
- `SVGAnimatedNumberList.animVal` (read-only)
    A read only `SVGNumberList` that represents the current animated value of the given attribute. If the given attribute is not currently being animated, then the `SVGNumberList` will have the same contents as `baseVal`. The object referenced by `animVal` will always be distinct from the one referenced by `baseVal`, even when the attribute is not animated.

## Instance methods

The `SVGAnimatedNumberList` interface do not provide any specific methods.
