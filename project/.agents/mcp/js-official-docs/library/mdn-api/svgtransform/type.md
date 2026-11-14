---
title: "SVGTransform: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtransform/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTransform: type property

The **`type`** read-only property of the `SVGTransform` interface represents the `type` of transformation applied, specified by one of the `SVG_TRANSFORM_*` constants defined on this interface.

## Value

An `integer`; the type of value as an unsigned short.

## Examples

### Determining the type of a transform

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect id="rect" x="50" y="50" width="100" height="100" fill="blue" />
</svg>
```

```js
const rect = document.getElementById("rect");
const transformList = rect.transform.baseVal;

// Create and add a translation transform
const translateTransform = rect.ownerSVGElement.createSVGTransform();
translateTransform.setTranslate(20, 30);
transformList.appendItem(translateTransform);

// Check the type of the added transform
console.log(transformList.getItem(0).type); // Output: 2 (SVG_TRANSFORM_TRANSLATE)
```
