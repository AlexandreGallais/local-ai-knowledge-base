---
title: "SVGFETurbulenceElement: height property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfeturbulenceelement/height/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFETurbulenceElement: height property

The **`height`** read-only property of the `SVGFETurbulenceElement` interface describes the vertical size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `height` attribute of the `<feTurbulence>` element, which allows the synthesis of artificial textures. The attribute is a `<length>` or a `<percentage>` relative to the height of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feTurbulence = document.querySelector("feTurbulence");
const verticalSize = feTurbulence.height;
console.log(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGFETurbulenceElement.width`
