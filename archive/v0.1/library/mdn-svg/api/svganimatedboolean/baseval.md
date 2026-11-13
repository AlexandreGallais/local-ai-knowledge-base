---
title: "SVGAnimatedBoolean: baseVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedboolean/baseval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedBoolean: baseVal property

The **`baseVal`** property of the `SVGAnimatedBoolean` interface is the value of the associated animatable boolean SVG attribute in its base (none-animated) state. It reflects the value of the associated animatable boolean attribute when no animations are applied.

Some boolean SVG attributes, such as `preserveAlpha`, are animatable. In such cases, `SVGAnimatedBoolean.baseVal` property is `false` when the attribute is set to `false`, is omitted and defaults to `false`, or is inheritable and inherits `false`. Otherwise, the value is `true`.

## Value

A boolean; the base value of the reflected attribute.

## See also

- `SVGElement`
- `SVGAnimationElement`
