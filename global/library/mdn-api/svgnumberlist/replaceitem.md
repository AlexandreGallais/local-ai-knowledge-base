---
title: "SVGNumberList: replaceItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgnumberlist/replaceitem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGNumberList: replaceItem() method

The **`replaceItem()`** method of the `SVGNumberList` interface replaces an existing item in the list with a new item. If the new item is already in a list, it is removed from its previous list before it is inserted into this list. The inserted item is the item itself and not a copy. If the item is already in this list, note that the index of the item to replace is before the removal of the item.

Assigning to an index of the list has the same effect as calling this method, except that there is no return value.

## Syntax

```js
replaceItem(newItem, index)
```

### Parameters

- `newItem`
    The `SVGNumber` to add to the list.
- `index`
    A non-negative integer that specifies the index of the item to delete.

### Return value

The `SVGNumber` that was added to the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the `SVGNumberList` corresponds to a read-only attribute or when the object itself is read-only.
- `IndexSizeError` `DOMException`
    Thrown when the index is out of bounds for the list.
