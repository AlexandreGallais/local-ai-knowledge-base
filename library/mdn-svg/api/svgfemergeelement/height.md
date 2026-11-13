---
title: "SVGFEMergeElement: height property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfemergeelement/height/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEMergeElement: height property

The **`height`** read-only property of the `SVGFEMergeElement` interface describes the vertical size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `height` attribute of the `<feMerge>` element. The attribute is a `<length>` or a `<percentage>` relative to the height of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feMerge = document.querySelector("feMerge");
const verticalSize = feMerge.height;
console.log(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGFEMergeElement.width`
