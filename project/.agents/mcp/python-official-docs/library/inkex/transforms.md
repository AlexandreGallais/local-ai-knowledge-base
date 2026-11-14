---
title: "inkex.transforms"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/transforms.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.transforms

Provide transformation parsing to extensions

## class ImmutableVector2d

```python
class ImmutableVector2d
```

Represents an immutable element of 2-dimensional Euclidean space

## ImmutableVector2d.to_tuple

```python
def to_tuple(self) -> Tuple[float, float]
```

A tuple of the vector's components

## ImmutableVector2d.to_polar_tuple

```python
def to_polar_tuple(self) -> Tuple[float, Optional[float]]
```

A tuple of the vector's magnitude and direction

> *Added in version 1.1.*

## ImmutableVector2d.dot

```python
def dot(self, other: VectorLike) -> float
```

Multiply Vectors component-wise

## ImmutableVector2d.cross

```python
def cross(self, other: VectorLike) -> float
```

Z component of the cross product of the vectors extended into 3D

> *Added in version 1.1.*

## ImmutableVector2d.is_close

```python
def is_close(self, other: Union[VectorLike, str, Tuple[float, float]], rtol: float = 1e-5, atol: float = 1e-8,) -> float
```

Checks if two vectors are (almost) identical, up to both absolute and
relative tolerance.

## ImmutableVector2d.length

```python
def length(self) -> float
```

Returns the length of the vector

## ImmutableVector2d.angle

```python
def angle(self) -> Optional[float]
```

The angle of the vector when represented in polar coordinates

> *Added in version 1.1.*

## ImmutableVector2d.from_polar

```python
def from_polar(radius: float, theta: Optional[float] = None) -> Optional[Vector2d]
```

Creates a Vector2d from polar coordinates

None is returned when theta is None and radius is not zero.

> *Added in version 1.1.*

## ImmutableVector2d.c2t

```python
def c2t(c: complex) -> List[float]
```

Complex to tuple

## ImmutableVector2d.t2c

```python
def t2c(tup: Tuple[float, float]) -> complex
```

Tuple to complex

## class Vector2d

```python
class Vector2d(ImmutableVector2d)
```

Represents an element of 2-dimensional Euclidean space

## Vector2d.assign

```python
def assign(self, *args)
```

Assigns a different vector in place

## class Transform

```python
class Transform
```

A transformation object which will always reduce to a matrix and can
then be used in combination with other transformations for reducing
finding a point and printing svg ready output.

Use with svg transform attribute input:

tr = Transform("scale(45, 32)")

Use with triad matrix input (internal representation):

tr = Transform(((1.0, 0.0, 0.0), (0.0, 1.0, 0.0)))

Use with hexad matrix input (i.e. svg matrix(...)):

tr = Transform((1.0, 0.0, 0.0, 1.0, 0.0, 0.0))

Once you have a transformation you can operate tr * tr to compose,
any of the above inputs are also valid operators for composing.

> *Changed in version 1.4.*
> Internally, the values are stored as complex values. For the hexad
> `(a, c, e), (b, d, f)` we store:
>
>
> a_1 &= \frac{a+d}{2} + j \frac{b-c}{2} \
> a_2 &= \frac{a-d}{2} + j \frac{b+c}{2} \
> a_3 &= e + f j
>
> This makes application to another vector a multiplication / addition on
> primitives: a_1p + a_2 \bar{p} + a_3
>
> As with paths, this performance benefit is best reaped by using the methods
> prefixed with "c", such as `capply_to_point()` (which is also what
> `inkex.paths.Path.transform()` uses internally).

## Transform.matrix

```python
def matrix(self) -> Tuple[Tuple[float, float, float], Tuple[float, float, float]]
```

Get the matrix of the transform.

## Transform.add_matrix

```python
def add_matrix(self, a: MatrixLike) -> Transform: ... @overload def add_matrix(# pylint: disable=too-many-arguments self, a: float, b: float, c: float, d: float, e: float, f: float) -> Transform: ... @overload def add_matrix(self, a: Tuple[float, float, float], b: Tuple[float, float, float]) -> Transform: ... def add_matrix(self, *args)
```

Add matrix in order they appear in the svg hexad

## Transform.add_matrix

```python
def add_matrix(# pylint: disable=too-many-arguments self, a: float, b: float, c: float, d: float, e: float, f: float) -> Transform: ... @overload def add_matrix(self, a: Tuple[float, float, float], b: Tuple[float, float, float]) -> Transform: ... def add_matrix(self, *args)
```

Add matrix in order they appear in the svg hexad

## Transform.add_matrix

```python
def add_matrix(self, a: Tuple[float, float, float], b: Tuple[float, float, float]) -> Transform: ... def add_matrix(self, *args)
```

Add matrix in order they appear in the svg hexad

## Transform.add_matrix

```python
def add_matrix(self, *args)
```

Add matrix in order they appear in the svg hexad

## Transform.add_kwargs

```python
def add_kwargs(self, **kwargs)
```

Add translations, scales, rotations etc using key word arguments

