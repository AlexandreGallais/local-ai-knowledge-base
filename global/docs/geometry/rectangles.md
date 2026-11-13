---
id: rectangles
title: "SVG geometry: rectangles and bounding boxes"
topic: geometry
summary: "Anchor points, bounding boxes, union, margin, containment, overlap, intersection, transformed box, edge point toward a target."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S2, S6]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: rectangles and bounding boxes

Contents: rectAnchorPoint · rectFromPoints · unionRects · expandRect · rectContainsPoint · rectsOverlap · intersectRects · transformRect · rectEdgePointToward · Sources

A `Rect` has the fields of `DOMRect` and of `getBBox()`: x, y, width, height.

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## rectAnchorPoint

Formula: x = left, middle or right edge; y = top, middle or bottom edge

Example: `rectAnchorPoint({x:10,y:20,width:100,height:40},'center')` gives `{'x':60,'y':40}`.

Pitfall: Nine names: top-left, top-center, top-right, center-left, center, center-right, bottom-left, bottom-center, bottom-right.

Kit: `rectAnchorPoint(rect: Rect, anchor: AnchorName): Point` in `kit/geometry/rect-anchor-point.ts`.

Sources: [E]

## rectFromPoints

Formula: min and max of the x and of the y

Example: `rectFromPoints([{x:5,y:1},{x:-2,y:8},{x:3,y:3}])` gives `{'x':-2,'y':1,'width':7,'height':7}`.

Pitfall: Empty list: throws `RangeError`. One point: width and height 0.

Kit: `rectFromPoints(points: readonly Point[]): Rect` in `kit/geometry/rect-from-points.ts`.

Sources: [S6]

## unionRects

Formula: the smallest rectangle that holds both

Example: `unionRects({x:0,y:0,width:10,height:10},{x:20,y:5,width:10,height:10})` gives `{'x':0,'y':0,'width':30,'height':15}`.

Pitfall: An empty rectangle at (0, 0) still pulls the union to the origin: skip elements that are not drawn.

Kit: `unionRects(a: Rect, b: Rect): Rect` in `kit/geometry/union-rects.ts`.

Sources: [E]

## expandRect

Formula: x - m, y - m, width + 2m, height + 2m

Example: `expandRect({x:10,y:10,width:20,height:20},5)` gives `{'x':5,'y':5,'width':30,'height':30}`.

Pitfall: With m = stroke-width / 2 it gives the stroke box of a rect, circle or ellipse only. A mitre join or a square cap goes further.

Kit: `expandRect(rect: Rect, margin: number): Rect` in `kit/geometry/expand-rect.ts`.

Sources: [S2]

## rectContainsPoint

Formula: x <= p.x <= x + width and y <= p.y <= y + height

Example: `rectContainsPoint({x:0,y:0,width:10,height:10},{x:10,y:5})` gives `true`.

Pitfall: The edges are inside.

Kit: `rectContainsPoint(rect: Rect, p: Point): boolean` in `kit/geometry/rect-contains-point.ts`.

Sources: [E]

## rectsOverlap

Formula: a.x < b.right and b.x < a.right and a.y < b.bottom and b.y < a.bottom

Example: `rectsOverlap({x:0,y:0,width:10,height:10},{x:5,y:5,width:10,height:10})` gives `true`.

Pitfall: Two rectangles that only touch do not overlap.

Kit: `rectsOverlap(a: Rect, b: Rect): boolean` in `kit/geometry/rects-overlap.ts`.

Sources: [E]

## intersectRects

Formula: x = max of the lefts; right = min of the rights; same for y

Example: `intersectRects({x:0,y:0,width:10,height:10},{x:5,y:5,width:10,height:10})` gives `{'x':5,'y':5,'width':5,'height':5}`.

Pitfall: No common point: `null`. Rectangles that touch give a rectangle of width or height 0.

Kit: `intersectRects(a: Rect, b: Rect): null | Rect` in `kit/geometry/intersect-rects.ts`.

Sources: [E]

## transformRect

Formula: transform the four corners, then rectFromPoints

Example: `transformRect(rotationMatrix(45), {x:0,y:0,width:10,height:10})` gives `{'x':-7.071067812,'y':0,'width':14.142135624,'height':14.142135624}`.

Pitfall: After a rotation the result is larger than the shape: it is the box of the rotated box.

Kit: `transformRect(m: Matrix, rect: Rect): Rect` in `kit/geometry/transform-rect.ts`.

Sources: [S6]

## rectEdgePointToward

Formula: d = target - centre; scale = min(halfWidth / |d.x|, halfHeight / |d.y|); point = centre + d * scale

Example: `rectEdgePointToward({x:0,y:0,width:40,height:20},{x:100,y:10})` gives `{'x':40,'y':10}`.

Pitfall: Target on the centre: throws `RangeError`. Use it to start a connecting line on the border of a symbol.

Kit: `rectEdgePointToward(rect: Rect, target: Point): Point` in `kit/geometry/rect-edge-point-toward.ts`.

Sources: [E]

## Sources

- [S2] W3C, 2026, "Coordinate Systems, Transformations and Units", <https://www.w3.org/TR/SVG2/coords.html>.
- [S6] W3C, 2025, "Geometry Interfaces Module Level 1", <https://www.w3.org/TR/geometry-1/>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
