---
title: "SVGSVGElement: width property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgsvgelement/width/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: width property

The **`width`** read-only property of the `SVGSVGElement` interface describes the horizontal size of element as an `SVGAnimatedLength`. It reflects the `` element's `width` attribute, which may not be the SVG's rendered width.

The CSS `width` property takes precedence over the `` element's `width` attribute, so the value may not reflect the element's appearance. If both the `viewBox` and `width` attributes are omitted, the `width` property reflects that actual width.

## Value

An `SVGAnimatedLength`.

## Example

```js
const svg = document.querySelector("svg");
const inlineSize = svg.width;
console.dir(inlineSize.baseVal.value); // the `width` value
```

## See also

- `SVGSVGElement.viewBox`
- `SVGAnimatedLength.baseVal`