## Transform.add_translate

```python
def add_translate(self, dr: VectorLike) -> Transform: ... @overload def add_translate(self, tr_x: float, tr_y: float = 0.0) -> Transform: ... def add_translate(self, *args)
```

Add translate to this transformation

## Transform.add_translate

```python
def add_translate(self, tr_x: float, tr_y: float = 0.0) -> Transform: ... def add_translate(self, *args)
```

Add translate to this transformation

## Transform.add_translate

```python
def add_translate(self, *args)
```

Add translate to this transformation

## Transform.add_scale

```python
def add_scale(self, sc_x: float, sc_y: Optional[float] = None) -> Transform
```

Add scale to this transformation

## Transform.add_rotate

```python
def add_rotate(self, deg: float, center: VectorLike): ... @overload def add_rotate(self, deg: float, center_x: float, center_y: float): ... @overload def add_rotate(self, deg: float) -> Transform: ... @overload def add_rotate(self, deg: float, a: Union[VectorLike, str]) -> Transform: ... @overload def add_rotate(self, deg: float, a: float, b: float) -> Transform: ... def add_rotate(self, deg, *args)
```

Add rotation to this transformation

## Transform.add_rotate

```python
def add_rotate(self, deg: float, center_x: float, center_y: float): ... @overload def add_rotate(self, deg: float) -> Transform: ... @overload def add_rotate(self, deg: float, a: Union[VectorLike, str]) -> Transform: ... @overload def add_rotate(self, deg: float, a: float, b: float) -> Transform: ... def add_rotate(self, deg, *args)
```

Add rotation to this transformation

## Transform.add_rotate

```python
def add_rotate(self, deg: float) -> Transform: ... @overload def add_rotate(self, deg: float, a: Union[VectorLike, str]) -> Transform: ... @overload def add_rotate(self, deg: float, a: float, b: float) -> Transform: ... def add_rotate(self, deg, *args)
```

Add rotation to this transformation

## Transform.add_rotate

```python
def add_rotate(self, deg: float, a: Union[VectorLike, str]) -> Transform: ... @overload def add_rotate(self, deg: float, a: float, b: float) -> Transform: ... def add_rotate(self, deg, *args)
```

Add rotation to this transformation

## Transform.add_rotate

```python
def add_rotate(self, deg: float, a: float, b: float) -> Transform: ... def add_rotate(self, deg, *args)
```

Add rotation to this transformation

## Transform.add_rotate

```python
def add_rotate(self, deg, *args)
```

Add rotation to this transformation

## Transform.add_skewx

```python
def add_skewx(self, deg: float) -> Transform
```

Add skew x to this transformation, and return it

## Transform.add_skewy

```python
def add_skewy(self, deg: float) -> Transform
```

Add skew y to this transformation, and return it

## Transform.to_hexad

```python
def to_hexad(self) -> Tuple[float, float, float, float, float, float]
```

Returns the transform as a hexad matrix (used in svg)

## Transform.is_translate

```python
def is_translate(self, exactly: bool = False) -> bool
```

Returns True if this transformation is ONLY translate

## Transform.capply_to_point

```python
def capply_to_point(self, point: complex) -> complex
```

Transform a tuple (X, Y), return a complex

> *Added in version 1.4.*

## Transform.apply_to_point

```python
def apply_to_point(self, point: VectorLike) -> Vector2d
```

Transform a vector (X, Y)

## BoundingBox.new_xywh

```python
def new_xywh(x: float, y: float, width: float, height: float) -> BoundingBox
```

Create a bounding box using x, y, width and height

> *Added in version 1.2.*

## BoundingBox.area

```python
def area(self)
```

Return area of the bounding box

> *Added in version 1.2.*

## BoundingBox.size

```python
def size(self)
```

Returns a vector containing width and height of the bounding box

> *Added in version 1.2.*

## BoundingBox.anchor_distance

```python
def anchor_distance(x: float, y: float, direction: Union[int, str] = 0, selbox: Optional[BoundingBox] = None,) -> float
```

Using the x,y returns a single sortable value based on direction and angle

Args:
x (float): input x coordinate
y (float): input y coordinate
direction (Union[int, str], optional): int/float (custom angle),
tb/bt (top/bottom), lr/rl (left/right), ri/ro (radial). Defaults to 0.
selbox (Optional[BoundingBox], optional): The bounding box of the whole
selection for radial anchors. Defaults to None.

Raises:
ValueError: if radial distance is requested without the optional selbox
parameter.

Returns:
float: the anchor distance with respect to the direction.

## BoundingBox.resize

```python
def resize(self, delta_x: float, delta_y: Optional[float] = None) -> BoundingBox
```

Enlarges / shrinks a bounding box by a constant value. If only delta_x
is given, each side is moved by the same amount; if delta_y is given,
different deltas are applied to horizontal and vertical intervals.

> *Added in version 1.2.*

## class DirectedLineSegment

```python
class DirectedLineSegment
```

A directed line segment

DirectedLineSegment(((x0, y0), (x1, y1)))
