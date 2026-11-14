---
title: "HTMLTableElement: tHead property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/thead/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: tHead property

The **`tHead`** property of the `HTMLTableElement` interface represents the first `` element child of the given ``, or `null` if no such element exists.

## Value

An `HTMLTableSectionElement` (which is always a `thead`) or `null`.

This property can be assigned, which causes the existing first `` element child, if any, to be removed, and the given value, if it is not `null`, to be inserted immediately before the first element child that's neither a `` nor a ``, or as the last child if there is no such element. Therefore, setting `null` has the same effect as calling `deleteTHead()`. If the assigned value is not an `HTMLTableSectionElement` or `null`, a `TypeError` is thrown; otherwise, if it is not a `` element or `null`, a `HierarchyRequestError` `DOMException` is thrown.

## Examples

```js
if (table.tHead) {
  // Do something with the thead
}
```

## See also

- `HTMLTableElement.caption`
- `HTMLTableElement.tBodies`
- `HTMLTableElement.tFoot`
- `HTMLTableElement.createTHead()`
- `HTMLTableElement.deleteTHead()`
