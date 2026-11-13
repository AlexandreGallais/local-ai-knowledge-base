---
title: "SVGImageElement: href property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgimageelement/href/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGImageElement: href property

The **`href`** read-only property of the `SVGImageElement` interface reflects the `href` or `xlink:href` (deprecated) attribute of the given `<image>` element.

## Value

An `SVGAnimatedString` object.

## Examples

### Accessing the `href` property

```js
// Get the SVG image element
const imageElement = document.querySelector("image");

// Access the href property
const href = imageElement.href.baseVal;

console.log(href); // Output: The href value
```
