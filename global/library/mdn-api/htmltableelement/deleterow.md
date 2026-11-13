---
title: "HTMLTableElement: deleteRow() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/deleterow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: deleteRow() method

The **`deleteRow()`** method of the `HTMLTableElement` interface removes a specific row (``) from a given ``.

## Syntax

```js
deleteRow(index)
```

### Parameters

- `index`
    The index of the row to remove in the `rows` collection. If `index` is `-1`, the last row is removed.

### Return value

None (`undefined`).

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if `index` is greater than or equal to the number of rows or smaller than `-1`.

## Examples

This example uses JavaScript to delete a table's second row.

### HTML

```html
<table>
  <tbody>
    <tr>
      <td>Cell 1.1</td>
      <td>Cell 1.2</td>
      <td>Cell 1.3</td>
    </tr>
    <tr>
      <td>Cell 2.1</td>
      <td>Cell 2.2</td>
      <td>Cell 2.3</td>
    </tr>
    <tr>
      <td>Cell 3.1</td>
      <td>Cell 3.2</td>
      <td>Cell 3.3</td>
    </tr>
  </tbody>
</table>
```

### JavaScript

```js
const table = document.querySelector("table");

// Delete second row
table.deleteRow(1);
```

## See also

- `HTMLTableRowElement.deleteCell()`
- `HTMLTableSectionElement.deleteRow()`
