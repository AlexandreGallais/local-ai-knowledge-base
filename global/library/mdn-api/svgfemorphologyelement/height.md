---
title: "SVGFEMorphologyElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfemorphologyelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEMorphologyElement: height property

The **`height`** read-only property of the `SVGFEMorphologyElement` interface describes the vertical size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `height` attribute of the `<feMorphology>` element. The attribute is a `<length>` or a `<percentage>` relative to the height of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feMorphology = document.querySelector("feMorphology");
const verticalSize = feMorphology.height;
console.log(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGFEMorphologyElement.width`
