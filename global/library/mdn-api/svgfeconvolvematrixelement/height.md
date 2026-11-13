---
title: "SVGFEConvolveMatrixElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeconvolvematrixelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEConvolveMatrixElement: height property

The **`height`** read-only property of the `SVGFEConvolveMatrixElement` interface describes the vertical size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feConvolveMatrix>` element's `height` filter primitive attribute. The `<feConvolveMatrix>` filter applies a matrix convolution effect, combining pixels in the input image with neighboring pixels to produce a convolution effect such as blurring, edge detection, sharpening, embossing or beveling. The attribute is a `<length>` or a `<percentage>` relative to the height of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feConvolveMatrix = document.querySelector("feConvolveMatrix");
const verticalSize = feConvolveMatrix.height;
console.log(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGFEConvolveMatrixElement.width`
- CSS filter effects module
- SVG `<filter>` element, SVG `filter` attribute in SVG
- Applying SVG effects to HTML content
