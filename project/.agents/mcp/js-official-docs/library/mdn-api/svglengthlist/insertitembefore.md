---
title: "SVGLengthList: insertItemBefore() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svglengthlist/insertitembefore/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGLengthList: insertItemBefore() method

The **`insertItemBefore()`** method of the `SVGLengthList` interface inserts a new item into the list at the specified position. The first item is indexed 0. The inserted item is the item itself and not a copy.

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
    The `SVGLength` to add to the list.
- `index`
    A non-negative integer that specifies the index of the item to insert the new item before.

### Return value

The `SVGLength` that was added to the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown when the list is read-only.

## Examples

See `SVGLengthList` for a complete example.
