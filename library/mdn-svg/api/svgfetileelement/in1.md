---
title: "SVGFETileElement: in1 property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfetileelement/in1/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFETileElement: in1 property

The **`in1`** read-only property of the `SVGFETileElement` interface reflects the `in` attribute of the given `<feTile>` element.

## Value

An `SVGAnimatedString` object.

## Examples

### Accessing the `in` Property of `feTile` Element

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="tileFilter">
      <!-- Tiles the SourceGraphic -->
      <feTile in="SourceGraphic" />
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="hotpink"
    filter="url(#tileFilter)" />
</svg>
```

We can access the `in` attribute of the `feTile` element.

```js
// Select the feTile element
const tileElement = document.querySelector("feTile");

// Access the in1 property
console.log(tileElement.in1.baseVal); // Output: "SourceGraphic"
```

## See also

- `SVGAnimatedString`
