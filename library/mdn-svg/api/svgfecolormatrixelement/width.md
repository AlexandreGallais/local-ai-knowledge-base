---
title: "SVGFEColorMatrixElement: width property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfecolormatrixelement/width/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEColorMatrixElement: width property

The **`width`** read-only property of the `SVGFEColorMatrixElement` interface describes the horizontal size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feColorMatrix>` element's `width` filter primitive attribute. The `<feColorMatrix>` filter applies a matrix transformation on the RGB color and alpha values. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feColorMatrix = document.querySelector("feColorMatrix");
const horizontalSize = feColorMatrix.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFEColorMatrixElement.height`
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
- CSS filter effects
- SVG `<filter>` element, SVG `filter` attribute in SVG
- Applying SVG effects to HTML content
