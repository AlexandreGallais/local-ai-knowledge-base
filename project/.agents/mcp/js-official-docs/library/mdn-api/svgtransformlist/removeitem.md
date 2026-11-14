---
title: "SVGTransformList: removeItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtransformlist/removeitem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTransformList: removeItem() method

The `removeItem()` method of the `SVGTransformList` interface removes an existing item from the list.

## Syntax

```js
removeItem(index)
```

### Parameters

- `index`
    An `integer`; the index of the item to be removed as an unsigned long.

### Return value

An `SVGTransform` object; the removed item from the list.

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `NoModificationAllowedError` `DOMException`
    Thrown if `SVGTransformList` corresponds to a read-only attribute or when the object itself is read-only.

- `IndexSizeError` `DOMException`
    Thrown if the index number is greater than or equal to `numberOfItems`.

## Examples

### Removing a Transformation from the List

```html
<svg width="200" height="200" id="mySvg">
  <rect
    width="100"
    height="100"
    fill="blue"
    transform="translate(50,50) rotate(45)" />
</svg>
```

```js
const svgElement = document.querySelector("svg");
const rectElement = svgElement.querySelector("rect");

// Access the transform list of the <rect> element
const transformList = rectElement.transform.baseVal;

const removedTransform = transformList.removeItem(0);
console.dir(removedTransform); // Output: SVGTransform { type: 2, matrix: SVGMatrix, angle: 0 }

// The updated list length
console.log(`Updated number of transformations: ${transformList.length}`); // Output: 1
```

## See also

- `SVGTransform`
- `SVGTransformList.numberOfItems`
