---
title: "SVGLengthList: removeItem() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svglengthlist/removeitem/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGLengthList: removeItem() method

The **`removeItem()`** method of the `SVGLengthList` interface removes an existing item at the given index from the list.

## Syntax

```js
removeItem(index)
```

### Parameters

- `index`
    A non-negative integer that specifies the index of the item to delete.

### Return value

The `SVGLength` that was removed from the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown when the list is read-only.
- `IndexSizeError` `DOMException`
    Thrown when the index is out of bounds for the list.

## Examples

See `SVGLengthList` for a complete example.
