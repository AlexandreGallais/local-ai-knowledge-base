---
title: "ARIA: rowheader role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/rowheader_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: rowheader role

An element with `role="rowheader"` is a cell containing header information for a row within a tabular structure of a `grid`, `table` or `treegrid`.

## Description

`Rowheader` is the header `cell` for a row, establishing a relationship between it and the other cells in the same `row`.

```html
<div
  role="table"
  aria-label="Populations"
  aria-describedby="country_population_desc">
  <div id="country_population_desc">World Populations by Country</div>
  <div role="rowgroup">
    <div role="row">
      <span role="columnheader" aria-sort="descending">Country</span>
      <span role="columnheader" aria-sort="none">Population</span>
    </div>
  </div>
  <div role="rowgroup">
    <div role="row">
      <span role="rowheader">Finland</span>
      <span role="cell">5.5 million</span>
    </div>
    <div role="row">
      <span role="rowheader">France</span>
      <span role="cell">67 million</span>
    </div>
  </div>
</div>
```

It is a structural equivalent to the ` | ` element with a scope of `row`, ` | `. Using the native ` | ` HTML element is strongly encouraged.

To create an ARIA row header, add `role="rowheader"` to the element. That row header must be nested within a `row`, which, in turn, is nested within a `rowgroup`, or directly within a `grid`, `table` or `treegrid`.

> **Note:**
> Using the native table elements whenever possible, is strongly encouraged.

### Associated WAI-ARIA roles, states, and properties

#### Context roles

- role="row"
    The only context in which you will find a row. It encompasses a cell or group of cells row, of which only one should be of rowheader type. Similar to the native `` HTML element.

### Keyboard interactions

None.

### Required JavaScript features

None.

> **Note:**
> The first rule of ARIA use is if you can use a native feature with the semantics and behavior you require already built in, instead of re-purposing an element and **adding** an ARIA role, state or property to make it accessible, then do so. Employ the HTML ``, ``, ` | `, ` | `, and other table elements instead of the ARIA table roles whenever possible.

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
      <span role="rowheader">header</span>
      <span role="cell">h1</span>
    </div>
    <div role="row" aria-rowindex="16">
      <span role="rowheader">header</span>
      <span role="cell">h6</span>
    </div>
    <div role="row" aria-rowindex="18">
      <span role="rowheader">rowgroup</span>
      <span role="cell">thead</span>
    </div>
    <div role="row" aria-rowindex="24">
      <span role="rowheader">term</span>
      <span role="cell">dt</span>
    </div>
  </div>
</div>
```

The above is a non-semantic ARIA table with a table header and table body, with five of 81 rows present in the DOM: one within a table header and four rows within the table body. The header row, alone in a header rowgroup, has two column headers. The columns are sortable, but not currently sorted, as indicated by the `aria-sort` property. The table body is a separate rowgroup, with four rows currently in the DOM. Each data table row has a row header. Because not all the rows are in the DOM, we've included the `aria-rowindex` property on every row.

## Best practices

Only use ``, ``, ``, ``, ` | `, ` | `, and so on for data table structure. You can add these ARIA roles to ensure accessibility should the native semantics of the table be removed, such as with CSS. A relevant use case for all the ARIA table roles is when the CSS's `display` property overrides the native semantics of a table, such as by `display: grid`. In this case, you can use the ARIA table roles to add in the semantics.

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
      <th role="columnheader" aria-sort="none">ARIA Role</th>
      <th role="columnheader" aria-sort="none">Semantic Element</th>
    </tr>
  </thead>
  <tbody role="rowgroup">
    <tr role="row" aria-rowindex="11">
      <th role="rowheader">header</th>
      <td role="cell">h1</td>
    </tr>
    <tr role="row" aria-rowindex="16">
      <th role="rowheader">header</th>
      <td role="cell">h6</td>
    </tr>
  </tbody>
</table>
```

Above is the semantic way of writing a table. The ARIA roles are only necessary if the native semantics of the table, and therefore the table row headers, are obliterated, such as by setting the display property to flex or grid.

### Added benefits

none

## See also

- The HTML `` element
- The HTML ` | ` element
- HTML table tutorial
- ARIA `cell` role
- ARIA `row` role
- ARIA `gridcell` role
