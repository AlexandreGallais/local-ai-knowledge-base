---
title: "SVGFEConvolveMatrixElement: y property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeconvolvematrixelement/y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEConvolveMatrixElement: y property

The **`y`** read-only property of the `SVGFEConvolveMatrixElement` interface describes the vertical coordinate of the position of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feConvolveMatrix>` element's `y` filter primitive attribute value. The `<feConvolveMatrix>` filter applies a matrix convolution effect, combining pixels in the input image with neighboring pixels to produce a convolution effect such as blurring, edge detection, sharpening, embossing or beveling.

The attribute is a `<length>` or `<percentage>`. The `<coordinate>` is a length in the user coordinate system that is the given distance from the origin of the filter along the y-axis. If the `y` attribute is a percent value, the property value is a relative to the height of the filter region in user coordinate system units. The default value is `0`.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feConvolveMatrix = document.querySelector("feConvolveMatrix");
const topPosition = feConvolveMatrix.y;
console.log(topPosition.baseVal.value); // the `y` value
```

## See also

- `SVGFEConvolveMatrixElement.x`
- CSS filter effects module
- SVG `<filter>` element, SVG `filter` attribute in SVG
- Applying SVG effects to HTML content
