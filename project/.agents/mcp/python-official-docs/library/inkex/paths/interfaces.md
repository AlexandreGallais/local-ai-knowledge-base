---
title: "inkex.paths.interfaces"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/paths/interfaces.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.paths.interfaces

Interfaces for path commands

## class LengthSettings

```python
class LengthSettings
```

Settings for `PathCommand.length()`

> *Added in version .*

## class ILengthSettings

```python
class ILengthSettings
```

Settings for `PathCommand.ilength()`

> *Added in version 1.4.*

## class PathCommand

```python
class PathCommand(abc.ABC)
```

Base class of all path commands

## PathCommand.name

```python
def name(cls): # pylint: disable=no-self-argument """The full name of the segment (i.e. Line, Arc, etc)""" return cls.__name__ # pylint: disable=no-member @classproperty def next_command(self)
```

The implicit next command. This is for automatic chains where the next
command isn't given, just a bunch on numbers which we automatically parse.

## PathCommand.next_command

```python
def next_command(self)
```

The implicit next command. This is for automatic chains where the next
command isn't given, just a bunch on numbers which we automatically parse.

## PathCommand.is_relative

```python
def is_relative(self) -> bool
```

Whether the command is defined in relative coordinates, i.e. relative to
the previous endpoint (lower case path command letter)

## PathCommand.is_absolute

```python
def is_absolute(self) -> bool
```

Whether the command is defined in absolute coordinates (upper case path
command letter)

## PathCommand.to_relative

```python
def to_relative(self, prev: ComplexLike) -> RelativePathCommand
```

Return absolute counterpart for absolute commands or copy for relative

## PathCommand.to_absolute

```python
def to_absolute(self, prev: ComplexLike) -> AbsolutePathCommand
```

Return relative counterpart for relative commands or copy for absolute

## PathCommand.reverse

```python
def reverse(self, first: ComplexLike, prev: ComplexLike) -> PathCommand
```

Reverse path command

> *Added in version 1.1.*

## PathCommand.to_non_shorthand

```python
def to_non_shorthand(self, prev: ComplexLike, prev_control: ComplexLike, # pylint: disable=unused-argument) -> AbsolutePathCommand
```

Return an absolute non-shorthand command

> *Added in version 1.1.*

## PathCommand.letter_to_class

```python
def letter_to_class(letter)
```

Returns class for given path command letter

## PathCommand.args

```python
def args(self) -> List[float]
```

Returns path command arguments as tuple of floats

## PathCommand.control_points

```python
def control_points(self, first: ComplexLike, prev: ComplexLike, prev_prev: ComplexLike,) -> Generator[Vector2d, None, None]
```

Returns list of path command control points

## PathCommand.ccontrol_points

```python
def ccontrol_points(self, first: complex, prev: complex, prev_prev: complex) -> Tuple[complex, ...]
```

Returns list of path command control points

## PathCommand.cend_point

```python
def cend_point(self, first: complex, prev: complex) -> complex
```

Complex version of end_point

## PathCommand.end_point

```python
def end_point(self, first: ComplexLike, prev: ComplexLike) -> Vector2d
```

Returns last control point of path command

## PathCommand.update_bounding_box

```python
def update_bounding_box(self, first: complex, last_two_points: List[complex], bbox: BoundingBox)
```

Enlarges given bbox to contain path element.

Args:
first (complex): first point of path. Required to calculate Z segment
last_two_points (List[complex]): list with last two control points in abs
coords.
bbox (BoundingBox): bounding box to update

## PathCommand.to_curves

```python
def to_curves(self, prev: ComplexLike, prev_prev: ComplexLike = 0) -> List[Curve]
```

Convert command to list of `Curve` commands

## PathCommand.cderivative

```python
def cderivative(self, first: complex, prev: complex, prev_control: complex, t: Optional[float] = None, n: int = 1,) -> complex
```

Returns the nth derivative of the segment at t as a complex number.

> *Added in version 1.4.*

## PathCommand.derivative

```python
def derivative(self, first: ComplexLike, prev: ComplexLike, prev_control: ComplexLike, t: Optional[float] = None, n: int = 1,) -> Vector2d
```

Returns the nth derivative of the segment at t as a `Vector2D`.

> *Added in version 1.4.*

## PathCommand.cunit_tangent

```python
def cunit_tangent(self, first: complex, prev: complex, prev_control: complex, t: Optional[float] = None,) -> complex
```

Returns the unit tangent of the segment at t as a complex number.

## PathCommand.unit_tangent

```python
def unit_tangent(self, first: ComplexLike, prev: ComplexLike, prev_control: ComplexLike, t: Optional[float] = None,) -> Vector2d
```

Returns the unit tangent of the segment at t as a `Vector2D`.

## PathCommand.cnormal

```python
def cnormal(self, first: complex, prev: complex, prev_control: complex, t: Optional[float] = None,) -> complex
```

Returns the (right-hand-rule) normal vector of the segment at t as a complex
number.

## PathCommand.normal

