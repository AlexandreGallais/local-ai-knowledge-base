---
title: "SVGTransformList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtransformlist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTransformList: length property

The **`length`** read-only property of the `SVGTransformList` interface represents the number of items in the list.

## Value

An `integer`; the number of `SVGTransform` objects in the list as an unsigned long.

## Examples

### Accessing the `length` Property

```html
<svg width="200" height="200" id="mySvg">
  <rect width="100" height="100" fill="blue" />
</svg>
```

```js
const svgElement = document.querySelector("svg");
const rectElement = svgElement.querySelector("rect");

// Access the transform list of the <rect> element
const transformList = rectElement.transform.baseVal;

// Apply a translate transformation to the <rect> element
const translateTransform = svgElement.createSVGTransform();
translateTransform.setTranslate(50, 50);
transformList.appendItem(translateTransform);

console.log(`Number of transformations: ${transformList.length}`); // Output: 1
```

## See also

- `SVGTransform`
- `SVGTransformList.numberOfItems` (alias property)
