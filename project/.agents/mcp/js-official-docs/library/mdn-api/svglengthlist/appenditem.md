---
title: "SVGLengthList: appendItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svglengthlist/appenditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGLengthList: appendItem() method

The **`appendItem()`** method of the `SVGLengthList` interface inserts a new item at the end of the list. If the given item is already in a list, it is removed from its previous list before it is inserted into this list. The inserted item is the item itself and not a copy.

## Syntax

```js
appendItem(newItem)
```

### Parameters

- `newItem`
    The `SVGLength` to add to the list.

### Return value

The `SVGLength` that was added to the list.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown when the list is read-only.

## Examples

See `SVGLengthList` for a complete example.
