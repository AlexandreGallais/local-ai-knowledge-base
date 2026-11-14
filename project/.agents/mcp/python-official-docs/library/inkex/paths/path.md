# inkex.paths.path

Path and CubicSuperPath classes

## class InvalidPath

```python
class InvalidPath(ValueError)
```

Raised when given an invalid path string

## class Path

```python
class Path(list)
```

A list of segment commands which combine to draw a shape

## class Path.PathCommandProxy

```python
class PathCommandProxy
```

A handy class for Path traverse and coordinate access

Reduces number of arguments in user code compared to bare
:class:`PathCommand` methods

## PathCommandProxy.first_point

```python
def first_point(self) -> Vector2d
```

First point of the current subpath

## PathCommandProxy.previous_end_point

```python
def previous_end_point(self) -> Vector2d
```

End point of the previous command

## PathCommandProxy.prev2_control_point

```python
def prev2_control_point(self) -> Vector2d
```

Last control point of the previous command

## PathCommandProxy.name

```python
def name(self) -> str
```

The full name of the segment (i.e. Line, Arc, etc)

## PathCommandProxy.letter

```python
def letter(self) -> str
```

The single letter representation of this command (i.e. L, A, etc)

## PathCommandProxy.next_command

```python
def next_command(self)
```

The implicit next command.

## PathCommandProxy.is_relative

```python
def is_relative(self) -> bool
```

Whether the command is defined in relative coordinates, i.e. relative to
the previous endpoint (lower case path command letter)

## PathCommandProxy.is_absolute

```python
def is_absolute(self) -> bool
```

Whether the command is defined in absolute coordinates (upper case path
command letter)

## PathCommandProxy.args

```python
def args(self) -> List[float]
```

Returns path command arguments as tuple of floats

## PathCommandProxy.control_points

```python
def control_points(self) -> List[Vector2d]
```

Returns list of path command control points

## PathCommandProxy.end_point

```python
def end_point(self) -> Vector2d
```

Returns last control point of path command

## PathCommandProxy.cend_point

```python
def cend_point(self) -> complex
```

Returns last control point of path command (in complex form)

## PathCommandProxy.reverse

```python
def reverse(self) -> PathCommand
```

Reverse path command

## PathCommandProxy.to_curve

```python
def to_curve(self) -> Curve
```

Convert command to :py:class:`Curve`
Curve().to_curve() returns a copy

## PathCommandProxy.to_curves

```python
def to_curves(self) -> List[Curve]
```

Convert command to list of :py:class:`Curve` commands

## PathCommandProxy.to_absolute

```python
def to_absolute(self) -> AbsolutePathCommand
```

Return relative counterpart for relative commands or copy for absolute

## PathCommandProxy.to_non_shorthand

```python
def to_non_shorthand(self) -> AbsolutePathCommand
```

Returns an absolute non-shorthand command

.. versionadded:: 1.4

## PathCommandProxy.split

```python
def split(self, time) -> Tuple[Path.PathCommandProxy, Path.PathCommandProxy]
```

Split this path command into two PathCommandProxy segments.
Raises ValueError for Move commands.

.. versionadded:: 1.4

## PathCommandProxy.cpoint

```python
def cpoint(self, time) -> complex
```

Returns the coordinates of the Bezier curve evaluated at t as complex number.

.. versionadded:: 1.4

## PathCommandProxy.point

```python
def point(self, time) -> Vector2d
```

Returns the coordinates of the Bezier curve evaluated at t as :class:`Vector2d`.

.. versionadded:: 1.4

## PathCommandProxy.length

```python
def length(self, t0=0, t1=1, settings=LengthSettings()) -> float
```

Get the length of the command between t0 and t1 in user units

.. versionadded:: 1.4

## PathCommandProxy.ilength

```python
def ilength(self, length, settings=ILengthSettings()) -> float
```

Tries to compute the time t at which the path segment has the given
length along its trajectory

.. versionadded:: 1.4

## PathCommandProxy.cunit_tangent

```python
def cunit_tangent(self, t) -> complex
```

Returns the unit tangent at t as complex number

.. versionadded:: 1.4

## PathCommandProxy.unit_tangent

```python
def unit_tangent(self, t) -> Vector2d
```

Returns the unit tangent at t as :class:`inkex.Vector2D`

.. versionadded::  1.4

## Path.parse_string

```python
def parse_string(cls, path_d)
```

Parse a path string and generate segment objects

## Path.bounding_box

```python
def bounding_box(self) -> Optional[BoundingBox]
```

Return bounding box of the Path

## Path.append

```python
def append(self, cmd)
```

Append a command to this path.

## Path.translate

```python
def translate(self, x, y, inplace=False): # pylint: disable=invalid-name """Move all coords in this path by the given amount""" return self.transform(Transform(translate=(x, y)), inplace=inplace) def scale(self, x, y, inplace=False): # pylint: disable=invalid-name """Scale all coords in this path by the given amounts""" return self.transform(Transform(scale=(x, y)), inplace=inplace) def rotate(self, deg, center=None, inplace=False)
```

Rotate the path around the given point

## Path.scale

```python
def scale(self, x, y, inplace=False): # pylint: disable=invalid-name """Scale all coords in this path by the given amounts""" return self.transform(Transform(scale=(x, y)), inplace=inplace) def rotate(self, deg, center=None, inplace=False)
```

Rotate the path around the given point

## Path.rotate

```python
def rotate(self, deg, center=None, inplace=False)
```

Rotate the path around the given point

## Path.control_points

```python
def control_points(self) -> Iterator[Vector2d]
```

Returns all control points of the Path

## Path.cend_points

```python
def cend_points(self) -> Iterator[complex]
```

Complex version of end_points

## Path.end_points

```python
def end_points(self) -> Iterator[Vector2d]
```

