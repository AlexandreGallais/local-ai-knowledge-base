---
title: "ARIA: aria-rowspan attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-rowspan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-rowspan attribute

The `aria-rowspan` attribute defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

## Description

Similar to the `rowspan` attribute of the ` | ` and ` | ` elements, but for cells and gridcells which are not contained in a native table, the `aria-rowspan` attribute defines the number of rows spanned by a `cell` or `gridcell` within a `table`, `grid`, or `treegrid`.

This attribute is intended for cells and gridcells which are **not** part of an HTML ``. When a cell is nested in a semantic ``, the `rowspan` attribute should be used when a  |  or  |  spans more than one row. If both are present, `rowspan` takes precedence over `aria-rowspan`. But, like all ARIA attributes, `aria-rowspan` only impacts the accessibility tree. It doesn't change your layout.

> **Note:**
> ARIA modifies the accessibility tree and how assistive technology presents content to your users. ARIA doesn't change anything about an element's function, behavior, or appearance. When using non-semantic elements, you must use CSS to manage layout and appearance.

The value of `aria-rowspan` is an integer greater than or equal to 0 and less than the value which would cause the cell or gridcell to overlap the next cell or gridcell in the same column. Setting the value to `0` indicates that the cell or gridcell is to span all the remaining rows in the row group. The default value is `1`.

## Values

- `<integer>`
    An integer greater than or equal to `0` and less than would cause a cell to overlap the next cell in the same column.

## Associated interfaces

- `Element.ariaRowSpan`
    The `ariaRowSpan` property, part of the `Element` interface, reflects the value of the `aria-rowspan` attribute.
- `ElementInternals.ariaRowSpan`
    The `ariaRowSpan` property, part of the `ElementInternals` interface, reflects the value of the `aria-rowspan` attribute.

## Associated roles

Used in roles:

- `cell`

Inherited into roles:

- `columnheader`
- `rowheader`

## See also

- The `rowspan` attribute on ` | `
- `aria-rowindex`
- `aria-colspan`
