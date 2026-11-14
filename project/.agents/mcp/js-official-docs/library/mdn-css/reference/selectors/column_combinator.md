---
title: "Column combinator"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/column_combinator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Column combinator

The **column combinator** (`||`) is placed between two CSS selectors. It matches only those elements matched by the second selector that belong to the column elements matched by the first.

```css
/* Table cells that belong to the "selected" column */
col.selected||td {
  background: gray;
}
```

## Syntax

```css
/* The white space around the || combinator is optional but recommended. */
column-selector || cell-selector {
  /* style properties */
}
```

## Examples

### HTML

```html
<table border="1">
  <colgroup>
    <col span="2" />
    <col class="selected" />
  </colgroup>
  <tbody>
    <tr>
      <td>A</td>
      <td>B</td>
      <td>C</td>
    </tr>

    <tr>
      <td colspan="2">D</td>
      <td>E</td>
    </tr>
    <tr>
      <td>F</td>
      <td colspan="2">G</td>
    </tr>
  </tbody>
</table>
```

### CSS

```css
col.selected||td {
  background: gray;
  color: white;
  font-weight: bold;
}
```

## Browser compatibility

Currently, no browsers support this feature.

## See also

- ``
- ``
- `grid`
- `:nth-of-type`
- `:nth-last-of-type`
- CSS selectors module
