---
title: "SVGAnimatedTransformList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedtransformlist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedTransformList

The **`SVGAnimatedTransformList`** interface represents attributes which take a list of numbers and which can be animated.

## Instance properties

- `baseVal` (read-only)
    The base value of the given attribute before applying any animations.
- `animVal` (read-only)
    The current animated value of the given attribute as read only `SVGTransformList`. If the given attribute is not currently being animated, then the `SVGTransformList` will have the same contents as `baseVal`. The object referenced by `animVal` will always be distinct from the one referenced by `baseVal`, even when the attribute is not animated.

## Instance methods

_The `SVGAnimatedTransformList` interface doesn't provide any specific methods._
