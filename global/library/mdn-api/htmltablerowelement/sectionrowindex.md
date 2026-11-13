---
title: "HTMLTableRowElement: sectionRowIndex property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablerowelement/sectionrowindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableRowElement: sectionRowIndex property

The **`sectionRowIndex`** read-only property of the `HTMLTableRowElement` interface
represents the position of a row within the current section (``, ``, or ``).

## Value

The index of the row, or `-1` if the row is not part of the section.

## Examples

This example uses JavaScript to label all the row numbers of the `tbody`.

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
      <td>Oranges</td>
      <td>$8</td>
    </tr>
    <tr>
      <td>Top Sirloin</td>
      <td>$20</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$30</td>
    </tr>
  </tfoot>
</table>
```

### JavaScript

```js
const rows = document.querySelectorAll("tbody tr");

rows.forEach((row) => {
  const z = document.createElement("td");
  z.textContent = `(row #${row.sectionRowIndex})`;
  row.appendChild(z);
});
```

## See also

- `HTMLTableRowElement.rowIndex`