Returns all endpoints of all path commands (i.e. the nodes)

## Path.transform

```python
def transform(self, transform, inplace=False)
```

Convert to new path

## Path.reverse

```python
def reverse(self)
```

Returns a reversed path

## Path.break_apart

```python
def break_apart(self) -> List[Path]
```

Breaks apart a path into its subpaths

.. versionadded:: 1.3

## Path.close

```python
def close(self)
```

Attempt to close the last path segment

## Path.proxy_iterator

```python
def proxy_iterator(self) -> Iterator[PathCommandProxy]
```

Yields :py:class:`AugmentedPathIterator`

:rtype: Iterator[ Path.PathCommandProxy ]

## Path.subpath_iterator

```python
def subpath_iterator(self)
```

Yield Path for each subpath.

## Path.to_absolute

```python
def to_absolute(self)
```

Convert this path to use only absolute coordinates

## Path.to_non_shorthand

```python
def to_non_shorthand(self) -> Path
```

Convert this path to use only absolute non-shorthand coordinates

.. versionadded:: 1.1

## Path.to_relative

```python
def to_relative(self)
```

Convert this path to use only relative coordinates

## Path.to_arrays

```python
def to_arrays(self)
```

Returns path in format of parsePath output, returning arrays of absolute
command data

.. deprecated:: 1.0
    This is compatibility function for older API. Should not be used in new code

## Path.to_superpath

```python
def to_superpath(self)
```

Convert this path into a cubic super path

## Path.copy

```python
def copy(self)
```

Make a copy

## class CubicSuperPath

```python
class CubicSuperPath(list)
```

A conversion of a path into a predictable list of cubic curves which
can be operated on as a list of simplified instructions.

When converting back into a path, all lines, arcs etc will be converted
to curve instructions.

Structure is held as [SubPath[(point_a, bezier, point_b), ...], ...]

## CubicSuperPath.append_node_with_handles

```python
def append_node_with_handles(self, command: List[Tuple[float, float]])
```

First item: left handle, second item: node coords,
third item: right handle

## CubicSuperPath.append_path_command

```python
def append_path_command(self, command: PathCommand)
```

Append a path command.

For ordinary commands:

* old last entry -> [[.., ..], [.., ..], [x1, y1]]
* new last entry -> [[x2, y2], [x3, y3], [x3, y3]]

The last tuple is duplicated (retracted handle): either it's the last command
of the subpath, then the handle will stay retracted, or it will be replaced
with the next path command.

## CubicSuperPath.append

```python
def append(self, item)
```

Append a segment/node to the superpath and update the internal state.

item may be specified in any of the following formats:

* ``PathCommand``
* ``[str, List[float]]`` - A path command letter and its arguments
* ``[[float, float], [float, float], [float, float]]`` - Incoming handle, node,
   outgoing handle.
* ``List[[float, float], [float, float], [float, float]]`` - An entire subpath.

## CubicSuperPath.to_path

```python
def to_path(self, curves_only=False, rtol=1e-5, atol=1e-8)
```

Convert the super path back to an svg path

Arguments: see :func:`to_segments` for parameters

## CubicSuperPath.to_segments

```python
def to_segments(self, curves_only=False, rtol=1e-5, atol=1e-8)
```

Generate a set of segments for this cubic super path

Arguments:
    curves_only (bool, optional): If False, curves that can be represented
        by Lineto / ZoneClose commands, will be. Defaults to False.
    rtol (float, optional): relative tolerance, passed to :func:`is_line` and
        :func:`inkex.transforms.ImmutableVector2d.is_close` for checking if a
        line can be replaced by a ZoneClose command. Defaults to 1e-5.

        .. versionadded:: 1.2
    atol: absolute tolerance, passed to :func:`is_line` and
        :func:`inkex.transforms.ImmutableVector2d.is_close`. Defaults to 1e-8.

        .. versionadded:: 1.2

## CubicSuperPath.transform

```python
def transform(self, transform)
```

Apply a transformation matrix to this super path

## CubicSuperPath.is_on

```python
def is_on(pt_a, pt_b, pt_c, tol=1e-8)
```

Checks if point pt_a is on the line between points pt_b and pt_c

.. versionadded:: 1.2

## CubicSuperPath.collinear

```python
def collinear(pt_a, pt_b, pt_c, tol=1e-8)
```

Checks if points pt_a, pt_b, pt_c lie on the same line,
i.e. that the cross product (b-a) x (c-a) < tol

.. versionadded:: 1.2

## CubicSuperPath.within

```python
def within(val_b, val_a, val_c)
```

Checks if float val_b is between val_a and val_c

.. versionadded:: 1.2

## CubicSuperPath.is_line

```python
def is_line(previous, segment, rtol=1e-5, atol=1e-8)
```

Check whether csp segment (two points) can be expressed as a line has
retracted handles or the handles can be retracted without loss of information
(i.e. both handles lie on the line)

.. versionchanged:: 1.2
    Previously, it was only checked if both control points have retracted
    handles. Now it is also checked if the handles can be retracted without
    (visible) loss of information (i.e. both handles lie on the line connecting
    the nodes).

Arguments:
    previous: first node in superpath notation
    segment: second node in superpath notation
    rtol (float, optional): relative tolerance, passed to
        :func:`inkex.transforms.ImmutableVector2d.is_close` for checking handle
        retraction. Defaults to 1e-5.

        .. versionadded:: 1.2
    atol (float, optional): absolute tolerance, passed to
        :func:`inkex.transforms.ImmutableVector2d.is_close` for checking handle
        retraction and
        :func:`inkex.paths.CubicSuperPath.is_on` for checking if all points
        (nodes + handles) lie on a line. Defaults to 1e-8.

        .. versionadded:: 1.2