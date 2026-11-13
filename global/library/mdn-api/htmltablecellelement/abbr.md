---
title: "HTMLTableCellElement: abbr property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablecellelement/abbr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableCellElement: abbr property

The **`abbr`** property of the `HTMLTableCellElement` interface
indicates an abbreviation associated with the cell. If the cell does not represent a header cell ` | `, it is ignored.

It reflects the `abbr` attribute of the ` | ` element.

> **Note:**
> This property doesn't have a visual effect in browsers. It adds information to help assistive technology like screen readers that can use this abbreviation

## Value

A string.

## Examples

This example adds prefixes with the abbreviation associated with the row header of each first cell.

### HTML

```html
<table>
  <thead>
    <tr>
      <th abbr="Maker">Manufacturer</th>
      <th abbr="Model">Car model</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tesla</td>
      <td>3</td>
    </tr>
    <tr>
      <td>BYD</td>
      <td>Dolphin</td>
    </tr>
    <tr>
      <td>VW</td>
      <td>ID.3</td>
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
const rows = document.querySelectorAll("thead tr");
const cells = rows[0].cells;

for (const cell of cells) {
  cell.textContent = `${cell.textContent} (${cell.abbr})`;
}
```
