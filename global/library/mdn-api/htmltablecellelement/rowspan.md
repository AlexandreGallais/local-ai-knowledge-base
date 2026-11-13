---
title: "HTMLTableCellElement: rowSpan property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablecellelement/rowspan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableCellElement: rowSpan property

The **`rowSpan`** property of the `HTMLTableCellElement` interface represents the number of rows this cell must span; this lets the cell occupy space across multiple rows of the table. It reflects the `rowspan` attribute.

## Value

A positive number representing the number of rows. If it is `0`, it means all remaining rows in the column.

> **Note:**
> When setting a new value, a value different from 0 is _clamped_ to the nearest strictly positive number.

## Examples

This example provides two buttons to modify the row span of the first cell of the body.

### HTML

```html
<table>
  <thead>
    <tr>
      <th>Col 1</th>
      <th>Col 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <td rowspan="2">2</td>
      <td>2</td>
    </tr>
    <tr>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<button id="increase">Increase rowspan</button>
<button id="decrease">Decrease rowspan</button>
<div>The second cell of the first column spans <output>2</output> row(s).</div>
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
// Obtain relevant interface elements
const row = document.querySelectorAll("tbody tr")[1];
const cell = row.cells[0];
const output = document.querySelectorAll("output")[0];

const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");

increaseButton.addEventListener("click", () => {
  cell.rowSpan += 1;

  // Update the display
  output.textContent = cell.rowSpan;
});

decreaseButton.addEventListener("click", () => {
  cell.rowSpan -= 1;

  // Update the display
  output.textContent = `${cell.rowSpan === 0 ? "all remaining" : cell.rowSpan}`;
});
```

## See also

- `HTMLTableCellElement.colSpan`
- `HTMLTableColElement.span`
