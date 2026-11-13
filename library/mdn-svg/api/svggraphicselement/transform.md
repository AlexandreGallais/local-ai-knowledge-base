---
title: "SVGGraphicsElement: transform property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svggraphicselement/transform/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGGraphicsElement: transform property

The **`transform`** read-only property of the `SVGGraphicsElement` interface reflects the computed value of the transform property and its corresponding `transform` attribute of the given element.

## Value

An `SVGAnimatedTransformList` object.

## Examples

### Accessing the `transform` Property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <!-- Rectangle with a transformation applied -->
  <rect
    id="rect1"
    x="50"
    y="50"
    width="100"
    height="100"
    fill="blue"
    transform="translate(20, 30) rotate(45)" />
</svg>
```

```js
// Access the SVG element
const rect = document.getElementById("rect1");

// Get the transform list
const transformList = rect.transform.baseVal;

// Iterate through and log each transformation
for (let i = 0; i < transformList.numberOfItems; i++) {
  const transform = transformList.getItem(i);
  console.log(`Type: ${transform.type}, Matrix: ${transform.matrix}`);
}
// Example output:
// Type: 2 (SVG_TRANSFORM_TRANSLATE), Matrix: SVGMatrix { ... }
// Type: 4 (SVG_TRANSFORM_ROTATE), Matrix: SVGMatrix { ... }
```
