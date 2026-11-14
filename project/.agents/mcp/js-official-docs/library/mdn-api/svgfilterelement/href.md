---
title: "SVGFilterElement: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfilterelement/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFilterElement: href property

The **`href`** read-only property of the `SVGFilterElement` interface reflects the `href` or `xlink:href` (deprecated) attribute of the given `<filter>` element.

## Value

An `SVGAnimatedString`.

## Examples

### Accessing the `href` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <filter id="myFilter" x="0" y="0" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blurred" />
    </filter>
  </defs>
  <rect
    width="200"
    height="200"
    stroke="green"
    stroke-width="10"
    fill="lime"
    filter="url(#myFilter)" />
</svg>
```

```js
const filterElement = document.querySelector("filter");

// Access the href property
console.log(filterElement.href.baseVal); // Output: "#myFilter"
```

## See also

- SVG `href` attribute
