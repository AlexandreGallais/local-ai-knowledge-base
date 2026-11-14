---
title: "SVGFEDropShadowElement: in1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfedropshadowelement/in1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEDropShadowElement: in1 property

The **`in1`** read-only property of the `SVGFEDropShadowElement` interface reflects the `in` attribute of the given `<feDropShadow>` element.

## Value

An `SVGAnimatedString` object.

## Examples

In this example, two `<feDropShadow>` elements are defined in a filter, each with a different `in` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="drop-shadow-filter">
      <!-- First Drop Shadow applied to the SourceGraphic -->
      <feDropShadow
        in="SourceGraphic"
        dx="10"
        dy="10"
        stdDeviation="5"
        flood-color="red" />
      <!-- Second Drop Shadow applied to the BackgroundImage -->
      <feDropShadow
        in="BackgroundImage"
        dx="-10"
        dy="-10"
        stdDeviation="5"
        flood-color="blue" />
    </filter>
  </defs>
  <!-- Rectangle with red shadow -->
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="red"
    filter="url(#drop-shadow-filter)" />
  <!-- Circle with blue shadow -->
  <circle
    cx="100"
    cy="100"
    r="50"
    fill="blue"
    filter="url(#drop-shadow-filter)" />
</svg>
```

We can access the `in` attribute:

```js
const dropShadows = document.querySelectorAll("feDropShadow");

console.log(dropShadows[0].in1.baseVal); // Output: "SourceGraphic"
console.log(dropShadows[1].in1.baseVal); // Output: "BackgroundImage"
```

## See also

- `SVGAnimatedString`
