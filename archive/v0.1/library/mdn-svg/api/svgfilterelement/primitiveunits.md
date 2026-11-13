---
title: "SVGFilterElement: primitiveUnits property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfilterelement/primitiveunits/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFilterElement: primitiveUnits property

The **`primitiveUnits`** read-only property of the `SVGFilterElement` interface reflects the `primitiveUnits` attribute of the given `<filter>` element. It takes one of the `SVG_UNIT_TYPE_*` constants defined in `SVGUnitTypes`.

## Value

An `SVGAnimatedEnumeration` object.

## Examples

### Accessing the `primitiveUnits` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <filter
      id="myFilter"
      primitiveUnits="userSpaceOnUse"
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

// Access the primitiveUnits property
console.log(filterElement.primitiveUnits.baseVal); // Output: 1 (SVG_UNIT_TYPE_USERSPACEONUSE)
```

## See also

- `SVGFilterElement.filterUnits`
