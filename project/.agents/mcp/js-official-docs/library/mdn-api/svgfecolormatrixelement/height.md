---
title: "SVGFEColorMatrixElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfecolormatrixelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEColorMatrixElement: height property

The **`height`** read-only property of the `SVGFEColorMatrixElement` interface describes the vertical size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feColorMatrix>` element's `height` filter primitive attribute. The `<feColorMatrix>` filter applies a matrix transformation on the RGB color and alpha values.

The attribute is a `<length>` or a `<percentage>` relative to the height of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feColorMatrix = document.querySelector("feColorMatrix");
const verticalSize = feColorMatrix.height;
console.log(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGFEColorMatrixElement.width`
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
- CSS filter effects
- SVG `<filter>` element, SVG `filter` attribute in SVG
- Applying SVG effects to HTML content
