---
title: "SVGFEImageElement: preserveAspectRatio property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfeimageelement/preserveaspectratio/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEImageElement: preserveAspectRatio property

The **`preserveAspectRatio`** read-only property of the `SVGFEImageElement` interface reflects the `preserveAspectRatio` attribute of the given `<feImage>` element.

## Value

An `SVGAnimatedPreserveAspectRatio` object.

## Example

### Accessing the `preserveAspectRatio` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <filter id="image-filter">
      <!-- feImage element with preserveAspectRatio attribute -->
      <feImage
        href="https://via.placeholder.com/150"
        x="0"
        y="0"
        width="150"
        height="150"
        preserveAspectRatio="xMidYMid meet" />
    </filter>
  </defs>

  <!-- Rectangle with the filter applied -->
  <rect
    x="50"
    y="50"
    width="200"
    height="100"
    fill="blue"
    filter="url(#image-filter)" />
</svg>
```

```js
// Select the feImage element
const feImageElement = document.querySelector("feImage");

// Access the preserveAspectRatio property
console.dir(feImageElement.preserveAspectRatio); // Output: SVGAnimatedPreserveAspectRatio object
```

## See also

- `preserveAspectRatio`
