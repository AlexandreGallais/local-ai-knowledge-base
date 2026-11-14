---
title: "HTMLTableCellElement: colSpan property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablecellelement/colspan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableCellElement: colSpan property

The **`colSpan`** property of the `HTMLTableCellElement` interface represents the number of columns this cell must span; this lets the cell occupy space across multiple columns of the table. It reflects the `colspan` attribute.

## Value

A positive number representing the number of columns.

> **Note:**
> When setting a new value, the value is _clamped_ to the nearest strictly positive number.

## Examples

This example provides two buttons to modify the column span of the first cell of the body.

### HTML

```html
<table>
  <thead>
    <tr>
      <th>Col 1</th>
      <th>Col 2</th>
      <th>Col 3</th>
      <th>Col 4</th>
      <th>Col 5</th>
      <th>Col 6</th>
      <th>Col 7</th>
      <th>Col 8</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2">1</td>
      <td>2</td>
      <td>3</td>
      <td>4</td>
      <td>5</td>
      <td>6</td>
      <td>7</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
<button id="increase">Increase colspan</button>
<button id="decrease">Decrease colspan</button>
<div>The first cell spans <output>2</output> column(s).</div>
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
const cell = document.querySelectorAll("tbody tr td")[0];
const output = document.querySelectorAll("output")[0];

const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");

increaseButton.addEventListener("click", () => {
  cell.colSpan += 1;

  // Update the display
  output.textContent = cell.colSpan;
});

decreaseButton.addEventListener("click", () => {
  cell.colSpan -= 1;

  // Update the display
  output.textContent = cell.colSpan;
});
```

## See also

- `HTMLTableCellElement.rowSpan`
- `HTMLTableColElement.span`
