---
title: "SVGPatternElement: patternUnits property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpatternelement/patternunits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPatternElement: patternUnits property

The **`patternUnits`** read-only property of the `SVGPatternElement` interface reflects the `patternUnits` attribute of the given `<pattern>` element. It specifies the coordinate system for the pattern content and takes one of the constants defined in `SVGUnitTypes`.

## Value

An `SVGAnimatedEnumeration` object.

## Example

Given the following SVG:

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="pattern1" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="5" r="5" fill="blue" />
    </pattern>
    <pattern
      id="pattern2"
      width="10"
      height="10"
      patternUnits="objectBoundingBox">
      <circle cx="5" cy="5" r="5" fill="red" />
    </pattern>
  </defs>
  <rect x="0" y="0" width="100" height="100" fill="url(#pattern1)" />
  <rect x="100" y="0" width="100" height="100" fill="url(#pattern2)" />
</svg>
```

We can access the `patternUnits` attribute:

```js
const patterns = document.querySelectorAll("pattern");

console.log(patterns[0].patternUnits.baseVal); // output: 1 (SVGUnitTypes.USERSPACEONUSE)
console.log(patterns[1].patternUnits.baseVal); // output: 2 (SVGUnitTypes.OBJECTBOUNDINGBOX)
```

## See also

- `SVGAnimatedEnumeration`
- `SVGUnitTypes`
