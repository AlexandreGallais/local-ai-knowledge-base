---
title: "SVGPatternElement: y property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgpatternelement/y/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGPatternElement: y property

The **`y`** read-only property of the `SVGPatternElement` interface describes the y-axis coordinate of the start point of the pattern as an `SVGAnimatedLength`. It reflects the computed value of the `y` attribute on the `<pattern>` element.

The attribute value can be a `<length>`, `<percentage>`, or `<number>`. The numeric value of the `SVGAnimatedLength.baseVal` is the y-coordinate of the pattern's starting point in the user coordinate system.

## Value

An `SVGAnimatedLength`.

## Example

Given the following SVG:

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- First pattern -->
    <pattern
      id="pattern1"
      y="50"
      width="20"
      height="20"
      patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="10" fill="blue" />
    </pattern>
    <!-- Second pattern -->
    <pattern
      id="pattern2"
      y="100"
      width="20"
      height="20"
      patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="10" fill="red" />
    </pattern>
  </defs>
  <!-- Using the patterns -->
  <rect x="0" y="0" width="100" height="100" fill="url(#pattern1)" />
  <rect x="100" y="0" width="100" height="100" fill="url(#pattern2)" />
</svg>
```

We can access the computed values of the `y` attributes:

```js
const patterns = document.querySelectorAll("pattern");

console.log(patterns[0].y.baseVal.value); // output: 50
console.log(patterns[1].y.baseVal.value); // output: 100
```

## See also

- `SVGPatternElement.x`
- `SVGAnimatedLength.baseVal`
