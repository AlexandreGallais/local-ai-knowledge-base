---
title: "SVGFEColorMatrixElement: y property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfecolormatrixelement/y/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEColorMatrixElement: y property

The **`y`** read-only property of the `SVGFEColorMatrixElement` interface describes the vertical coordinate of the position of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feColorMatrix>` element's `y` filter primitive attribute value. The `<feColorMatrix>` filter applies a matrix transformation on the RGB color and alpha values. The attribute is a `<length>` or `<percentage>`. The `<coordinate>` is a length in the user coordinate system that is the given distance from the origin of the filter along the y-axis. If the `y` attribute is a percent value, the property value is a relative to the height of the filter region in user coordinate system units. The default value is `0`.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feColorMatrix = document.querySelector("feColorMatrix");
const topPosition = feColorMatrix.y;
console.log(topPosition.baseVal.value); // the `y` value
```

## See also

- `SVGFEColorMatrixElement.x`
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
- CSS filter effects
- SVG `<filter>` element, SVG `filter` attribute in SVG
- Applying SVG effects to HTML content
