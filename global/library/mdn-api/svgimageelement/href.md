---
title: "SVGImageElement: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgimageelement/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
