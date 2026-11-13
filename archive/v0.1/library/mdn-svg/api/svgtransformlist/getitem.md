---
title: "SVGTransformList: getItem() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtransformlist/getitem/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTransformList: getItem() method

The `getItem()` method of the `SVGTransformList` interface returns the specified item from the list.

The returned item is the item itself and not a copy. Any changes made to the item are immediately reflected in the list.

The first item is indexed at `0`.

## Syntax

```js
getItem(index)
```

### Parameters

- `index`
    An `integer`; the index of the specified item as an unsigned long.

### Return value

An `SVGTransform` object; the specified item from the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if `SVGTransformList` corresponds to a read-only attribute or when the object itself is read-only.

## Examples

### Accessing an Item from the Transform List

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

// Get the first item from the transform list
const firstTransform = transformList.getItem(0);

// Log the transformation type
console.log(`Transformation Type: ${firstTransform.type}`); // Output: 2 (for SVG_TRANSFORM_TRANSLATE)
```

## See also

- `SVGTransform`
