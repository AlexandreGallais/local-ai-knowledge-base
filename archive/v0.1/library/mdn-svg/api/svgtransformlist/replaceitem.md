---
title: "SVGTransformList: replaceItem() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtransformlist/replaceitem/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTransformList: replaceItem() method

The `replaceItem()` method of the `SVGTransformList` interface replaces an existing item in the list with a new item.

The inserted item is the item itself and not a copy.

- If `newItem` is already in a list, it is removed from its previous list before it is inserted into this list.

- If the item is already in this list, note that the `index` of the item to replace is before the removal of the item.

Assigning to an index of the list has the same effect as calling this method, except that there is no return value.

## Syntax

```js
replaceItem(newItem, index)
```

### Parameters

- `newItem`
    A `SVGTransform` item that is inserted into the list.
- `index`
    An `integer`; the index where the new item should replace the existing one, as an unsigned long.

### Return value

An `SVGTransform` object; the inserted item from the list.

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `NoModificationAllowedError` `DOMException`
    Thrown if `SVGTransformList` corresponds to a read-only attribute or when the object itself is read-only.

- `IndexSizeError` `DOMException`
    Thrown if the index number is greater than or equal to `numberOfItems`.

## Examples

### Replacing a Transformation in the List

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

// Create a new rotation transformation
const rotateTransform = svgElement.createSVGTransform();
rotateTransform.setRotate(45, 50, 50);

transformList.replaceItem(rotateTransform, 0);

// Log the details of the new transformation
console.log(`New Transformation Type: ${transformList.getItem(0).type}`); // Output: 4 (e.g. SVG_TRANSFORM_ROTATE)
```

## See also

- `SVGTransform`
- `SVGTransformList.numberOfItems`
