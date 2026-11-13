---
title: "SVGFEConvolveMatrixElement: width property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfeconvolvematrixelement/width/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEConvolveMatrixElement: width property

The **`width`** read-only property of the `SVGFEConvolveMatrixElement` interface describes the horizontal size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feConvolveMatrix>` element's `width` filter primitive attribute. The `<feConvolveMatrix>` filter applies a matrix convolution effect, combining pixels in the input image with neighboring pixels to produce a convolution effect such as blurring, edge detection, sharpening, embossing or beveling. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feConvolveMatrix = document.querySelector("feConvolveMatrix");
const horizontalSize = feConvolveMatrix.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFEConvolveMatrixElement.height`
- CSS filter effects module
- SVG `<filter>` element, SVG `filter` attribute in SVG
- Applying SVG effects to HTML content
