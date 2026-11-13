---
title: "Basic shapes"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/tutorials/svg_from_scratch/basic_shapes/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Basic shapes

There are several basic <example-value> used for most SVG drawing. The purpose of these shapes is fairly obvious from their names. Some of the parameters that determine their position and size are given, but an element reference would probably contain more accurate and complete descriptions along with other properties that won't be covered in here. However, since they're used in most SVG documents, it's necessary to give them some sort of introduction.

To insert a shape, you create an element in the document. Different elements correspond to different shapes and take different parameters to describe the size and position of those shapes. Some are slightly redundant in that they can be created by other shapes, but they're all there for your convenience and to keep your SVG documents as short and as readable as possible. All the basic <example-value> are shown in the following image.

The code to generate that image looks something like this:

```xml
<svg width="200" height="250" xmlns="http://www.w3.org/2000/svg">

  <rect x="10" y="10" width="30" height="30" stroke="black" fill="none" stroke-width="5"/>
  <rect x="60" y="10" rx="10" ry="10" width="30" height="30" stroke="black" fill="none" stroke-width="5"/>

  <circle cx="25" cy="75" r="20" stroke="red" fill="none" stroke-width="5"/>
  <ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="none" stroke-width="5"/>

  <line x1="10" x2="50" y1="110" y2="150" stroke="orange" stroke-width="5"/>
  <polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145"
      stroke="orange" fill="none" stroke-width="5"/>

  <polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
      stroke="green" fill="none" stroke-width="5"/>

  <path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"/>
</svg>
```

> **Note:**
> The `stroke`, `stroke-width`, and `fill` attributes are explained later in the tutorial.

## Rectangle

The `<rect>` element draws a rectangle on the screen. There are six basic <example-value> that control the position and shape of the rectangles on screen. The one on the right has its `rx` and `ry` parameters set, giving it rounded corners. If they're not set, they default to `0`.

```xml
<rect x="10" y="10" width="30" height="30"/>
<rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
```

- `x`
    The x position of the top left corner of the rectangle.
- `y`
    The y position of the top left corner of the rectangle.
- `width`
    The width of the rectangle.
- `height`
    The height of the rectangle.
- `rx`
    The x radius of the corners of the rectangle.
- `ry`
    The y radius of the corners of the rectangle.

## Circle

The `<circle>` element draws a circle on the screen. It takes three basic <example-value> to determine the shape and size of the element.

```xml
<circle cx="25" cy="75" r="20"/>
```

- `r`
    The radius of the circle.
- `cx`
    The x position of the center of the circle.
- `cy`
    The y position of the center of the circle.

## Ellipse

An `<ellipse>` is a more general form of the `<circle>` element, where you can scale the x and y radius (commonly referred to as the _semimajor_ and _semiminor_ axes in math) of the circle separately.

```xml
<ellipse cx="75" cy="75" rx="20" ry="5"/>
```

- `rx`
    The x radius of the ellipse.
- `ry`
    The y radius of the ellipse.
- `cx`
    The x position of the center of the ellipse.
- `cy`
    The y position of the center of the ellipse.

## Line

The `<line>` element takes the positions of two points as parameters and draws a straight line between them.

```xml
<line x1="10" x2="50" y1="110" y2="150" stroke="black" stroke-width="5"/>
```

- `x1`
    The x position of point 1.
- `y1`
    The y position of point 1.
- `x2`
    The x position of point 2.
- `y2`
    The y position of point 2.

## Polyline

A `<polyline>` is a group of connected straight lines. Since the list of points can get quite long, all the points are included in one attribute:

```xml
<polyline points="60, 110 65, 120 70, 115 75, 130 80, 125 85, 140 90, 135 95, 150 100, 145"/>
```

- `points`
    A list of points. Each number must be separated by a space, comma, EOL, or a line feed character with additional whitespace permitted. Each point must contain two numbers: an x coordinate and a y coordinate. So, the list `(0,0)`, `(1,1)`, and `(2,2)` could be written as `0, 0 1, 1 2, 2`.

## Polygon

A `<polygon>` is similar to a `<polyline>`, in that it is composed of straight line segments connecting a list of points. For polygons though, the path automatically connects the last point with the first, creating a closed shape.

> **Note:**
> A rectangle is a type of polygon, so a polygon can be used to create a `<rect/>` element that does not have rounded corners.

```xml
<polygon points="50, 160 55, 180 70, 180 60, 190 65, 205 50, 195 35, 205 40, 190 30, 180 45, 180"/>
```

- `points`
    A list of points, each number separated by a space, comma, EOL, or a line feed character with additional whitespace permitted. Each point must contain two numbers: an x coordinate and a y coordinate. So, the list `(0,0)`, `(1,1)`, and `(2,2)` could be written as `0, 0 1, 1 2, 2`. The drawing then closes the path, so a final straight line would be drawn from `(2,2)` to `(0,0)`.

## Path

A `` is the most general shape that can be used in SVG. Using a `path` element, you can draw rectangles (with or without rounded corners), circles, ellipses, polylines, and polygons. Basically any of the other types of shapes, bezier curves, quadratic curves, and many more.

For this reason, the next section in this tutorial will be focused on paths. But for now, note that there is a single parameter used to control its shape.

```xml
<path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"/>
```

- `d`
    A list of points and other information about how to draw the path. See the Paths section for more information.
