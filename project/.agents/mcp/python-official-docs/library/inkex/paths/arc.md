# inkex.paths.arc

Arc path commands

## class Arc

```python
class Arc(BezierArcComputationMixin, AbsolutePathCommand)
```

Special Arc segment

## Arc.rx

```python
def rx(self) -> float
```

x radius of the Arc

## Arc.ry

```python
def ry(self) -> float
```

y radius of the Arc

## Arc.x

```python
def x(self) -> float
```

x coordinate of the (absolute) endpoint of the Arc

## Arc.y

```python
def y(self) -> float
```

x coordinate of the (relative) endpoint of the Arc

## Arc.cargs

```python
def cargs(self)
```

Set of arguments in complex form

## Arc.parametrize

```python
def parametrize(self, prev)
```

Return the parameterization of the arc

See http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes

Returns:
    A tuple (radius, phi, rot_matrix, center, theta1, deltatheta)

.. versionadded:: 1.4

## Arc.to_curves

```python
def to_curves(self, prev: ComplexLike, prev_prev: ComplexLike = 0j) -> List[Curve]
```

Convert this arc into bezier curves

## class arc

```python
class arc(RelativePathCommand, Arc): # pylint: disable=invalid-name """Relative Arc line segment""" letter = "a" nargs = 7 endpoint: complex """Endpoint (relative) of the arc""" @property def rx(self) -> float
```

x radius of the arc

## arc.rx

```python
def rx(self) -> float
```

x radius of the arc

## arc.ry

```python
def ry(self) -> float
```

y radius of the arc

## arc.dx

```python
def dx(self) -> float
```

x coordinate of the (relative) endpoint of the arc

## arc.dy

```python
def dy(self) -> float
```

x coordinate of the (relative) endpoint of the arc

## arc_to_path

```python
def arc_to_path(point, params)
```

Approximates an arc with cubic bezier segments.

Args:
    point:  Starting point (absolute coords)
    params: Arcs parameters as per
          https://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands

Returns:
    A list of triplets of points
    `[control_point_before, node, control_point_after]`
    (first and last returned triplets are `[p1, p1, *]` and `[*, p2, p2]`)

## matprod

```python
def matprod(mlist)
```

Get the product of the mat

## rotmat

```python
def rotmat(teta)
```

Rotate the mat

## applymat

```python
def applymat(mat, point)
```

Apply the given mat

## norm

```python
def norm(point)
```

Normalise