---
title: "SVGTransformList: appendItem() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtransformlist/appenditem/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTransformList: appendItem() method

The `appendItem()` method of the `SVGTransformList` interface inserts a new item at the end of the list.

The inserted item is the item itself and not a copy.

- If `newItem` is already in a list, it is removed from its previous list before it is inserted into this list.

## Syntax

```js
appendItem(newItem)
```

### Parameters

- `newItem`
    An `SVGTransform` item that is appended to the list.

### Return value

An `SVGTransform` object; the appended item from the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if `SVGTransformList` corresponds to a read-only attribute or when the object itself is read-only.

## Examples

### Appending a New Transformation

```html
<svg width="200" height="200">
  <rect width="100" height="100" fill="red" />
</svg>
```

```js
const svgElement = document.querySelector("svg");
const rectElement = svgElement.querySelector("rect");

// Access the transform list of the <rect> element
const transformList = rectElement.transform.baseVal;

// Create a new translation transformation
const svgTransform = svgElement.createSVGTransform();
svgTransform.setTranslate(50, 50);

// Append the new transformation to the list
const appendedTransform = transformList.appendItem(svgTransform);

console.dir(appendedTransform); // Output: SVGTransform { type: 2, matrix: SVGMatrix, angle: 0 }
console.log(`Total number of transformations: ${transformList.numberOfItems}`); // Output: 1
```

## See also

- `SVGTransform`
- `SVGTransformList.numberOfItems`
