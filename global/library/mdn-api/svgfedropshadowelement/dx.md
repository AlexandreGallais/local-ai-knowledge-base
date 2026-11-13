---
title: "SVGFEDropShadowElement: dx property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfedropshadowelement/dx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEDropShadowElement: dx property

The **`dx`** read-only property of the `SVGFEDropShadowElement` interface reflects the `dx` attribute of the given `<feDropShadow>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `dx` value

In this example, we retrieve the horizontal shift of the `<feDropShadow>` by using the `dx` read-only property of the `SVGFEDropShadowElement` interface.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="drop-shadow-filter">
      <!-- Drop Shadow with dx property set to 10 -->
      <feDropShadow
        in="SourceGraphic"
        dx="10"
        dy="10"
        stdDeviation="5"
        flood-color="red" />
    </filter>
  </defs>

  <!-- Rectangle with a red shadow -->
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="red"
    filter="url(#drop-shadow-filter)" />

  <!-- Circle with a red shadow -->
  <circle
    cx="100"
    cy="100"
    r="50"
    fill="blue"
    filter="url(#drop-shadow-filter)" />
</svg>
```

```js
const dropShadow = document.querySelector("feDropShadow");

console.log(dropShadow.dx.baseVal); // Output: 10
```

## See also

- `SVGAnimatedNumber`
