---
title: "SVGStopElement: offset property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgstopelement/offset/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGStopElement: offset property

The **`offset`** read-only property of the `SVGStopElement` interface reflects the `offset` attribute of the given `<stop>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `offset` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="yellow" stop-opacity="1" />
      <stop offset="100%" stop-color="red" stop-opacity="1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad1)" />
</svg>
```

```js
const stopElement = document.querySelector("stop");

// Access the offset property
console.log(stopElement.offset.baseVal); // Output: 0
```
