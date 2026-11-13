---
title: "SVGAnimatedTransformList.baseVal Property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedtransformlist/baseval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedTransformList.baseVal Property

The **`baseVal`** read-only property of the `SVGAnimatedTransformList` interface represents the non-animated value of the `transform` attribute of an SVG element.

This property reflects the SVG element's `transform`, the `<linearGradient>` or `<radialGradient>` element's `gradientTransform` attribute, or the `<pattern>` element's `patternTransform` attribute value as a readonly `SVGTransformList`, providing access to a static `SVGTransform` for each transform function set on the SVG element.

## Value

An `SVGTransformList` object that represents the current, non-animated value of the `transform` attribute.

## Examples

```js
// Get the rectangle element
const rect = document.querySelector("rect");

// Access the non-animated transform list of the element
const baseTransforms = rect.transform.baseVal;

// Log the base transforms to the console
console.dir(baseTransforms);
```

## See also

- `SVGTransformList`
- `SVGTransform`
