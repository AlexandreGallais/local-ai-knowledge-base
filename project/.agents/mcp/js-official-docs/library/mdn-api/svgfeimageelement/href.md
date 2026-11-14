---
title: "SVGFEImageElement: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeimageelement/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEImageElement: href property

The **`href`** read-only property of the `SVGFEImageElement` interface reflects the `href` or `xlink:href` (deprecated) attribute of the given `<feImage>` element.

## Value

An `SVGAnimatedString` object.

## Examples

### Accessing the `href` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <filter id="image-filter">
      <!-- feImage element referencing an external image -->
      <feImage
        href="https://via.placeholder.com/150"
        x="0"
        y="0"
        width="150"
        height="150" />
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

// Access the href property
console.log(feImageElement.href.baseVal); // Output: "https://via.placeholder.com/150"
```
