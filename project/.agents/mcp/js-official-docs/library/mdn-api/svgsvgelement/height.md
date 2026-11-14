---
title: "SVGSVGElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgsvgelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
