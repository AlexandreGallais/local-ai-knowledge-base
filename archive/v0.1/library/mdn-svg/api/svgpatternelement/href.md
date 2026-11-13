---
title: "SVGPatternElement: href property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgpatternelement/href/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGPatternElement: href property

The **`href`** read-only property of the `SVGPatternElement` interface reflects the `href` or `xlink:href` (deprecated) attribute of the given element.

## Value

An `SVGAnimatedString` object.

## Examples

The example demonstrates how the href attribute in the `<pattern>` element references another pattern (`#basePattern`) to apply its design to a rectangle.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- First pattern definition -->
    <pattern
      id="basePattern"
      width="20"
      height="20"
      patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="10" fill="blue" />
    </pattern>
    <!-- Second pattern referencing the first -->
    <pattern id="pattern1" href="#basePattern" />
  </defs>
  <rect x="50" y="50" width="100" height="100" fill="url(#pattern1)" />
</svg>
```
