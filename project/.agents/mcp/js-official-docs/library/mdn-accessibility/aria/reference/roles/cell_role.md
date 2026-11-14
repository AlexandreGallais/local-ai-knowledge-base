---
title: "ARIA: cell role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/cell_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: cell role

The `cell` value of the ARIA _role_ attribute identifies an element as being a cell in a tabular container that does not contain column or row header information. To be supported, the cell must be nested in an element with the role of `row`.

```html
<div role="row">
  <span role="cell">France</span>
  <span role="cell">67 million</span>
</div>
```

A better, more semantic way of writing the cells above would be to use the semantic ` | ` element.

```html
<tr role="row">
  <td role="cell">France</td>
  <td role="cell">67 million</td>
</tr>
```

## Description

The element with `role="cell"` is a cell within a row, optionally within a `rowgroup`, within a `table`. If the cell is in a `grid` or `treegrid`, opt for `gridcell`. Using native HTML ` | ` elements, whenever possible, is strongly encouraged.

Each element with `role="cell"` MUST be nested in a container element with `role="row"`. That row, in turn, can be nested within an element with `role="rowgroup"`, and should be nested within a `grid`, `table` or `treegrid`. If a cell contains column or row header information, use the `columnheader` or `rowheader` roles, respectively. If the cell does not contain header information and is nested in a `grid` or `treegrid`, the role of `gridcell` may be more appropriate.

A cell can contain a number of property attributes clarifying the cell's position within the tabular data structure, including `aria-colindex`, `aria-colspan`, `aria-rowindex`, and `aria-rowspan`.

> **Note:**
> Using the native HTML table element (``) element, along with the table row element (``), and table cell element (` | `), whenever possible, is strongly encouraged.

### Associated WAI-ARIA roles, states, and properties

#### Context roles

- role="row"
    An element with `role="row"` is a row of cells within a tabular structure. A row contains one or more cells, grid cells, column headers, or row headers within a `grid`, `table` or `treegrid`, and optionally within a `rowgroup`.
- role="rowgroup"
    `Row` is a required cell parent. `Rowgroup` is an optional contextual row parent. It establishes a relationship between descendant rows. It is a structural equivalent to the `thead`, `tfoot`, and `tbody` elements in an HTML `table` element.
- role="table"
    One of the three possible contexts (along with `grid` and `treegrid`) in which you'll find a row containing cells. Table identifies the cell as being part of a non-interactive table structure containing data arranged in rows and columns, similar to the native HTML `` element.
- role="grid"
    One of the three possible contexts (along with `table` and `treegrid`) in which you'll find a row containing `cells` and `gridcells`. `Grid` identifies a cell as being part of a possibly interactive table structure containing data arranged in rows and columns, similar to the native `` HTML element.
- role="treegrid"
    Similar to a grid, but with rows that can be expanded and collapsed in the same manner as for a tree.

#### Subclass roles

- role="gridcell"
    A cell in a row within a `grid` or `treegrid`.
- role="columnheader"
    A header cell that is the structural equivalent of the HTML ` | ` element with a column scope. Unlike a plain cell, the `columnheader` role establishes a relationship between it and all cells in the corresponding column.
- role="rowheader"
    A header cell that is the structural equivalent of the HTML ` | ` element with a row scope. Unlike a plain cell, the `rowheader` role establishes a relationship between it and all cells in the corresponding row.

#### States and properties

- `aria-colspan`
    Similar to the HTML ` | ` and ` | ` colspan attribute, it defines the number of columns spanned by the cell.
- `aria-rowspan`
    Similar to the HTML ` | ` and ` | ` rowspan attribute, it defines the number of rows spanned by the cell.
- `aria-colindex` attribute
    The `aria-colindex` attribute is only needed if columns are hidden from the DOM. The attribute takes as its value an integer between 1 and the total number of columns within the `table`, `grid` or `treegrid`. The `aria-colindex` defines an element's column index or position with respect to the total number of columns within a row. If all the columns are in the DOM, this attribute is not necessary.
