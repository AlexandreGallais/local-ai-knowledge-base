---
title: "CanvasRenderingContext2D: arcTo() method (part 1 of 5)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/arcto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: arcTo() method

The **`CanvasRenderingContext2D.arcTo()`** method of the Canvas 2D API adds a circular arc to the current sub-path, using the given control points and radius.
The arc is automatically connected to the path's latest point with a straight line if necessary, for example if the starting point and control points are in a line.

This method is commonly used for making rounded corners.

> **Note:**
> You may get unexpected results when using a
> relatively large radius: the arc's connecting line will go in whatever direction it
> must to meet the specified radius.

## Syntax

```js
arcTo(x1, y1, x2, y2, radius)
```

### Parameters

- `x1`
    The x-axis coordinate of the first control point.
- `y1`
    The y-axis coordinate of the first control point.
- `x2`
    The x-axis coordinate of the second control point.
- `y2`
    The y-axis coordinate of the second control point.
- `radius`
    The arc's radius. Must be non-negative.

#### Usage notes

Assume P0 is the point on the path when `arcTo()` is called, P1 = (`x1`, `y1`) and P2 = (`x2`, `y2`) are the first and second control points, respectively, and _r_ is the `radius` specified in the call:

- If _r_ is negative, an `IndexSizeError` exception is raised.
- If _r_ is 0, `arcTo()` behaves as if P0, P1, and P2 are collinear (in a line).
- In the case of all of the points being collinear, a line from P0 to P1 is drawn unless the points P0 and P1 are coincident (having the same coordinates), in which case nothing is drawn.

These conditions can be created in the Constructing an arcTo() path example below to see the results.

### Return value

None (`undefined`).

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if `radius` is a negative value.
