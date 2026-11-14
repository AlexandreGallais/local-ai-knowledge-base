---
title: "SVGAnimatedBoolean: animVal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedboolean/animval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedBoolean: animVal property

The **`animVal`** read-only property of the `SVGAnimatedBoolean` interface represents the current animated value of the associated animatable boolean SVG attribute. If the attribute is not animated, `animVal` is the same as `SVGAnimatedBoolean.baseVal`.

Some boolean SVG attributes, such as `preserveAlpha`, are animatable. In such cases, `SVGAnimatedBoolean.animVal` property is `true` when the attribute value resolves to true. Otherwise, the value is `false`.

## Value

A boolean; the value of the animatable boolean attribute.

## See also

- `SVGElement`
- `SVGAnimationElement`
