---
title: "`<position-area>` CSS type (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/position-area_value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<position-area>` CSS type (part 2 of 2)

## Coordinate grid keywords

These keywords specify the cells of the `position-area` grid using x- and y-coordinate values. Its position/direction will be affected by `writing-mode` and/or `direction` settings on either an element's containing block or, in the case of the `self` keywords, the element itself.

However, the grid cells are defined according to physical axes rather than block/inline directions:

- For `writing-mode: horizontal-tb` and `vertical-lr`, the x-axis runs left-to-right and the y-axis runs top-to-bottom.
- For `writing-mode: horizontal-tb; direction: rtl` and `writing-mode: vertical-rl`, the x-axis runs right-to-left and the y-axis runs top-to-bottom.

With coordinate row and column keywords, you can specify one keyword from the x-axis and one from the y-axis to define a single specific grid tile.

The x-axis keywords include:

- `x-start`
    The start tile along the grid's x-axis, calculated from the containing block's writing mode.

- `x-end`
    The end tile along the grid's x-axis, calculated from the containing block's writing mode.

- `self-x-start`
    The start tile along the grid's x-axis, calculated from the element's own writing mode.

- `self-x-end`
    The end tile along the grid's x-axis, calculated from the element's own writing mode.

- `center`
    The center of the grid's x-axis, calculated from the element's own writing mode.

The y-axis keywords include:

- `y-start`
    The start tile along the grid's y-axis, calculated from the containing block's writing mode.

- `y-end`
    The end tile along the grid's y-axis, calculated from the containing block's writing mode.

- `self-y-start`
    The start tile along the grid's y-axis, calculated from the element's own writing mode.

- `self-y-end`
    The end tile along the grid's y-axis, calculated from the element's own writing mode.

- `center`
    The center of the grid's y-axis, calculated from the element's own writing mode.

For example, `x-end y-start` and `self-x-end self-y-start` both select the grid cell at end of the x-axis and the start of the y-axis. With `writing-mode: horizontal-tb` set, this would be the cell to the top right of the anchor, whereas with `writing-mode: vertical-rl` is at the top left.

### Coordinate spanning keywords

When combined with a coordinate row or column keyword, the coordinate-spanning keywords specify a second grid tile for the position area to expand into. When such a combination is set as a `position-area` property value, a selected element is initially placed in the center of the specified row or column, and it then spans in the direction specified in the spanning keyword, spanning two grid tiles:

- `span-x-start`
    Span the center tile and the x-start tile of the specified y-axis row.

- `span-x-end`
    Span the center tile and the x-end tile of the specified y-axis row.

- `span-y-start`
    Span the center tile and the y-start tile of the specified x-axis column.

- `span-y-end`
    Span the center tile and the y-end tile of the specified x-axis column.

For example, `y-end span-x-end` selects the tile at the center of the end y-row, and spans across the tiles in that row that sit in the x-center and x-end columns. With `writing-mode: horizontal-tb` set, the position grid area would span the grid tiles at the bottom-center and bottom-right, whereas with `writing-mode: vertical-rl` set it would span the bottom-center and bottom-left tiles.

> **Note:**
> The specification doesn't define separate coordinate `self` spanning keywords, but these are not needed — the spanning keywords can be used with both coordinate row and column keywords.

### Coordinate grid keyword defaults

If only a single coordinate grid `<position-area>` keyword is specified, the other value is implied as follows:

- `x-start`, `self-x-start`, `x-end`, `self-x-end`, `y-start`, `self-y-start`, `y-end`, or `self-y-end`
    The other value defaults to `span-all`, selecting the grid tiles spanning all three tiles of the column or row it was initially placed in. For example, `x-start` is equivalent to `x-start span-all`.

- `span-x-start`, `span-x-end`, `span-y-start`, `span-y-end`, `span-self-x-start`, `span-self-x-end`, `span-self-y-end`, or `span-self-y-start`
    The other value defaults to `span-all`. For example, `span-x-start` is equivalent to `span-x-start span-all`.

## `span-all`

`span-all` is a special keyword usable with all of the row and column keywords listed in the sections above. When you specify two values — a row/column keyword and `span-all`, the element is placed in the specified row or column, and it then spans all of the tiles in that row or column.

## Examples

See the `position-area` property page.

For detailed information on anchor features and usage, see the CSS anchor positioning module and the Using CSS anchor positioning guide.

## See also

- `position-area`
- `anchor-name`
- `position-anchor`
- `anchor()` function
- Using CSS anchor positioning guide
- Fallback options and conditional hiding for overflow guide
- CSS anchor positioning module
