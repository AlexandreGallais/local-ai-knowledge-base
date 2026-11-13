---
title: "SVGTransformList: consolidate() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtransformlist/consolidate/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTransformList: consolidate() method

The `consolidate()` method of the `SVGTransformList` interface consolidates the list of separate `SVGTransform` objects by multiplying the equivalent transformation matrices together to result in a list consisting of a single `SVGTransform` object of type `SVG_TRANSFORM_MATRIX`.

The consolidation operation creates a new `SVGTransform` object as the first and only item in the list.

The returned item is the item itself and not a copy. Any changes made to the item are immediately reflected in the list.

## Syntax

```js
consolidate()
```

### Parameters

None.

### Return value

A live `SVGTransform` object; the consolidated transformation.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if `SVGTransformList` corresponds to a read-only attribute or when the object itself is read-only.

## Examples

### Consolidating Transformations

```html
<svg width="200" height="200">
  <rect
    width="100"
    height="100"
    fill="red"
    transform="translate(50,50) rotate(45)" />
</svg>
```

```js
const svgElement = document.querySelector("svg");
const rectElement = svgElement.querySelector("rect");

// Access the transform list of the <rect> element
const transformList = rectElement.transform.baseVal;

// Consolidate the transformations
const consolidatedTransform = transformList.consolidate();

console.dir(consolidatedTransform); // Output: SVGTransform { type: 1, matrix: SVGMatrix, angle: 0 }
console.log(transformList.numberOfItems); // Output: 1
```

## See also

- `SVGTransform`
