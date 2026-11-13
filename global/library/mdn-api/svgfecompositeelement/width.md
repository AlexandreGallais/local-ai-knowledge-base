---
title: "SVGFECompositeElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfecompositeelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFECompositeElement: width property

The **`width`** read-only property of the `SVGFECompositeElement` interface describes the horizontal size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feComposite>` element's `width` filter primitive attribute. The `<feComposite>` SVG filter primitive combines two input images using a Porter-Duff compositing operation. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feComposite = document.querySelector("feComposite");
const horizontalSize = feComposite.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFECompositeElement.height`
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
