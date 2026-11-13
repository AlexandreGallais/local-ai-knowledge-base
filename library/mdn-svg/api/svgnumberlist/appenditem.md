---
title: "SVGNumberList: appendItem() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgnumberlist/appenditem/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGNumberList: appendItem() method

The **`appendItem()`** method of the `SVGNumberList` interface inserts a new item at the end of the list. If the given item is already in a list, it is removed from its previous list before it is inserted into this list. The inserted item is the item itself and not a copy.

## Syntax

```js
appendItem(newItem)
```

### Parameters

- `newItem`
    The `SVGNumber` to add to the list.

### Return value

The `SVGNumber` that was added to the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the `SVGNumberList` corresponds to a read-only attribute or when the object itself is read-only.
