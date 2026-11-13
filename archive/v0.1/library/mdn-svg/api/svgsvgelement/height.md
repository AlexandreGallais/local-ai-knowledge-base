---
title: "SVGSVGElement: height property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgsvgelement/height/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: height property

The **`height`** read-only property of the `SVGSVGElement` interface describes the vertical size of element as an `SVGAnimatedLength`. It reflects the `` element's `height` attribute, which may not be the SVG's rendered height.

The CSS `height` property takes precedence over the `` element's `height` attribute, so the value may not reflect the element's appearance. If both the `viewBox` and `height` attributes are omitted, the `height` property reflects that actual height.

## Value

An `SVGAnimatedLength`.

## Example

```js
const svg = document.querySelector("svg");
const verticalSize = svg.height;
console.dir(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGSVGElement.viewBox`
- `SVGSVGElement.width`
- `SVGAnimatedLength.baseVal`
