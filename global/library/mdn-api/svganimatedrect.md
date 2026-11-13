---
title: "SVGAnimatedRect"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
