---
id: layout
title: "SVG geometry: alignment, distribution, grid, snapping"
topic: geometry
summary: "Spread or stack items, grid cells, snap to a grid or to guides."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S27, S29, S31]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: alignment, distribution, grid, snapping

Contents: distributeSizes · stackSizes · gridCellRect · snapToGrid · snapToGuides · Sources

The three distribution modes follow the CSS definitions. Each function works on one axis.

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## distributeSizes

Formula: free = end - start - sum(sizes). space-between: gap = free / (n - 1), first item on start. space-around: gap = free / n, half a gap at each end. space-evenly: gap = free / (n + 1), a full gap at each end. Returns the start of each item.

Example: `distributeSizes([20,20,20], { start: 0, end: 200 }, 'space-between')` gives `[0,90,180]`.

Pitfall: free < 0: throws `RangeError` (CSS falls back to another alignment instead). No item: throws. One item with space-between: on start.

Kit: `distributeSizes(sizes: readonly number[], span: Span, mode: DistributeMode): readonly number[]` in `kit/geometry/distribute-sizes.ts`.

Sources: [S27]

## stackSizes

Formula: position_0 = start; position_i = position_(i-1) + size_(i-1) + gap

Example: `stackSizes([20,40,10],100,8)` gives `[100,128,176]`.

Pitfall: A negative gap makes the items overlap.

Kit: `stackSizes(sizes: readonly number[], start: number, gap: number): readonly number[]` in `kit/geometry/stack-sizes.ts`.

Sources: [S27] [S31]

## gridCellRect

Formula: column = index % columns; row = floor(index / columns); x = origin.x + column*(cellWidth + gapX); y = origin.y + row*(cellHeight + gapY)

Example: `gridCellRect({ origin: {x:10,y:10}, columns: 4, cellWidth: 30, cellHeight: 20, gapX: 5, gapY: 5 }, 0)` gives `{'x':10,'y':10,'width':30,'height':20}`.

Pitfall: index is counted from 0, row by row. columns < 1 or a non-integer: throws `RangeError`. The gap is between cells only, not on the outer edges.

Kit: `gridCellRect(grid: Grid, index: number): Rect` in `kit/geometry/grid-cell-rect.ts`.

Sources: [S29]

## snapToGrid

Formula: origin + round((value - origin) / step) * step

Example: `snapToGrid(23, 10, 0)` gives `20`.

Pitfall: step <= 0: throws `RangeError`. `Math.round` rounds a half up: -2.5 gives -2, 2.5 gives 3.

Kit: `snapToGrid(value: number, step: number, origin: number): number` in `kit/geometry/snap-to-grid.ts`.

Sources: [E]

## snapToGuides

Formula: the nearest guide when its distance is <= tolerance, else the value

Example: `snapToGuides(98, [0, 100, 200], 5)` gives `100`.

Pitfall: Two guides at the same distance: the last one in the list wins. Give the tolerance in user units: divide a pixel tolerance by the screen scale.

Kit: `snapToGuides(value: number, guides: readonly number[], tolerance: number): number` in `kit/geometry/snap-to-guides.ts`.

Sources: [E]

## Sources

- [S27] W3C, 2026, "CSS Box Alignment Module Level 3", <https://www.w3.org/TR/css-align-3/>.
- [S29] W3C, 2025, "CSS Grid Layout Module Level 2", <https://www.w3.org/TR/css-grid-2/>.
- [S31] T. Tantau et contributeurs, sans date, "TikZ and PGF Manual : Nodes and Edges", <https://tikz.dev/tikz-shapes>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
