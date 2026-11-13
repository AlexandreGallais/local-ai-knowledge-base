---
title: "HTMLTableElement: rows property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/rows/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: rows property

The **`rows`** read-only property of the `HTMLTableElement` interface returns a live `HTMLCollection` of all `` elements that are a child of the given `` element, or a child of one of the table's ``, ``, and `` children. The members of the `` appear first, followed by members of the `` and the table itself, and members of the `` come last, sorted by tree order within each group.

Although the property is read-only, the returned object is live and is automatically updated when the `HTMLTableElement` changes.

## Value

A live `HTMLCollection` of `HTMLTableRowElement` objects.

## Examples

```js
const myRows = myTable.rows;
const firstRow = myTable.rows[0];
const lastRow = myTable.rows.item(myTable.rows.length - 1);
```

This demonstrates how you can use both indexed access and the `HTMLCollection.item()` method to obtain individual rows in the table.

## See also

- `HTMLTableElement.insertRow()`
- `HTMLTableElement.deleteRow()`
