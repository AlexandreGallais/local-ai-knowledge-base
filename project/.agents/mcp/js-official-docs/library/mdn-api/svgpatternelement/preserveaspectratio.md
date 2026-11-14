---
title: "SVGPatternElement: preserveAspectRatio property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpatternelement/preserveaspectratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPatternElement: preserveAspectRatio property

The **`preserveAspectRatio`** read-only property of the `SVGPatternElement` interface reflects the `preserveAspectRatio` attribute of the given element. It defines how the pattern's content should be scaled to fit the given space, preserving its aspect ratio.

## Value

An `SVGAnimatedPreserveAspectRatio` object.

## Example

Given the following SVG, we can use the `preserveAspectRatio` property to retrieve the scaling behavior for the pattern element:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <pattern
      id="pattern1"
      width="10"
      height="10"
      preserveAspectRatio="xMidYMid meet">
      <circle cx="5" cy="5" r="5" fill="blue" />
    </pattern>
  </defs>
  <rect x="0" y="0" width="100" height="100" fill="url(#pattern1)" />
</svg>
```

We can access the `preserveAspectRatio` attribute:

```js
const pattern = document.querySelector("pattern");

console.log(pattern.preserveAspectRatio.baseVal); // output: SVGPreserveAspectRatio {align: 1, meetOrSlice: 1}
```

## See also

- `preserveAspectRatio`
