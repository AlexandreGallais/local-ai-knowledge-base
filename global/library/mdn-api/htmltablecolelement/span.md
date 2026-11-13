---
title: "HTMLTableColElement: span property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablecolelement/span/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableColElement: span property

The **`span`** property of the `HTMLTableColElement` interface represents the number of columns this `` or `` must span; this lets the column occupy space across multiple columns of the table. It reflects the `span` attribute.

## Value

A positive number representing the number of columns.

> **Note:**
> When setting a new value, the value is _clamped_ to the nearest strictly positive number (up to 1000).

## Examples

This example provides two buttons to modify the column span of the first cell of the body.

### HTML

```html
<table>
  <colgroup>
    <col />
    <col span="2" class="multiColumn" />
  </colgroup>
  <thead>
    <tr>
      <th></th>
      <th scope="col">C1</th>
      <th scope="col">C2</th>
      <th scope="col">C3</th>
      <th scope="col">C4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Row 1</th>
      <td>cell</td>
      <td>cell</td>
      <td>cell</td>
      <td>cell</td>
    </tr>
  </tbody>
</table>
<button id="increase">Increase column span</button>
<button id="decrease">Decrease column span</button>
<div>The first &lt;col&gt; spans <output>2</output> actual column(s).</div>
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

### CSS

```css
.multiColumn {
  background-color: #d7d9f2;
}
```

### JavaScript

```js
// Obtain relevant interface elements
const col = document.querySelectorAll("col")[1];
const output = document.querySelectorAll("output")[0];

const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");

increaseButton.addEventListener("click", () => {
  col.span += 1;

  // Update the display
  output.textContent = col.span;
});

decreaseButton.addEventListener("click", () => {
  col.span -= 1;

  // Update the display
  output.textContent = col.span;
});
```

## See also

- `HTMLTableCellElement.colSpan`
