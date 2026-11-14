---
title: "ARIA: aria-rowcount attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-rowcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-rowcount attribute

The `aria-rowcount` attribute defines the total number of rows in a table, grid, or treegrid.

## Description

Some tables have hundreds, even millions, of rows. Even for tables with fewer rows, loading only a subsection of rows may be a design requirement, improve performance, or improve user experience. When only a subset of rows are loaded, you do need to let all users know that only a subset of the data is being displayed. The `aria-rowcount` attribute is used to define the total number of rows in a table, grid, or treegrid.

Included on the `` element or on an element with a role of `table`, the value is the number of rows in the full table, as an integer. If the total number of rows is not known, include `aria-rowcount="-1"`, which tells the browser to not count the total number of rows.

If all of the rows are loaded and in the DOM, you don't need to include `aria-rowcount` as browsers automatically count the total number of rows. However, if the rows aren't all present in the DOM at any time, this attribute is needed to provide the number of rows when the full table size is known and to tell the browser to not automatically count the rows when the total number of rows is not known.

## Example

The following example shows a grid with 24 rows, of which the first row and rows 7 through 9 are displayed to the user.

```html
<div role="grid" aria-rowcount="24">
  <div role="rowgroup">
    <div role="row" aria-rowindex="1">
      <span role="columnheader">First Name</span>
      <span role="columnheader">Last Name</span>
      <span role="columnheader">Position</span>
    </div>
  </div>
  <div role="rowgroup">
    <div role="row" aria-rowindex="7">
      <span role="gridcell">Morgan</span>
      <span role="gridcell">Brian</span>
      <span role="gridcell">Midfielder</span>
    </div>
    <div role="row" aria-rowindex="8">
      <span role="gridcell">Abby</span>
      <span role="gridcell">Dahlkemper</span>
      <span role="gridcell">Defender</span>
    </div>
    <div role="row" aria-rowindex="9">
      <span role="gridcell">Ashlyn</span>
      <span role="gridcell">Harris</span>
      <span role="gridcell">Goalkeeper</span>
    </div>
  </div>
</div>
```

## Values

- `<integer>`
    The number of rows in the full table or `-1` is the table size is not known.

## Associated interfaces

- `Element.ariaRowCount`
    The `ariaRowCount` property, part of the `Element` interface, reflects the value of the `aria-rowcount` attribute.
- `ElementInternals.ariaRowCount`
    The `ariaRowCount` property, part of the `ElementInternals` interface, reflects the value of the `aria-rowcount` attribute.

## Associated roles

Used in roles:

- `table`

Inherited into roles:

- `grid`
- `treegrid`

## See also

- `aria-rowindex`
- `aria-colcount`
