---
title: "SVGMPathElement: href property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgmpathelement/href/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGMPathElement: href property

The **`href`** read-only property of the `SVGMPathElement` interface reflects the `href` or `xlink:href` (deprecated) attribute of the given `<mpath>` element.

## Value

An `SVGAnimatedString` object.

## Examples

### Accessing the `href` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <path
    id="motionPath"
    d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
    fill="transparent"
    stroke="black" />

  <circle id="circle" cx="0" cy="0" r="5" fill="blue">
    <animateMotion dur="4s" repeatCount="indefinite">
      <mpath href="#motionPath"></mpath>
    </animateMotion>
  </circle>
</svg>
```

```js
const mpathElement = document.querySelector("mpath");

// Access the href property
console.log(mpathElement.href.baseVal); // Output: "#motionPath"
```
