---
title: "HTMLTableElement: createTFoot() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/createtfoot/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: createTFoot() method

The **`createTFoot()`** method of the `HTMLTableElement` interface creates a `` element, inserts it as the last child of the given ``, and returns it. If the table already has a `` element child, this method returns the first such child without creating one.

When creation is needed, this method creates and inserts the element directly, without requiring separate calls to methods such as `Document.createElement()` and `Node.appendChild()`.

## Syntax

```js
createTFoot()
```

### Parameters

None.

### Return value

An `HTMLTableSectionElement` (which is always a `tfoot`).

## Examples

```js
const myFoot = myTable.createTFoot();
// Now this should be true: myFoot === myTable.tFoot
```

## See also

- `HTMLTableElement.createCaption()`
- `HTMLTableElement.createTBody()`
- `HTMLTableElement.createTHead()`
- `HTMLTableElement.deleteTFoot()`
