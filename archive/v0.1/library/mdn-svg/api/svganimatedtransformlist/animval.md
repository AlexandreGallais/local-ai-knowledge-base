---
title: "SVGAnimatedTransformList.animVal Property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedtransformlist/animval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedTransformList.animVal Property

The **`animVal`** read-only property of the `SVGAnimatedTransformList` interface represents the animated value of the `transform` attribute of an SVG element.

This property reflects the SVG element's `transform`, the `<linearGradient>` or `<radialGradient>` element's `gradientTransform` attribute, or the `<pattern>` element's `patternTransform` attribute as a readonly `SVGTransformList`, providing access to the dynamically updated `SVGTransform` for each transform function during an animation. If no animation is active, this property will return the same value as `baseVal`.

## Value

An `SVGTransformList` object that reflects the current animated value of the `transform` attribute.

## Examples

```js
// Get the rectangle element
const rect = document.querySelector("rect");

// Access the animated transform list (if any)
const animTransforms = rect.transform.animVal;

// Log the animated transforms to the console
console.dir(animTransforms);
```

## See also

- `SVGTransformList`
- `SVGTransform`
