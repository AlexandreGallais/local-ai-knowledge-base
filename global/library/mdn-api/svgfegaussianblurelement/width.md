---
title: "SVGFEGaussianBlurElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfegaussianblurelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEGaussianBlurElement: width property

The **`width`** read-only property of the `SVGFEGaussianBlurElement` interface describes the horizontal size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `width` attribute of the `<feGaussianBlur>` element, which blurs an input image. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feGaussianBlur = document.querySelector("feGaussianBlur");
const horizontalSize = feGaussianBlur.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFEGaussianBlurElement.height`
- Applying effects with SVG filters
- CSS `blend-mode` data type
- CSS `blur()` function
- CSS filter effects module
- CSS `mix-blend-mode` property
