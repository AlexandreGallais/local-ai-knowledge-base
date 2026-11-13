---
title: "SVGFEBlendElement: in1 property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfeblendelement/in1/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEBlendElement: in1 property

The **`in1`** read-only property of the `SVGFEBlendElement` interface reflects the `in` attribute of the given element.

## Value

An `SVGAnimatedString` object.

## Examples

In this example, two `<feBlend>` elements are defined in a filter, each with a different `in` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="blend-filter">
    <feBlend in="SourceGraphic" operator="over" />
    <feBlend in="BackgroundImage" operator="in" />
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

We can access the `in` attribute:

```js
const feBlends = document.querySelectorAll("feBlend");

console.log(feBlends[0].in1.baseVal); // Output: "SourceGraphic"
console.log(feBlends[1].in1.baseVal); // Output: "BackgroundImage"
```

## See also

- `SVGAnimatedString`
