---
title: "HTMLTableElement: insertRow() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/insertrow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: insertRow() method

The **`insertRow()`** method of the `HTMLTableElement` interface creates a `` element, inserts it at the specified position in the `rows` collection, and returns it. If the `rows` collection is empty and the table also has no `` elements, a `` element is first created and inserted.

This method creates and inserts the element directly, without requiring separate calls to methods such as `Document.createElement()`, `Node.insertBefore()`, and `Node.appendChild()`.

To explicitly insert a row into a specific section, use `HTMLTableSectionElement.insertRow()`.

## Syntax

```js
insertRow()
insertRow(index)
```

### Parameters

- `index` (optional)
    The index of the new row in the `rows` collection. If `index` is `-1` or equal to the number of rows, the row is appended as the last row. If `index` is omitted, it defaults to `-1`.

    If `rows` is empty, the new row is appended to the last `` element (one is created if there's none). Otherwise, the new row is inserted immediately before the row at `index`, or appended to the parent of the last row if the new row is to become the last row. The new row is inserted into the same parent as the reference row, so it can be inserted directly into the `` or into any table sectioning element (``, ``, or ``).

### Return value

An `HTMLTableRowElement` that references the new row.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if `index` is greater than the number of rows or smaller than `-1`.

## Examples

This example uses `insertRow(-1)` to append a new row to a table.

We then use `HTMLTableRowElement.insertCell()` to insert a new cell in the new row. Finally, we add some text to the cell using `Document.createTextNode()` and `Node.appendChild()`.

### HTML

```html
<table id="my-table">
  <tbody>
    <tr>
      <td>Row 1</td>
    </tr>
    <tr>
      <td>Row 2</td>
    </tr>
    <tr>
      <td>Row 3</td>
    </tr>
  </tbody>
</table>
```

### JavaScript

```js
function addRow(tableID) {
  // Get a reference to the table
  const tableRef = document.getElementById(tableID);

  // Insert a row at the end of the table
  const newRow = tableRef.insertRow(-1);

  // Insert a cell in the row at index 0
  const newCell = newRow.insertCell(0);

  // Append a text node to the cell
  const newText = document.createTextNode("New bottom row");
  newCell.appendChild(newText);
}

// Call addRow() with the table's ID
addRow("my-table");
```

## See also

- `HTMLTableRowElement.insertCell()`
- `HTMLTableSectionElement.insertRow()`
