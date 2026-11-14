---
title: "SVGFEBlendElement: in2 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeblendelement/in2/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEBlendElement: in2 property

The **`in2`** read-only property of the `SVGFEBlendElement` interface reflects the `in2` attribute of the given element.

## Value

An `SVGAnimatedString` object.

## Examples

In this example, two `<feBlend>` elements are defined in a filter, each with a different `in2` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="blend-filter">
    <feBlend in="SourceGraphic" in2="SourceAlpha" operator="over" />
    <feBlend in="SourceGraphic" in2="BackgroundImage" operator="in" />
  </filter>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="red"
    filter="url(#blend-filter)" />
  <circle cx="100" cy="100" r="50" fill="blue" filter="url(#blend-filter)" />
</svg>
```

We can access the `in2` attribute:

```js
const feBlends = document.querySelectorAll("feBlend");

console.log(feBlends[0].in2.baseVal); // Output: "SourceAlpha"
console.log(feBlends[1].in2.baseVal); // Output: "BackgroundImage"
```

## See also

- `SVGAnimatedString`
