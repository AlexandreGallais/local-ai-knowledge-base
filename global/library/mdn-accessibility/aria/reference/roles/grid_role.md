---
title: "ARIA: grid role (part 1 of 2)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/grid_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: grid role

The grid role is for a widget that contains one or more rows of cells. The position of each cell is significant and can be focused using keyboard input.

## Description

The `grid` role is a composite widget containing a collection of one or more rows with one or more cells where some or all cells in the grid are focusable by using methods of two-dimensional navigation, such as directional arrow keys.

```html
<table role="grid" aria-labelledby="id-select-your-seat">
  <caption id="id-select-your-seat">
    Select your seat
  </caption>
  <tbody role="presentation">
    <tr role="presentation">
      <td></td>
      <th>Row A</th>
      <th>Row B</th>
    </tr>
    <tr>
      <th scope="row">Aisle 1</th>
      <td tabindex="0">
        <button id="btn-1a" tabindex="-1">1A</button>
      </td>
      <td tabindex="-1">
        <button id="btn-1b" tabindex="-1">1B</button>
      </td>
      <!-- More Columns -->
    </tr>
    <tr>
      <th scope="row">Aisle 2</th>
      <td tabindex="-1">
        <button id="btn-2a" tabindex="-1">2A</button>
      </td>
      <td tabindex="-1">
        <button id="btn-2b" tabindex="-1">2B</button>
      </td>
      <!-- More Columns -->
    </tr>
  </tbody>
</table>
```

A grid widget contains one or more rows with one or more cells of thematically related interactive content. While it does not imply a specific visual presentation, it implies a relationship among elements. Uses fall into two categories: presenting tabular information (data grids) and grouping other widgets (layout grids). Even though both data grids and layout grids employ the same ARIA roles, states, and properties, differences in their content and purpose surface factors that are important to consider in keyboard interaction design. See ARIA Authoring Practices Guide for more details.

Cell elements have the role `gridcell`, unless they are a row or column header, in which case, the elements are `rowheader` and `columnheader`, respectively. Cell elements need to be owned by elements with a `row` role. Rows can be grouped using the `rowgroup` role.

The grid is an interactive widget, so keyboard interactions need to be implemented.

An accessible name is strongly recommended for the `grid` role, although not required by ARIA. Use `aria-labelledby` to reference a visible label, or `aria-label` if no visible label is present.

### Associated ARIA roles, states, and properties

#### Roles

- treegrid (subclass)
    If a grid has rows that can be expanded or collapsed to show or hide child rows, a treegrid can be used.
- row
    A row inside the grid.
- rowgroup
    A group containing one or multiple rows.

#### States and properties

- aria-level
    Indicates the hierarchical level of the grid within other structures.
- aria-multiselectable
    If `aria-multiselectable` is set to `true`, multiple items in the grid can be selected. The default value is `false`.
- aria-readonly
    If the grid provides cell content editing but editing is unavailable for all cells, the `aria-readonly` can be set to `true`. The default value is `false`, but omitting the attribute does not imply that the grid contains editable content. Omit the attribute if the grid does not provide cell content editing. The value set on the grid propagates to its gridcells and can be overridden on individual gridcells.

> **Note:**
> For many use cases, an HTML `` element is sufficient as it and the various table elements already include many ARIA roles.

### Keyboard interactions

When a keyboard user encounters a grid, they navigate the rows and columns using the `left`, `right`, `top` and `down` keys. To activate the interactive component, they will use the `return` and `space` keys.

| Key                               | Action                                                                                                                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `→`                      | Moves focus one cell to the right. Optionally (layout grids), if focus is on the right-most cell in the row, focus may move to the first cell in the following row. If focus is on the last cell in the grid, focus does not move.    |
| `←`                      | Moves focus one cell to the left. Optionally (layout grids), if focus is on the left-most cell in the row, focus may move to the last cell in the previous row. If focus is on the first cell in the grid, focus does not move.       |
| `↓`                      | Moves focus one cell down. Optionally (layout grids), if focus is on the bottom cell in the column, focus may move to the top cell in the following column. If focus is on the last cell in the grid, focus does not move.            |
| `↑`                      | Moves focus one cell up. Optionally (layout grids), if focus is on the top cell in the column, focus may move to the bottom cell in the previous column. If focus is on the first cell in the grid, focus does not move.              |
| `Page Down`              | Moves focus down an author-determined number of rows, typically scrolling so the bottom row in the currently visible set of rows becomes one of the first visible rows. If focus is in the last row of the grid, focus does not move. |
| `Page Up`                | Moves focus up an author-determined number of rows, typically scrolling so the top row in the currently visible set of rows becomes one of the last visible rows. If focus is in the first row of the grid, focus does not move.      |
| `Home`                   | Moves focus to the first cell in the row that contains focus.                                                                                                                                                                         |
| `End`                    | Moves focus to the last cell in the row that contains focus.                                                                                                                                                                          |
| `ctrl` + `Home` | Moves focus to the first cell in the first row.                                                                                                                                                                                       |
| `ctrl` + `End`  | Moves focus to the last cell in the last row.                                                                                                                                                                                         |

If cells, rows, or columns can be selected, the following key <example-value> are commonly used:

| Key <example-value>                     | Action                                                                                                                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctrl` + `Space`  | Select the column that contains the focus.                                                                                                                                                          |
| `shift` + `Space` | Selects the row that contains the focus. If the grid includes a column with checkboxes to select rows, this key <example-value> can be used to check that box even if the focus is not on the checkbox. |
| `ctrl` + `A`      | Selects all cells.                                                                                                                                                                                  |
| `shift` + `→`     | Extends selection one cell to the right.                                                                                                                                                            |
| `shift` + `←`     | Extends selection one cell to the left.                                                                                                                                                             |
| `shift` + `↓`     | Extends selection one cell down.                                                                                                                                                                    |
| `shift` + `↑`     | Extends selection one cell up.                                                                                                                                                                      |
