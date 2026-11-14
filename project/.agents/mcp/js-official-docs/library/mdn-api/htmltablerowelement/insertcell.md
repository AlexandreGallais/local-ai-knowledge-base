---
title: "HTMLTableRowElement: insertCell() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablerowelement/insertcell/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableRowElement: insertCell() method

The **`insertCell()`** method of the `HTMLTableRowElement` interface creates a ` | ` element, inserts it at the specified position in the given `` element, and returns it.

This method creates and inserts the element directly, without requiring separate calls to methods such as `Document.createElement()`, `Node.insertBefore()`, and `Node.appendChild()`. However, you cannot use `insertCell()` to create a new ` | ` element.

## Syntax

```js
insertCell()
insertCell(index)
```

### Parameters

- `index` (optional)
    The index of the new cell in the `cells` collection. If `index` is `-1` or equal to the number of cells, the cell is appended as the last cell in the row. If `index` is omitted, it defaults to `-1`.

### Return value

An `HTMLTableCellElement` that references the new cell.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if `index` is greater than the number of cells or smaller than `-1`.

## Examples

This example uses `HTMLTableRowElement.insertCell()` to append a new cell to a row.

### HTML

```html
<table>
  <thead>
    <tr>
      <th>C1</th>
      <th>C2</th>
      <th>C3</th>
      <th>C4</th>
      <th>C5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </tr>
  </tbody>
</table>

<button id="add">Add a cell</button>
<button id="remove">Remove last cell</button>
<div>This first row has <output>2</output> cell(s).</div>
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
const bodySection = document.querySelectorAll("tbody")[0];
const row = bodySection.rows[0]; // Select the first row of the body section
const cells = row.cells; // The collection is live, therefore always up-to-date
const cellNumberDisplay = document.querySelectorAll("output")[0];

const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");

function updateCellNumber() {
  cellNumberDisplay.textContent = cells.length;
}

addButton.addEventListener("click", () => {
  // Add a new cell at the end of the first row
  const newCell = row.insertCell();
  newCell.textContent = `Cell ${cells.length}`;

  // Update the row counter
  updateCellNumber();
});

removeButton.addEventListener("click", () => {
  // Delete the row from the body
  row.deleteCell(-1);

  // Update the row counter
  updateCellNumber();
});
```

## See also

- `HTMLTableElement.insertRow()`
- `HTMLTableRowElement.deleteCell()`
- The HTML element representing cells: `HTMLTableCellElement`
