---
title: "SVGFEOffsetElement: dx property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeoffsetelement/dx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEOffsetElement: dx property

The **`dx`** read-only property of the `SVGFEOffsetElement` interface reflects the `dx` attribute of the given `<feOffset>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `dx` attribute

In this example, we access the amount to offset, or horizontal shift, of the `<feOffset>` element, using the `dx` read-only property of the `SVGFEOffsetElement` interface.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="offsetFilter">
      <!-- Applies an offset to the SourceGraphic -->
      <feOffset in="SourceGraphic" dx="15" dy="10" />
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="lightblue"
    filter="url(#offsetFilter)" />
</svg>
```

```js
// Select the feOffset element
const offsetElement = document.querySelector("feOffset");

// Access the dx property
console.log(offsetElement.dx.baseVal); // Output: 15
```

## See also

- `SVGAnimatedNumber`
