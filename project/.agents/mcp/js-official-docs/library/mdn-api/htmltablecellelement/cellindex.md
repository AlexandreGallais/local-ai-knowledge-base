---
title: "HTMLTableCellElement: cellIndex property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablecellelement/cellindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableCellElement: cellIndex property

The **`cellIndex`** read-only property of the `HTMLTableCellElement` interface
represents the position of a cell within its row (``). The first cell has an index of `0`.

## Value

Returns the index of the cell, or `-1` if the cell is not part of any row.

## Examples

This example adds a label to all the cell numbers of the first row of the `tbody`.

### HTML

```html
<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bananas</td>
      <td>$2</td>
    </tr>
    <tr>
      <td>Rice</td>
      <td>$2.5</td>
    </tr>
  </tbody>
</table>
```

```css
table {
  border-collapse: collapse;
}

th,
td,
table {
  border: 1px solid black;
}

button {
  margin: 1em 1em 1em 0;
}
```

### JavaScript

```js
const rows = document.querySelectorAll("tbody tr");
const cells = rows[0].cells;

for (const cell of cells) {
  cell.textContent = `${cell.textContent} (cell #${cell.cellIndex})`;
}
```
