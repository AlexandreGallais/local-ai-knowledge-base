---
title: "HTMLTableElement: createTHead() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/createthead/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: createTHead() method

The **`createTHead()`** method of the `HTMLTableElement` interface creates a `` element, inserts it before the first element child of the given `` that's neither a `` nor a ``, or as the last child if no such insertion location is found, and returns it. If the table already has a `` element child, this method returns the first such child without creating one.

When creation is needed, this method creates and inserts the element directly, without requiring separate calls to methods such as `Document.createElement()` and `Node.insertBefore()`.

## Syntax

```js
createTHead()
```

### Parameters

None.

### Return value

An `HTMLTableSectionElement` (which is always a `thead`).

## Examples

```js
const myHead = myTable.createTHead();
// Now this should be true: myHead === myTable.tHead
```

## See also

- `HTMLTableElement.createCaption()`
- `HTMLTableElement.createTBody()`
- `HTMLTableElement.createTFoot()`
- `HTMLTableElement.deleteTHead()`
