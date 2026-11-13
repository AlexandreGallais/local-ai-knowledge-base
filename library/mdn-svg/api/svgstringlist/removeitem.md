---
title: "SVGStringList: removeItem() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgstringlist/removeitem/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGStringList: removeItem() method

The **`removeItem()`** method of the `SVGStringList` interface removes an existing item at the given index from the list.

## Syntax

```js
removeItem(index)
```

### Parameters

- `index`
    A non-negative integer that specifies the index of the item to delete.

### Return value

The string that was removed from the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the `SVGStringList` corresponds to a read-only attribute or when the object itself is read-only.
- `IndexSizeError` `DOMException`
    Thrown when the index is out of bounds for the list.
