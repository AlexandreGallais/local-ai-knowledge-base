---
title: "SVGFECompositeElement: height property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfecompositeelement/height/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFECompositeElement: height property

The **`height`** read-only property of the `SVGFECompositeElement` interface describes the vertical size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feComposite>` element's `height` filter primitive attribute. The `<feComposite>` SVG filter primitive combines two input images using a Porter-Duff compositing operation. The attribute is a `<length>` or a `<percentage>` relative to the height of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feComposite = document.querySelector("feComposite");
const verticalSize = feComposite.height;
console.log(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGFECompositeElement.width`
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
