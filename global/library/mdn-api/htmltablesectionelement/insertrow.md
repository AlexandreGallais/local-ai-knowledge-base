---
title: "HTMLTableSectionElement: insertRow() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablesectionelement/insertrow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableSectionElement: insertRow() method

The **`insertRow()`** method of the `HTMLTableSectionElement` interface creates a `` element, inserts it at the specified position in the given table sectioning element (``, ``, or ``), and returns it.

This method creates and inserts the element directly, without requiring separate calls to methods such as `Document.createElement()`, `Node.insertBefore()`, and `Node.appendChild()`.

## Syntax

```js
insertRow()
insertRow(index)
```

### Parameters

- `index` (optional)
    The index of the new row in the `rows` collection. If `index` is `-1` or equal to the number of rows, the row is appended as the last row. If `index` is omitted, it defaults to `-1`.

### Return value

An `HTMLTableRowElement` that references the new row.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if `index` is greater than the number of rows or smaller than `-1`.

## Examples

In this example, two buttons allow you to add and remove rows from the table body section; it also updates an `<output>` element with the number of rows currently in the table.

### HTML

```html
<table>
  <thead>
    <tr>
      <th>Col 1</th>
      <th>Col 2</th>
      <th>Col 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>X</td>
      <td>Y</td>
      <td>Z</td>
    </tr>
  </tbody>
</table>
<button id="add">Add a row</button>
<button id="remove">Remove last row</button>
<div>This table's body has <output>1</output> row(s).</div>
```

```css
table {
  border-collapse: collapse;
}

th,
td {
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
const rows = bodySection.rows; // The collection is live, therefore always up-to-date
const rowNumberDisplay = document.querySelectorAll("output")[0];

const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");

function updateRowNumber() {
  rowNumberDisplay.textContent = rows.length;
}

addButton.addEventListener("click", () => {
  // Add a new row at the end of the body
  const newRow = bodySection.insertRow();

  // Add cells inside the new row
  ["A", "B", "C"].forEach(
    (elt) => (newRow.insertCell().textContent = `${elt}${rows.length}`),
  );

  // Update the row counter
  updateRowNumber();
});

removeButton.addEventListener("click", () => {
  // Delete the row from the body
  bodySection.deleteRow(-1);

  // Update the row counter
  updateRowNumber();
});
```

## See also

- `HTMLTableRowElement.insertCell()`
- `HTMLTableElement.insertRow()`
- `HTMLTableSectionElement.deleteRow()`
