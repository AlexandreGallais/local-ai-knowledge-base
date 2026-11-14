---
title: "SVGSVGElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgsvgelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
