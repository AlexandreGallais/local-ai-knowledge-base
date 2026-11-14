---
title: "SVGStringList: removeItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgstringlist/removeitem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
