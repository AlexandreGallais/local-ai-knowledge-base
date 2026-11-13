---
title: "SVGPatternElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpatternelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPatternElement: width property

The **`width`** read-only property of the `SVGPatternElement` interface describes the width of the pattern as an `SVGAnimatedLength`. It reflects the computed value of the `width` attribute on the `<pattern>` element.

The attribute value can be a `<length>`, `<percentage>`, or `<number>`. The numeric value of the `SVGAnimatedLength.baseVal` represents the width of the pattern in the user coordinate system.

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
      x="50"
      height="20"
      width="20"
      patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="10" fill="blue" />
    </pattern>
    <!-- Second pattern -->
    <pattern
      id="pattern2"
      x="100"
      height="40"
      width="40"
      patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="10" fill="red" />
    </pattern>
  </defs>
  <!-- Using the patterns -->
  <rect x="0" y="0" width="100" height="100" fill="url(#pattern1)" />
  <rect x="100" y="0" width="100" height="100" fill="url(#pattern2)" />
</svg>
```

We can access the computed values of the `x` attributes:

```js
const patterns = document.querySelectorAll("pattern");

console.log(patterns[0].width.baseVal.value); // output: 20
console.log(patterns[1].width.baseVal.value); // output: 40
```

## See also

- `SVGPatternElement.height`
- `SVGAnimatedLength.baseVal`
