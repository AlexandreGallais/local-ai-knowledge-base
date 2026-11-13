---
title: "SVGAnimatedAngle"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedangle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
