---
title: "SVGAnimatedPreserveAspectRatio"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedpreserveaspectratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedPreserveAspectRatio

The **`SVGAnimatedPreserveAspectRatio`** interface represents attributes of type `SVGPreserveAspectRatio` which can be animated.

## Instance properties

- `baseVal` (read-only)
    An `SVGPreserveAspectRatio` that represents the base value of the given attribute before applying any animations.
- `animVal` (read-only)
    An `SVGPreserveAspectRatio` that represents the current animated value of the given attribute. If the given attribute is not currently being animated, then the `SVGPreserveAspectRatio` will have the same contents as `baseVal`. The object referenced by `animVal` is always distinct from the one referenced by `baseVal`, even when the attribute is not animated.

## Instance methods

The `SVGAnimatedPreserveAspectRatio` interface do not provide any specific methods.
