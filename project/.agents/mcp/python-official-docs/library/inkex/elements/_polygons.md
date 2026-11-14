---
title: "inkex.elements._polygons"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/elements/_polygons.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.elements._polygons

Interface for all shapes/polygons such as lines, paths, rectangles, circles etc.

## class PathElementBase

```python
class PathElementBase(ShapeElement)
```

Base element for path based shapes

## PathElementBase.get_path

```python
def get_path(self) -> Path
```

Gets the path of the element, which can also be used in a context manager

## PathElementBase.set_path

```python
def set_path(self, path)
```

Set the given data as a path as the 'd' attribute

## PathElementBase.apply_transform

```python
def apply_transform(self)
```

Apply the internal transformation to this node and delete

## PathElementBase.original_path

```python
def original_path(self)
```

Returns the original path if this is a LPE, or the path if not

## class PathElement

```python
class PathElement(PathElementBase)
```

Provide a useful extension for path elements

## PathElement.arc_from_3_points

```python
def arc_from_3_points(cls, x: complex, y: complex, z: complex, arctype="slice",) -> PathElement
```

Create an arc through the points x, y, z.
If those points are specified clockwise, the order is not preserved.
This is indicated with the second return value (=clockwise)

Returns a PathElement. May be a line if x,y,z are collinear.

Idea: http://www.math.okstate.edu/~wrightd/INDRA/MobiusonCircles/node4.html

> *Added in version 1.4.*

## PathElement.star

```python
def star(cls, center, radii, sides=5, rounded=0, args=(0, 0), flatsided=False, pathonly=False,)
```

Generate a sodipodi star / polygon. Also computes the path that Inkscape uses
under the hood. The arguments for center, radii, sides, rounded and args can be
given as strings or as numeric data.

> *Added in version 1.1.*

Args:
center (Tuple-like): Coordinates of the star/polygon center as tuple or
Vector2d
radii (tuple): Radii of the control points, i.e. their distances from the
center. The control points are specified in polar coordinates. Only the
first control point is used for polygons.
sides (int, optional): Number of sides / tips of the polygon / star.
Defaults to 5.
rounded (int, optional): Controls the rounding radius of the polygon / star.
For `rounded=0`, only straight lines are used. Defaults to 0.
args (tuple, optional): Angle between horizontal axis and control points.
Defaults to (0,0).

> *Added in version 1.2.*
> Previously fixed to (0.85, 1.3)

flatsided (bool, optional): True for polygons, False for stars.
Defaults to False.

> *Added in version 1.2.*

pathonly (bool, optional): Whether to create the path without
Inkscape-specific attributes. Defaults to False.

> *Added in version 1.2.*

Returns:
PathElement : the created star/polygon

## class Polyline

```python
class Polyline(ShapeElement)
```

Like a path, but made up of straight line segments only

## class Polygon

```python
class Polygon(Polyline)
```

A closed polyline

## class Line

```python
class Line(ShapeElement)
```

A line segment connecting two points

## class RectangleBase

```python
class RectangleBase(ShapeElement)
```

Provide a useful extension for rectangle elements

## RectangleBase.get_path

```python
def get_path(self) -> Path
```

Calculate the path as the box around the rect

## class Rectangle

```python
class Rectangle(RectangleBase)
```

Provide a useful extension for rectangle elements

## class EllipseBase

```python
class EllipseBase(ShapeElement)
```

Absorbs common part of Circle and Ellipse classes

## EllipseBase.get_path

```python
def get_path(self) -> Path
```

Calculate the arc path of this circle

## EllipseBase.center

```python
def center(self)
```

Return center of circle/ellipse

## class Circle

```python
class Circle(EllipseBase)
```

Provide a useful extension for circle elements

## Circle.radius

```python
def radius(self) -> float
```

Return radius of circle

## class Ellipse

```python
class Ellipse(EllipseBase)
```

Provide a similar extension to the Circle interface for ellipses

## Ellipse.radius

```python
def radius(self) -> ImmutableVector2d
```

Return radii of ellipse
