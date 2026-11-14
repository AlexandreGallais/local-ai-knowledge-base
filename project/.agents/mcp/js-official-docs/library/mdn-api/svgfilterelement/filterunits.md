---
title: "SVGFilterElement: filterUnits property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfilterelement/filterunits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFilterElement: filterUnits property

The **`filterUnits`** read-only property of the `SVGFilterElement` interface reflects the `filterUnits` attribute of the given `<filter>` element. It takes one of the `SVG_UNIT_TYPE_*` constants defined in `SVGUnitTypes`.

## Value

An `SVGAnimatedEnumeration`.

## Examples

### Accessing the `filterUnits` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <filter
      id="myFilter"
      filterUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="200%"
      height="200%">
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

// Access the filterUnits property
console.log(filterElement.filterUnits.baseVal); // Output: 1 (SVG_UNIT_TYPE_USERSPACEONUSE)
```

## See also

- `SVGFilterElement.primitiveUnits`
- `SVGUnitTypes`
- SVG filter primitive attributes
