---
title: "`border-spacing` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-spacing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-spacing` CSS property

The **`border-spacing`** CSS property sets the distance between the borders of adjacent cells in a ``. This property applies only when `border-collapse` is `separate`.

```css
border-spacing: 0;
```

```css
border-spacing: 5px;
```

```css
border-spacing: 5px 1rem;
```

```html
<section class="default-example" id="default-example">
  <table class="transition-all" id="example-element">
    <tbody>
      <tr>
        <td>Cell 1.1</td>
        <td>Cell 1.2</td>
      </tr>
      <tr>
        <td>Cell 2.1</td>
        <td>Cell 2.2</td>
      </tr>
      <tr>
        <td>Cell 3.1</td>
        <td>Cell 3.2</td>
      </tr>
    </tbody>
  </table>
</section>
```

```css
table {
  width: 15rem;
  table-layout: fixed;
}

td {
  border: 5px solid;
  border-color: crimson dodgerblue;
  padding: 0.75rem;
}
```

## Syntax

```css
/* <length> */
border-spacing: 2px;

/* horizontal <length> | vertical <length> */
border-spacing: 1cm 2em;

/* Global values */
border-spacing: inherit;
border-spacing: initial;
border-spacing: revert;
border-spacing: revert-layer;
border-spacing: unset;
```

The `border-spacing` property may be specified as either one or two values.

- When **one** `<length>` value is specified, it defines both the horizontal and vertical spacings between cells.
- When **two** `<length>` values are specified, the first value defines the horizontal spacing between cells (i.e., the space between cells in adjacent _columns_), and the second value defines the vertical spacing between cells (i.e., the space between cells in adjacent _rows_).

### Values

- `<length>`
    The size of the spacing as a fixed value.

## Description

The `border-spacing` value is also used along the outside edge of the table, where the distance between the table's border and the cells in the first/last column or row is the sum of the relevant (horizontal or vertical) `border-spacing` and the relevant (top, right, bottom, or left) `padding` on the table.

> **Note:**
> The `border-spacing` property is equivalent to the deprecated `cellspacing` attribute of the `` element, except that `border-spacing` has an optional second value that can be used to set different horizontal and vertical spacing.

## Examples

### Spacing and padding table cells

This example applies a spacing of `.5em` vertically and `1em` horizontally between a table's cells. Note how, along its outside edges, the table's `padding` values are added to its `border-spacing` values.

#### HTML

```html
<table>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
    <tr>
      <td>7</td>
      <td>8</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
```

#### CSS

```css
table {
  border-spacing: 1em 0.5em;
  padding: 0 2em 1em 0;
  border: 1px solid orange;
}

td {
  width: 1.5em;
  height: 1.5em;
  background: #d2d2d2;
  text-align: center;
  vertical-align: middle;
}
```

#### Result

## See also

- `border-collapse`, `border-style`
- The `border-spacing` property alters the appearance of the `` HTML element.
- CSS table module
