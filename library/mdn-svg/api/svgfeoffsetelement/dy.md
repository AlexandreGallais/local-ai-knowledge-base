---
title: "SVGFEOffsetElement: dy property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfeoffsetelement/dy/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEOffsetElement: dy property

The **`dy`** read-only property of the `SVGFEOffsetElement` interface reflects the `dy` attribute of the given `<feOffset>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `dy` attribute

In this example, we access the vertical offset, or shift, of the `<feOffset>` element, using the `dy` read-only property of the `SVGFEOffsetElement` interface.

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

// Access the dy property
console.log(offsetElement.dy.baseVal); // Output: 10
```

## See also

- `SVGAnimatedNumber`
