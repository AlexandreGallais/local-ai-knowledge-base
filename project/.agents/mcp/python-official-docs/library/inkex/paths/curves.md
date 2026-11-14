# inkex.paths.curves

Curve and Smooth Path Commands

## class CurveMixin

```python
class CurveMixin(BezierComputationMixin, BezierArcComputationMixin)
```

Common functionality for curves

## CurveMixin.ccurve_points

```python
def ccurve_points(self, first: complex, prev: complex, prev_prev: complex) -> Tuple[complex, ...]
```

Common implementation of ccurve_points for Curves

## CurveMixin.poly

```python
def poly(self, prev, prev_control, return_coeffs=False)
```

Returns a the cubic as a complex Polynomial object.

.. versionadded:: 1.4

## class Curve

```python
class Curve(CurveMixin, AbsolutePathCommand)
```

Absolute Curved Line segment

## Curve.x2

```python
def x2(self) -> float
```

x coordinate of the (absolute) first control point

## Curve.y2

```python
def y2(self) -> float
```

y coordinate of the (absolute) first control point

## Curve.x3

```python
def x3(self) -> float
```

x coordinate of the (absolute) second control point

## Curve.y3

```python
def y3(self) -> float
```

y coordinate of the (absolute) second control point

## Curve.x4

```python
def x4(self) -> float
```

x coordinate of the (absolute) end point

## Curve.y4

```python
def y4(self) -> float
```

y coordinate of the (absolute) end point

## Curve.to_bez

```python
def to_bez(self)
```

Convert to [[c1x, c1y], [c2x, c2y], [end_x, end_y]]

## class curve

```python
class curve(CurveMixin, RelativePathCommand): # pylint: disable=invalid-name """Relative curved line segment""" letter = "c" nargs = 6 arg1: complex """The (relative) first control point""" arg2: complex """The (relative) second control point""" arg3: complex """The (relative) end point""" @property def dx2(self) -> float
```

x coordinate of the (relative) first control point

## curve.dx2

```python
def dx2(self) -> float
```

x coordinate of the (relative) first control point

## curve.dy2

```python
def dy2(self) -> float
```

y coordinate of the (relative) first control point

## curve.dx3

```python
def dx3(self) -> float
```

x coordinate of the (relative) second control point

## curve.dy3

```python
def dy3(self) -> float
```

y coordinate of the (relative) second control point

## curve.dx4

```python
def dx4(self) -> float
```

x coordinate of the (relative) end point

## curve.dy4

```python
def dy4(self) -> float
```

y coordinate of the (relative) end point

## class Smooth

```python
class Smooth(CurveMixin, AbsolutePathCommand)
```

Absolute Smoothed Curved Line segment

## Smooth.x3

```python
def x3(self) -> float
```

x coordinate of the (absolute) control point

## Smooth.y3

```python
def y3(self) -> float
```

y coordinate of the (absolute) control point

## Smooth.x4

```python
def x4(self) -> float
```

x coordinate of the (absolute) end point

## Smooth.y4

```python
def y4(self) -> float
```

y coordinate of the (absolute) end point

## class smooth

```python
class smooth(CurveMixin, RelativePathCommand): # pylint: disable=invalid-name """Relative smoothed curved line segment""" letter = "s" nargs = 4 arg1: complex """The (absolute) control point""" arg2: complex """The (absolute) end point""" @property def dx3(self) -> float
```

x coordinate of the (relative) control point

## smooth.dx3

```python
def dx3(self) -> float
```

x coordinate of the (relative) control point

## smooth.dy3

```python
def dy3(self) -> float
```

y coordinate of the (relative) control point

## smooth.dx4

```python
def dx4(self) -> float
```

x coordinate of the (relative) end point

## smooth.dy4

```python
def dy4(self) -> float
```

y coordinate of the (relative) end point