---
title: "SVGNumber: value property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgnumber/value/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGNumber: value property

The **`value`** property of the `SVGNumber` interface represents the number.

## Value

A float.

## Examples

### Accessing the `value` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <circle id="myCircle" cx="100" cy="100" r="50" fill="blue" />
</svg>
```

```js
const circleElement = document.getElementById("myCircle");

// Access the radius (r) value property
const radiusValue = circleElement.r.baseVal.value;

console.log(radiusValue); // Output: 50
```
