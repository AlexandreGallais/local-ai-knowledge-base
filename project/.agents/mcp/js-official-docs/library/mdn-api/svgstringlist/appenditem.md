---
title: "SVGStringList: appendItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgstringlist/appenditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGStringList: appendItem() method

The **`appendItem()`** method of the `SVGStringList` interface inserts a new item at the end of the list. If the given item is already in a list, it is removed from its previous list before it is inserted into this list. The inserted item is the item itself and not a copy.

## Syntax

```js
appendItem(newItem)
```

### Parameters

- `newItem`
    The string to add to the list.

### Return value

The string that was added to the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the `SVGStringList` corresponds to a read-only attribute or when the object itself is read-only.
