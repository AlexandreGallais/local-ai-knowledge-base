---
title: "SVGNumberList: insertItemBefore() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgnumberlist/insertitembefore/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGNumberList: insertItemBefore() method

The **`insertItemBefore()`** method of the `SVGNumberList` interface inserts a new item into the list at the specified position. The first item is indexed 0. The inserted item is the item itself and not a copy.

- If the new item is already in a list, it is removed from its previous list before it is inserted into this list.
- If the item is already in this list, note that the index of the item to insert before is before the removal of the item.
- If the index is equal to 0, then the new item is inserted at the front of the list.
- If the index is greater than or equal to the `length`, then the new item is appended to the end of the list.

## Syntax

```js
insertItemBefore(newItem, index)
```

### Parameters

- `newItem`
    The `SVGNumber` to add to the list.
- `index`
    A non-negative integer that specifies the index of the item to insert the new item before.

### Return value

The `SVGNumber` that was added to the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the `SVGNumberList` corresponds to a read-only attribute or when the object itself is read-only.
