---
title: "HTMLTableElement: createTBody() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/createtbody/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: createTBody() method

The **`createTBody()`** method of the `HTMLTableElement` interface creates a `` element, inserts it immediately after the last `` element child of the given ``, or as the last child if there is no such element, and returns it.

This method creates and inserts the element directly, without requiring separate calls to methods such as `Document.createElement()`, `Node.insertBefore()`, and `Node.appendChild()`.

> **Note:**
> Unlike `HTMLTableElement.createTHead()` and `HTMLTableElement.createTFoot()`, `createTBody()` always creates a new `` element, even if the table already contains one or more bodies.

## Syntax

```js
createTBody()
```

### Parameters

None.

### Return value

An `HTMLTableSectionElement` (which is always a `tbody`).

## Examples

```js
const myBody = myTable.createTBody();
// Now this should be true: myBody === myTable.tBodies.item(myTable.tBodies.length - 1)
```

## See also

- `HTMLTableElement.createCaption()`
- `HTMLTableElement.createTFoot()`
- `HTMLTableElement.createTHead()`
