---
title: "ARIA: table role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/table_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: table role

The `table` value of the ARIA `role` attribute identifies the element containing the role as having a non-interactive table structure containing data arranged in rows and columns, similar to the native `` HTML element.

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
      <span role="columnheader" aria-sort="none">ARIA Role</span>
      <span role="columnheader" aria-sort="none">Semantic Element</span>
    </div>
  </div>
  <div role="rowgroup">
    <div role="row" aria-rowindex="11">
      <span role="cell">header</span>
      <span role="cell">h1</span>
    </div>
    <div role="row" aria-rowindex="16">
      <span role="cell">header</span>
      <span role="cell">h6</span>
    </div>
    <div role="row" aria-rowindex="18">
      <span role="cell">rowgroup</span>
      <span role="cell">thead</span>
    </div>
    <div role="row" aria-rowindex="24">
      <span role="cell">term</span>
      <span role="cell">dt</span>
    </div>
  </div>
</div>
```

## Description

An element with `role="table"` is a static tabular structure with rows containing cells. The cells are not focusable or selectable, though widgets within individual cells of the table can be interactive. Using a native HTML `` element whenever possible is strongly encouraged.

> **Warning:**
> If a table maintains a selection state, has two-dimensional navigation, or allows the user to rearrange cell order use `grid` or `treegrid` instead.

To create an ARIA table, add `role="table"` to the container element. Within that container, each row has `role="row"` set and contains child cells. Each cell has a role of either `columnheader`, `rowheader`, or `cell`. Rows can be children of the table or within a `rowgroup`.

An accessible name is strongly recommended for the `table` role, although not required by ARIA. Define the accessible name via `aria-labelledby` or `aria-label`. If a visible caption is present, use `aria-labelledby` to reference it. All other semantic table elements, such as ``, ``, ``, ` | `, and ` | `, need to be added via associated roles, such as `rowgroup`, `row`, `columnheader`, and `cell`.

If the table contains sortable columns or rows, the `aria-sort` attribute should be added on the header cell element (not the table itself). If any rows or columns are hidden, the `aria-colcount` or `aria-rowcount` should be included indicating the total number of columns or rows, respectively, along with the `aria-colindex` or `aria-rowindex` on each cell. The `aria-colindex` or `aria-rowindex` is set to the position of a cell within the row or column, respectively. If the table includes cells that span multiple rows or multiple columns, then `aria-rowspan` or `aria-colspan` should be included as well. Realize, it is much simpler to use the `` element, along with all the related semantic elements and attributes that are all supported by all assistive technologies.

To create an interactive widget that has a tabular structure, use the `grid` pattern instead. If the interaction provides for the selection state of individual cells, if left to right and top to bottom navigation is provided, or if the user interface allows the rearranging of cell order or otherwise changing individual cell order such as through drag and drop, use `grid` or `treegrid` instead.

> **Note:**
> Using a native HTML table element whenever possible is strongly encouraged.

### Associated WAI-ARIA roles, states, and properties

- `role="rowgroup"`
    An optional child of the table, the row group encapsulates a group of rows, similar to ``, ``, and ``.
- `role="row"`
    A row within the table, and optionally within a rowgroup that contains one or more cells, column headers, or row headers.
- `aria-describedby` attribute
    Takes as its value the id of the element that serves as a description for the table.
- `aria-label` attribute
    The `aria-label` provides an accessible name for the table.
- `aria-colcount` attribute
    This attribute is only required if the columns are not present in the DOM all the time. It provides an explicit indication of the number of columns in the full table. Set the value to the total number of columns in the full table. If unknown, set `aria-colcount="-1"`.
- `aria-rowcount` attribute
    This attribute is only required if the rows are not present in the DOM all the time, such as scrollable tables that reuse rows to minimize the number of DOM nodes. It provides an explicit indication of the number of rows in the full table. Set the value to the total number of rows in the full table. If unknown, set `aria-rowcount="-1"`.

### Keyboard interactions

None.

### Required JavaScript features

None. For sortable columns, see the columnheader aria role.

> **Note:**
> The first rule of ARIA use is if you can use a native feature with the semantics and behavior you require already built in, instead of re-purposing an element and **adding** an ARIA role, state or property to make it accessible, then do so. Employ the HTML `` element instead of the ARIA role of table whenever possible.

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
      <span role="columnheader" aria-sort="none">ARIA Role</span>
      <span role="columnheader" aria-sort="none">Semantic Element</span>
    </div>
  </div>
  <div role="rowgroup">
    <div role="row" aria-rowindex="11">
      <span role="cell">header</span>
      <span role="cell">h1</span>
    </div>
    <div role="row" aria-rowindex="16">
      <span role="cell">header</span>
      <span role="cell">h6</span>
    </div>
    <div role="row" aria-rowindex="18">
      <span role="cell">rowgroup</span>
      <span role="cell">thead</span>
    </div>
    <div role="row" aria-rowindex="24">
      <span role="cell">term</span>
      <span role="cell">dt</span>
    </div>
  </div>
</div>
```

The above is part of a table. While the full table has 81 entries, as indicated by the `aria-rowcount` property, only four are currently visible. The columns are sortable, but not currently sorted, as indicated by the `aria-sort` property on the column headers.

## Best practices

Only use ``, ``, ``, ``, ` | `, ` | `, etc., for data table structure. You can add these ARIA roles to ensure accessibility should the native semantics of the table be removed, such as with CSS. A relevant use case for the ARIA table role is when CSS's display property overrides the native semantics of a table, such as by `display: grid`. In this case, you can use the ARIA table roles to re-add the semantics.

## See also

- Learn: HTML table accessibility
- Learn: HTML table basics
- ARIA: `grid` role
