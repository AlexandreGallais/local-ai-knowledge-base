---
title: "NodeList: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodelist/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeList: item() method

Returns a node from a `NodeList` by index. This method
doesn't throw exceptions as long as you provide arguments. A value of `null`
is returned if the index is out of range, and a `TypeError` is thrown if no
argument is provided.

In JavaScript, instead of calling `nodeList.item(index)`, you can also access the `index` directly, like `nodeList[index]`.

## Syntax

```js
item(index)
```

### Parameters

- `index`
    The index of the node to be fetched. The index is zero-based.

### Return value

The `index`th node in the `nodeList` returned by the `item` method.

### Exceptions

- `TypeError`
    Thrown if no argument is provided.

## Examples

```js
const tables = document.getElementsByTagName("table");
const firstTable = tables.item(1); // or tables[1] - returns the second table in the DOM
```
