---
id: polygons
title: "SVG geometry: polygons"
topic: geometry
summary: "Signed area, centroid, point inside, direction of the vertices and convexity of a polygon."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S19]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: polygons

Contents: polygonSignedArea · polygonCentroid · isPointInPolygon · isPolygonClockwiseOnScreen · isPolygonConvex · Sources

A polygon is a list of points; the last point joins the first. The tests use two polygons: `square` is (0, 0), (4, 0), (4, 4), (0, 4); `lShape` is (0, 0), (4, 0), (4, 2), (2, 2), (2, 4), (0, 4).

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## polygonSignedArea

Formula: 1/2 * sum(x_i*y_(i+1) - x_(i+1)*y_i)

Example: `polygonSignedArea(square)` gives `16`.

Pitfall: With y down, a positive area means the points turn clockwise on screen (the reverse of the usual maths rule). Wrong for a polygon that crosses itself.

Kit: `polygonSignedArea(points: readonly Point[]): number` in `kit/geometry/polygon-signed-area.ts`.

Sources: [S19]

## polygonCentroid

Formula: cx = 1/(6A) * sum((x_i + x_(i+1)) * cross_i); cy = 1/(6A) * sum((y_i + y_(i+1)) * cross_i), with cross_i = x_i*y_(i+1) - x_(i+1)*y_i and A the signed area

Example: `polygonCentroid(square)` gives `{'x':2,'y':2}`.

Pitfall: Area 0: throws `RangeError`. It is not the mean of the points, and it can be outside a concave polygon.

Kit: `polygonCentroid(points: readonly Point[]): Point` in `kit/geometry/polygon-centroid.ts`.

Sources: [S19]

## isPointInPolygon

Formula: cast a ray to the right; count the edges it crosses; odd = inside

Example: `isPointInPolygon({x:1,y:1}, lShape)` gives `true`.

Pitfall: A point exactly on an edge or on a vertex has no defined answer: test it apart with distancePointToSegment.

Kit: `isPointInPolygon(point: Point, polygon: readonly Point[]): boolean` in `kit/geometry/is-point-in-polygon.ts`.

Sources: [S19]

## isPolygonClockwiseOnScreen

Formula: polygonSignedArea(points) > 0

Example: `isPolygonClockwiseOnScreen(square)` gives `true`.

Pitfall: True for (0,0), (4,0), (4,4), (0,4): right, then down, then left.

Kit: `isPolygonClockwiseOnScreen(points: readonly Point[]): boolean` in `kit/geometry/is-polygon-clockwise-on-screen.ts`.

Sources: [S19]

## isPolygonConvex

Formula: the cross product of each pair of consecutive edges has the same sign

Example: `isPolygonConvex(square)` gives `true`.

Pitfall: Three points in a line give a cross product of 0: skip it.

Kit: `isPolygonConvex(points: readonly Point[]): boolean` in `kit/geometry/is-polygon-convex.ts`.

Sources: [S19]

## Sources

- [S19] P. Bourke, 1987-1998, "Polygons and meshes", <https://paulbourke.net/geometry/polygonmesh/>.
