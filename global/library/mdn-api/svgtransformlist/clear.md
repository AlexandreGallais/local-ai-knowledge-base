---
title: "SVGTransformList: clear() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtransformlist/clear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTransformList: clear() method

The `clear()` method of the `SVGTransformList` interface clears all existing current items from the list, with the result being an empty list.

## Syntax

```js
clear()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if `SVGTransformList` corresponds to a read-only attribute or when the object itself is read-only.

## Examples

### Clearing All Transforms from an SVG Element

```html
<svg width="200" height="200" id="mySvg">
  <rect width="100" height="100" fill="blue" transform="translate(50,50)" />
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

// Number of transformations before clearing
console.log(
  `Number of transformations before clearing: ${transformList.length}`,
); // Output: 1

// Clear all transformations from the list
transformList.clear();

// Number of transformations after clearing
console.log(
  `Number of transformations after clearing: ${transformList.length}`,
); // Output: 0
```

## See also

- `SVGTransform`
