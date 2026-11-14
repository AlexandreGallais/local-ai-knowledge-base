---
title: "SVGStringList: getItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgstringlist/getitem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGStringList: getItem() method

The **`getItem()`** method of the `SVGStringList` interface returns the specified item from the list. The returned item is the item itself and not a copy. Any changes made to the item are immediately reflected in the list. The first item is indexed 0.

## Syntax

```js
getItem(index)
```

### Parameters

- `index`
    A non-negative integer that specifies the index of the item to retrieve.

### Return value

The string at the specified index in the list.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if the `SVGStringList` corresponds to a read-only attribute or when the object itself is read-only.
