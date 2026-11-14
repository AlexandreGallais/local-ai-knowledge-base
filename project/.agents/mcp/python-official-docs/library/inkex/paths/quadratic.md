---
title: "inkex.paths.quadratic"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/paths/quadratic.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.paths.quadratic

Quadratic and TepidQuadratic path commands

## class Quadratic

```python
class Quadratic(QuadraticMixin, AbsolutePathCommand)
```

Absolute Quadratic Curved Line segment

## Quadratic.x2

```python
def x2(self) -> float
```

x coordinate of the (absolute) control point

## Quadratic.y2

```python
def y2(self) -> float
```

y coordinate of the (absolute) control point

## Quadratic.x3

```python
def x3(self) -> float
```

x coordinate of the (absolute) end point

## Quadratic.y3

```python
def y3(self) -> float
```

y coordinate of the (absolute) end point

## class quadratic

```python
class quadratic(QuadraticMixin, RelativePathCommand): # pylint: disable=invalid-name """Relative quadratic line segment""" letter = "q" nargs = 4 arg1: complex """The (relative) control point""" arg2: complex """The (relative) end point""" @property def dx2(self) -> float
```

x coordinate of the (relative) control point

## quadratic.dx2

```python
def dx2(self) -> float
```

x coordinate of the (relative) control point

## quadratic.dy2

```python
def dy2(self) -> float
```

y coordinate of the (relative) control point

## quadratic.dx3

```python
def dx3(self) -> float
```

x coordinate of the (relative) end point

## quadratic.dy3

```python
def dy3(self) -> float
```

y coordinate of the (relative) end point

## class TepidQuadratic

```python
class TepidQuadratic(QuadraticMixin, AbsolutePathCommand)
```

Continued Quadratic Line segment

## TepidQuadratic.x3

```python
def x3(self) -> float
```

x coordinate of the (absolute) end point

## TepidQuadratic.y3

```python
def y3(self) -> float
```

y coordinate of the (absolute) end point

## TepidQuadratic.to_quadratic

```python
def to_quadratic(self, prev: ComplexLike, prev_prev: ComplexLike) -> Quadratic
```

Convert this continued quadratic into a full quadratic

## class tepidQuadratic

```python
class tepidQuadratic(QuadraticMixin, RelativePathCommand): # pylint: disable=invalid-name """Relative continued quadratic line segment""" letter = "t" nargs = 2 arg1: complex """The (relative) control point""" @property def dx3(self) -> float
```

x coordinate of the (relative) end point

## tepidQuadratic.dx3

```python
def dx3(self) -> float
```

x coordinate of the (relative) end point

## tepidQuadratic.dy3

```python
def dy3(self) -> float
```

y coordinate of the (relative) end point
