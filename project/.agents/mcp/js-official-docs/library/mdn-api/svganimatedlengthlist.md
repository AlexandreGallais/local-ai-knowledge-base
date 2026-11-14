---
title: "SVGAnimatedLengthList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedlengthlist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedLengthList

The **`SVGAnimatedLengthList`** interface is used for attributes of type `SVGLengthList` which can be animated.

## Instance properties

- `SVGAnimatedLengthList.baseVal` (read-only)
    An `SVGLengthList` that represents the base value of the given attribute before applying any animations.
- `SVGAnimatedLengthList.animVal` (read-only)
    A read only `SVGLengthList` that represents the current animated value of the given attribute. If the given attribute is not currently being animated, then the `SVGLengthList` will have the same contents as `baseVal`. The object referenced by `animVal` will always be distinct from the one referenced by `baseVal`, even when the attribute is not animated.

## Instance methods

_The `SVGAnimatedLengthList` interface does not provide any specific methods._
