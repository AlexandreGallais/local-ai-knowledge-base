---
title: "SVGNumberList: initialize() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgnumberlist/initialize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGNumberList: initialize() method

The **`initialize()`** method of the `SVGNumberList` interface clears all existing items from the list and re-initializes the list to hold the single item specified by the parameter. If the inserted item is already in a list, it is removed from its previous list before it is inserted into this list. The inserted item is the item itself and not a copy. The return value is the item inserted into the list.

## Syntax

```js
initialize(newItem)
```

### Parameters

- `newItem`
    The `SVGNumber` to add to the list.

### Return value

The `SVGNumber` that was added to the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the `SVGNumberList` corresponds to a read-only attribute or when the object itself is read-only.
