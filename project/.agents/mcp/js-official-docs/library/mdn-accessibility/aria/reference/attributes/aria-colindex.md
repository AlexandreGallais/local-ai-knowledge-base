---
title: "ARIA: aria-colindex attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-colindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-colindex attribute

The `aria-colindex` attribute defines an element's column index or position with respect to the total number of columns within a `table`, `grid`, or `treegrid`.

## Description

Some tables are very large, and as a result have only a portion of its content is initially displayed. While loading only a subsection of the columns may improve user experience, you need to let all users know what portions of the content are being displayed, and that all the table's content is not present.

ARIA provides several attributes to provide information about `table`, `grid`, and `treegrid` structures. The `aria-colindex` attribute defines the substructure, an element's column index or position with respect to the total number of columns, within such structures.

Used in conjunction with the `aria-colcount` attribute, which informs assistive technologies how many columns the table would have if all columns were present, the `aria-colindex` is used an element's column index or position with respect to that total number of columns.

If all of the columns are present in the DOM, including `aria-colindex` is not necessary as user agents can calculate the column index of each cell or gridcell. However, if any of the columns are left out of the DOM at any time, use `aria-colindex` to indicate the column of each cell or gridcell with respect to the full table.

The value for `aria-colindex` is an integer greater than or equal to 1. Each value should be greater than the previous column's `aria-colindex` and less than or equal to the number of columns in the full table.

If a cell or gridcell spans multiple columns, set `aria-colspan` to the number of columns it spans if not using ` | ` and ` | ` HTML elements, and set `aria-colindex` to the value of the start of the span; the value it would have had if it was only one column wide spanning only the first of its columns.

If the set of columns which is present in the DOM is contiguous, and if there are no cells which span more than one row or column in that set, you only have to put the `aria-colindex` once on each row on the first column of the set. If the columns are not contiguous, include the `aria-colindex` value on all of the children or owned elements of each row.

The following example shows a grid with 6 columns, of which columns 1, 2, 5, and 6 are displayed to the user. The total number of columns that make up the table is set as `aria-colcount="6"` on the table itself. As the columns aren't contiguous, every `cell` - in this case `columnheader` and `gridcell` elements - have the `aria-colindex` attribute set.

```html
<div role="grid" aria-colcount="6">
  <div role="rowgroup">
    <div role="row">
      <div role="columnheader" aria-colindex="1">First name</div>
      <div role="columnheader" aria-colindex="2">Last name</div>
      <div role="columnheader" aria-colindex="5">City</div>
      <div role="columnheader" aria-colindex="6">Zip</div>
    </div>
  </div>
  <div role="rowgroup">
    <div role="row">
      <div role="gridcell" aria-colindex="1">Debra</div>
      <div role="gridcell" aria-colindex="2">Burks</div>
      <div role="gridcell" aria-colindex="5">New York</div>
      <div role="gridcell" aria-colindex="6">14127</div>
    </div>
  </div>
  …
</div>
```

The first rule of ARIA use is "if you can use a native feature with the semantics and behavior you require already built in, instead of repurposing an element and **adding** an ARIA role, state or property to make it accessible, then do so." If we employ native HTML semantics with ``, ` | `, ` | `, etc., and only display a subsection of columns, the `aria-colcount` and `aria-colindex` attribute are still necessary, but the mark up is not as verbose.

When using semantic table header elements and not all columns are in the DOM, the `aria-colindex` attribute only needs to be defined once per column in the column header ` | `.

```html
<table aria-colcount="6">
  <thead>
    <tr>
      <th aria-colindex="1" scope="col">First name</th>
      <th aria-colindex="2" scope="col">Last name</th>
      <th aria-colindex="5" scope="col">City</th>
      <th aria-colindex="6" scope="col">Zip</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Debra</td>
      <td>Burks</td>
      <td>New York</td>
      <td>14127</td>
    </tr>
    …
  </tbody>
</table>
```

If all the columns are in the DOM, neither `aria-colcount` nor `aria-colindex` are necessary.

## Values

- `<integer>`
    Integer greater than or equal to 1 and less than or equal to the total number of columns if all were present.

## Associated interfaces

- `Element.ariaColIndex`
    The `ariaColIndex` property, part of the `Element` interface, reflects the value of the `aria-colindex` attribute.
- `ElementInternals.ariaColIndex`
    The `ariaColIndex` property, part of the `ElementInternals` interface, reflects the value of the `aria-colindex` attribute.

## Associated roles

Used in roles:

- `cell`
- `row`

Inherits into roles:

- `columnheader`
- `gridcell`
- `rowheader`

## See also

- `aria-colindextext` attribute
- `aria-colcount` attribute
- `aria-colspan` attribute
- HTML `` element
- HTML ` | ` element
- HTML ` | ` element
