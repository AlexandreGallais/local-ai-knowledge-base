---
title: "`table-layout` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/table-layout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `table-layout` CSS property

The **`table-layout`** CSS property sets the algorithm used to lay out `` cells, rows, and columns.

```css
table-layout: auto;
width: 150px;
```

```css
table-layout: fixed;
width: 150px;
```

```css
table-layout: auto;
width: 100%;
```

```css
table-layout: fixed;
width: 100%;
```

```html
<section class="default-example" id="default-example">
  <table class="transition-all" id="example-element">
    <tbody>
      <tr>
        <th>Name</th>
        <th>Location</th>
      </tr>
      <tr>
        <td>Lion</td>
        <td>Africa</td>
      </tr>
      <tr>
        <td>Norwegian Lemming</td>
        <td>Europe</td>
      </tr>
      <tr>
        <td>Seal</td>
        <td>Antarctica</td>
      </tr>
      <tr>
        <td>Tiger</td>
        <td>Asia</td>
      </tr>
    </tbody>
  </table>
</section>
```

```css
table {
  border: 1px solid #113399;
}

th,
td {
  border: 2px solid #aa1199;
  padding: 0.25rem 0.5rem;
}
```

## Syntax

```css
/* Keyword values */
table-layout: auto;
table-layout: fixed;

/* Global values */
table-layout: inherit;
table-layout: initial;
table-layout: revert;
table-layout: revert-layer;
table-layout: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    The automatic table layout algorithm is used. The widths of the table and its cells are adjusted to fit the content. Most browsers use this algorithm by default.

- `fixed`
    The fixed table layout algorithm is used. When using this keyword, the table's width _needs to be specified explicitly_ using the `width` property. If the value of the `width` property is set to `auto` or is not specified, the browser uses the automatic table layout algorithm, in which case the `fixed` value has no effect.\
    The fixed table layout algorithm is faster than the automatic layout algorithm because the horizontal layout of the table depends only on the table's width, the width of the columns, and borders or cell spacing. The horizontal layout doesn't depend on the contents of the cells because it depends only on explicitly set widths.

    In the fixed table layout algorithm, the width of each column is determined as follows:
    - A column element with explicit width sets the width for that column.
    - Otherwise, a cell in the first row with explicit width determines the width for that column.
    - Otherwise, the column gets the width from the shared remaining horizontal space.

    With this algorithm the entire table can be rendered once the first table row has been downloaded and analyzed. This can speed up rendering time over the "automatic" layout method, but subsequent cell content might not fit in the column widths provided. Cells use the `overflow` property to determine whether to clip any overflowing content, but only if the table has a known width; otherwise, they won't overflow the cells.

## Examples

### Fixed-width tables with text-overflow

This example uses a fixed table layout, combined with the `width` property, to restrict the table's width. The `text-overflow` property is used to apply an ellipsis to words that are too long to fit. If the table layout were `auto`, the table would grow to accommodate its contents, despite the specified `width`.

#### HTML

```html
<table>
  <tbody>
    <tr>
      <td>Ed</td>
      <td>Wood</td>
    </tr>
    <tr>
      <td>Albert</td>
      <td>Schweitzer</td>
    </tr>
    <tr>
      <td>Jane</td>
      <td>Fonda</td>
    </tr>
    <tr>
      <td>William</td>
      <td>Shakespeare</td>
    </tr>
  </tbody>
</table>
```

#### CSS

```css
table {
  table-layout: fixed;
  width: 120px;
  border: 1px solid red;
}

td {
  border: 1px solid blue;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

#### Result

## See also

- ``
- CSS table module
