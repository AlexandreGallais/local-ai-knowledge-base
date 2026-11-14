# inkex.paths.lines

Line-like path commands (Line, Horz, Vert, ZoneClose and their relative siblings)

## class LineMixin

```python
class LineMixin
```

Common Line functions

## LineMixin.ccurve_points

```python
def ccurve_points(self, first: complex, prev: complex, prev_prev: complex)
```

Common implementation of ccurve_points for Lines

## LineMixin.ccontrol_points

```python
def ccontrol_points(self, first: complex, prev: complex, prev_prev: complex, # pylint: disable=unused-argument) -> Tuple[complex, ...]
```

Common implementation of ccontrol_points for Lines

## class Line

```python
class Line(LineMixin, AbsolutePathCommand)
```

Line segment

## Line.x

```python
def x(self)
```

x coordinate of the line's (absolute) end point.

## Line.y

```python
def y(self)
```

y coordinate of the line's (absolute) end point.

## class line

```python
class line(LineMixin, RelativePathCommand): # pylint: disable=invalid-name """Relative line segment""" letter = "l" nargs = 2 arg1: complex """The (relative) end points of the line.""" @property def dx(self)
```

x coordinate of the line's (relative) end point.

## line.dx

```python
def dx(self)
```

x coordinate of the line's (relative) end point.

## line.dy

```python
def dy(self)
```

y coordinate of the line's (relative) end point.

## class MoveMixin

```python
class MoveMixin
```

Disable derivative / length method for Move command.

## class Move

```python
class Move(MoveMixin, AbsolutePathCommand)
```

Move pen segment without a line

## Move.x

```python
def x(self)
```

x coordinate of the Moves's (absolute) end point.

## Move.y

```python
def y(self)
```

y coordinate of the Move's (absolute) end point.

## class move

```python
class move(MoveMixin, RelativePathCommand): # pylint: disable=invalid-name """Relative move segment""" letter = "m" nargs = 2 next_command = line @property def dx(self)
```

x coordinate of the moves's (relative) end point.

## move.dx

```python
def dx(self)
```

x coordinate of the moves's (relative) end point.

## move.dy

```python
def dy(self)
```

y coordinate of the move's (relative) end point.

## class ZoneClose

```python
class ZoneClose(LineMixin, AbsolutePathCommand)
```

Close segment to finish a path

## class Horz

```python
class Horz(LineMixin, AbsolutePathCommand)
```

Horizontal Line segment

## class Vert

```python
class Vert(LineMixin, AbsolutePathCommand)
```

Vertical Line segment