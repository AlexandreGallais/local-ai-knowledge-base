---
title: "SVGStringList: replaceItem() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgstringlist/replaceitem/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGStringList: replaceItem() method

The **`replaceItem()`** method of the `SVGStringList` interface replaces an existing item in the list with a new item. The inserted item is the item itself and not a copy.

- If the new item is already in a list, it is removed from its previous list before it is inserted into this list.
- If the item is already in this list, note that the index of the item to replace is before the removal of the item.

Assigning to an index of the list has the same effect as calling this method, except that there is no return value.

## Syntax

```js
replaceItem(newItem, index)
```

### Parameters

- `newItem`
    The string to add to the list.
- `index`
    A non-negative integer that specifies the index of the item to delete.

### Return value

The string that was added to the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the `SVGStringList` corresponds to a read-only attribute or when the object itself is read-only.
- `IndexSizeError` `DOMException`
    Thrown when the index is out of bounds for the list.
