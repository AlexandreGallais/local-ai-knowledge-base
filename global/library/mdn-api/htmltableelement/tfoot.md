---
title: "HTMLTableElement: tFoot property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/tfoot/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: tFoot property

The **`tFoot`** property of the `HTMLTableElement` interface represents the first `` element child of the given ``, or `null` if no such element exists.

## Value

An `HTMLTableSectionElement` (which is always a `tfoot`) or `null`.

This property can be assigned, which causes the existing first `` element child, if any, to be removed, and the given value, if it is not `null`, to be inserted as the last child. Therefore, setting `null` has the same effect as calling `deleteTFoot()`. If the assigned value is not an `HTMLTableSectionElement` or `null`, a `TypeError` is thrown; otherwise, if it is not a `` element or `null`, a `HierarchyRequestError` `DOMException` is thrown.

## Examples

```js
if (table.tFoot) {
  // Do something with the tfoot
}
```

## See also

- `HTMLTableElement.caption`
- `HTMLTableElement.tBodies`
- `HTMLTableElement.tHead`
- `HTMLTableElement.createTFoot()`
- `HTMLTableElement.deleteTFoot()`