- `aria-rowindex` attribute
    The `aria-rowindex` attribute is only needed if rows are hidden from the DOM, to indicate which row, in the list of total rows, the current cell is in. The attribute, takes as its value an integer between 1 and the total number of rows within the table, grid, or treegrid, indicating the position, or index, of the cell. For example, a cell in the first row of the first header would likely have `aria-rowindex="1"` set, and cells in row 47 would have `aria-rowindex="47"`, if `aria-rowindex` were needed due to not all rows being in the DOM. If the rows that are visible are contiguous, and there are no cells with a `colspan` or `rowspan` greater than one, this property can be added to the parent rows instead of all the rows' cells.

### Keyboard interactions

None.

### Required JavaScript features

The first rule of ARIA use is if you can use a native feature with the semantics and behavior you require already built in, instead of repurposing an element and **adding** an ARIA role, state or property to make it accessible, then do so. Employ the HTML ` | ` element instead of the ARIA role of `cell` whenever possible.

## Examples

```html
<div
  role="table"
  aria-label="Semantic Elements"
  aria-describedby="semantic_elements_table_desc"
  aria-rowcount="81">
  <div id="semantic_elements_table_desc">
    Semantic Elements to use instead of ARIA's roles
  </div>
  <div role="rowgroup">
    <div role="row">
      <span role="columnheader" aria-sort="none" aria-rowindex="1"
        >ARIA Role</span
      >
      <span role="columnheader" aria-sort="none" aria-rowindex="1"
        >Semantic Element</span
      >
    </div>
  </div>
  <div role="rowgroup">
    <div role="row">
      <span role="cell" aria-rowindex="11">header</span>
      <span role="cell" aria-rowindex="11">h1</span>
    </div>
    <div role="row">
      <span role="cell" aria-rowindex="16">header</span>
      <span role="cell" aria-rowindex="16">h6</span>
    </div>
    <div role="row">
      <span role="cell" aria-rowindex="18">rowgroup</span>
      <span role="cell" aria-rowindex="18">thead</span>
    </div>
    <div role="row">
      <span role="cell" aria-rowindex="24">term</span>
      <span role="cell" aria-rowindex="24">dt</span>
    </div>
  </div>
</div>
```

The above is a non-semantic ARIA table with five of 81 rows present in the DOM: one within a table header and four rows within the table body. Because not all the rows are in the DOM, we've included the `aria-rowindex` property on every cell. If no cells spanned more than one row or column, the `aria-rowindex` could have been placed on the row rather than the row's individual cells.

## Best practices

Only use ``, ``, ``, ``, ` | `, ` | `, etc., for data table structure. You can add ARIA roles to ensure accessibility should the native semantics of the table be removed, such as with CSS. A relevant use case for the ARIA table role is when the native semantics of a table are overridden by CSS's display property, such as by display: grid. In this case, you can use the ARIA table roles to add the semantics back in.

```html
<table
  role="table"
  aria-label="Semantic Elements"
  aria-describedby="semantic_elements_table_desc"
  aria-rowcount="81">
  <caption id="semantic_elements_table_desc">
    Semantic Elements to use instead of ARIA's roles
  </caption>
  <thead role="rowgroup">
    <tr role="row">
      <th role="columnheader" aria-sort="none" aria-rowindex="1">ARIA Role</th>
      <th role="columnheader" aria-sort="none" aria-rowindex="1">
        Semantic Element
      </th>
    </tr>
  </thead>
  <tbody role="rowgroup">
    <tr role="row">
      <td role="cell" aria-rowindex="11">header</td>
      <td role="cell" aria-rowindex="11">h1</td>
    </tr>
    <tr role="row">
      <td role="cell" aria-rowindex="16">header</td>
      <td role="cell" aria-rowindex="16">h6</td>
    </tr>
    <tr role="row">
      <td role="cell" aria-rowindex="18">rowgroup</td>
      <td role="cell" aria-rowindex="18">thead</td>
    </tr>
    <tr role="row">
      <td role="cell" aria-rowindex="24">term</td>
      <td role="cell" aria-rowindex="24">dt</td>
    </tr>
  </tbody>
</table>
```

Above is the semantic way of writing a table. The ARIA roles are not necessary if the native semantics of the table, and therefore the table rows, have not been altered, such as through the display property.

### Added benefits

When applied to a ` | `, it returns cell semantics to the element in case the semantics were removed, such as with `display: grid;`.

## See also

- `role="row"`
- `role="gridcell"`
- HTML ` | ` element
- HTML ` | ` element
- Learn: HTML table accessibility
- Learn: HTML table basics