```python
def normal(self, first: ComplexLike, prev: ComplexLike, prev_control: ComplexLike, t: Optional[float] = None,) -> Vector2d
```

Returns the (right-hand-rule) normal vector of the segment at t as
`Vector2D`.

## PathCommand.curvature

```python
def curvature(self, first: ComplexLike, prev: ComplexLike, prev_control: ComplexLike, t: Optional[float] = None,) -> float
```

Returns the curvature of the segment at t.

## PathCommand.cpoint

```python
def cpoint(self, first: complex, prev: complex, prev_control: complex, t: float) -> complex
```

Returns the coordinates of the Bezier curve evaluated at t as complex number.

> *Added in version 1..*

## PathCommand.point

```python
def point(self, first: ComplexLike, prev: ComplexLike, prev_control: ComplexLike, t: float) -> Vector2d
```

Returns the coordinates of the Bezier curve evaluated at t as `Vector2d`.

> *Added in version 1.4.*

## PathCommand.split

```python
def split(self, first: ComplexLike, prev: ComplexLike, prev_control: ComplexLike, t: float) -> Tuple[PathCommand, PathCommand]
```

Returns two segments, whose union is this segment and which join at
self.point(t).

> *Added in version 1.4.*

## PathCommand.length

```python
def length(self, first: ComplexLike, prev: ComplexLike, prev_control: ComplexLike, t0: float = 0, t1: float = 1, settings=LengthSettings(),) -> float
```

Returns the length of the segment between t0 and t1.

> *Added in version 1.4.*

## PathCommand.ilength

```python
def ilength(self, first: ComplexLike, prev: ComplexLike, prev_control: ComplexLike, length: float, settings: ILengthSettings = ILengthSettings(),)
```

Returns a float `t`, such that `self.length(0, t)` is approximately
`length`.

> *Added in version 1.4.*

## class RelativePathCommand

```python
class RelativePathCommand(PathCommand)
```

Abstract base class for relative path commands.

Implements most of methods of `PathCommand` through
conversion to `AbsolutePathCommand`

## class AbsolutePathCommand

```python
class AbsolutePathCommand(PathCommand)
```

Absolute path command. Unlike `RelativePathCommand` can be transformed
directly.

## AbsolutePathCommand.transform

```python
def transform(self, transform: Transform) -> AbsolutePathCommand
```

Returns new transformed segment

- **param `transform`:** a transformation to apply

## AbsolutePathCommand.rotate

```python
def rotate(self, degrees: float, center: Vector2d) -> AbsolutePathCommand
```

Returns new transformed segment

- **param `degrees`:** rotation angle in degrees
- **param `center`:** invariant point of rotation

## AbsolutePathCommand.translate

```python
def translate(self, dr: Vector2d) -> AbsolutePathCommand
```

Translate or scale this path command by dr

## AbsolutePathCommand.scale

```python
def scale(self, factor: Union[float, Tuple[float, float]]) -> AbsolutePathCommand
```

Returns new transformed segment

- **param `factor`:** scale or (scale_x, scale_y)

## class BezierArcComputationMixin

```python
class BezierArcComputationMixin
```

Functionality that works the same way for Arcs, Cubic and Quadratic

> *Added in version 1.4.*

## BezierArcComputationMixin.inv_arclength

```python
def inv_arclength(self, prev, prev_control, s, settings=ILengthSettings())
```

Ported from https://github.com/mathandy/svgpathtools/blob/19df25b99b405ec4fc7616b58384eca7879b6fd4/svgpathtools/path.py#L541
(MIT Licensed)

## BezierArcComputationMixin.segment_length

```python
def segment_length(self, start, end, start_point, end_point, pos_eval, settings=LengthSettings(), depth=0,)
```

Ported from https://github.com/mathandy/svgpathtools/blob/19df25b99b405ec4fc7616b58384eca7879b6fd4/svgpathtools/path.py#L479
(MIT licensed)
#### TODO better treatment of degenerate beziers from
#### https://github.com/linebender/kurbo/blob/c229a914d303c5989c9e6b1d766def2df27a8185/src/cubicbez.rs#L431

## BezierArcComputationMixin.segment_curvature

```python
def segment_curvature(self, prev: complex, prev_prev: complex, t: float)
```

Returns the curvature of the segment at t.

Ported from https://github.com/mathandy/svgpathtools/blob/19df25b99b405ec4fc7616b58384eca7879b6fd4/svgpathtools/path.py#L386
(MIT licensed)

## class BezierComputationMixin

```python
class BezierComputationMixin
```

Functionality that works the same for all Beziers (Quadratic, Cubic)

> *Added in version 1.4.*

## BezierComputationMixin.bezier_unit_tangent

```python
def bezier_unit_tangent(self, prev, prev_prev, t)
```

Returns the unit tangent of the segment at t.

Ported from https://github.com/mathandy/svgpathtools/blob/19df25b99b405ec4fc7616b58384eca7879b6fd4/svgpathtools/path.py#L348
(MIT licensed)
