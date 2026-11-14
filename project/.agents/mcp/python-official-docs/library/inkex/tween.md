---
title: "inkex.tween"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/tween.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.tween

Module for interpolating attributes and styles

> *Changed in version 1.2.*
> Rewritten in inkex 1.2 in an object-oriented structure to support more attributes.

## interpcoord

```python
def interpcoord(coord_a: Number, coord_b: Number, time: float)
```

Interpolate single coordinate by the amount of time

## class AttributeInterpolator

```python
class AttributeInterpolator(abc.ABC)
```

Interpolate between attributes

## AttributeInterpolator.best_style

```python
def best_style(node)
```

Gets the best possible approximation to a node's style. For nodes inside the
element tree of an SVG file, stylesheets defined in the defs of that file can be
taken into account. This should be the case for input elements, but is not
required - in that case, only the local inline style is used.

During the interpolation process, some nodes are created temporarily, such as
plain gradients of a single color to allow solid<->gradient interpolation. These
are not attached to the document tree and therefore have no root. Since the only
style relevant for them is the inline style, it is acceptable to fallback to it.

Args:
node (BaseElement): The node to get the best approximated style of

Returns:
Style: If the node is rooted, the CSS specified style. Else, the inline
style.

## AttributeInterpolator.create_from_attribute

```python
def create_from_attribute(snode, enode, attribute, method=None)
```

Creates an interpolator for an attribute. Currently, only path, transform and
style attributes are supported

Args:
snode (BaseElement): start element
enode (BaseElement): end element
attribute (str): attribute name (for styles, starting with "style/")
method (AttributeInterpolator, optional): (currently only used for paths).
Specifies a method used to interpolate the attribute. Defaults to None.

Raises:
ValueError: if an attribute is passed that is not a style, path or transform
attribute

Returns:
AttributeInterpolator: an interpolator whose type depends on attribute.

## AttributeInterpolator.interpolate

```python
def interpolate(self, time=0)
```

Interpolation method, needs to be implemented by subclasses

## class StyleInterpolator

```python
class StyleInterpolator(AttributeInterpolator)
```

Class to interpolate styles

## StyleInterpolator.create

```python
def create(snode, enode, attribute)
```

Creates an Interpolator for a given style attribute, depending on its type:

- Color properties (such as fill, stroke) -> `ColorInterpolator`,
`GradientInterpolator` ect.
- Unit properties -> `UnitValueInterpolator`
- other properties -> `ValueInterpolator`

Args:
snode (BaseElement): start element
enode (BaseElement): end element
attribute (str): attribute to interpolate

Raises:
ValueError: if the attribute is not in any of the lists

Returns:
AttributeInterpolator: an interpolator object whose type depends on the
attribute.

## StyleInterpolator.create_from_fill_stroke

```python
def create_from_fill_stroke(snode, enode, attribute)
```

Creates an Interpolator for a given color-like attribute

Args:
snode (BaseElement): start element
enode (BaseElement): end element
attribute (str): attribute to interpolate

Raises:
ValueError: if the attribute is not color-like
ValueError: if the attribute is unset on both start and end style

Returns:
AttributeInterpolator: an interpolator object whose type depends on the
attribute.

## StyleInterpolator.interpolate

```python
def interpolate(self, time=0)
```

Interpolates a style using the interpolators set in self.interpolators

Args:
time (int, optional): Interpolation position. If 0, start_value is returned,
if 1, end_value is returned. Defaults to 0.

Returns:
inkex.Style: interpolated style

## class TrivialInterpolator

```python
class TrivialInterpolator(AttributeInterpolator)
```

Trivial interpolator, returns value for every time

## class ValueInterpolator

```python
class ValueInterpolator(AttributeInterpolator)
```

Class for interpolation of a single value

## ValueInterpolator.interpolate

```python
def interpolate(self, time=0)
```

(Linearly) interpolates a value

Args:
time (int, optional): Interpolation position. If 0, start_value is returned,
if 1, end_value is returned. Defaults to 0.

Returns:
int: interpolated value

## class UnitValueInterpolator

```python
class UnitValueInterpolator(ValueInterpolator)
```

Class for interpolation of a value with unit

## class ArrayInterpolator

```python
class ArrayInterpolator(AttributeInterpolator)
```

Interpolates array-like objects element-wise, e.g. color, transform,
coordinate

## ArrayInterpolator.interpolate

```python
def interpolate(self, time=0)
```

Interpolates an array element-wise

Args:
time (int, optional): [description]. Defaults to 0.

Returns:
List: interpolated array

## class TransformInterpolator

```python
class TransformInterpolator(ArrayInterpolator)
```

Class for interpolation of transforms

## TransformInterpolator.__init__

```python
def __init__(self, start_value=Transform(), end_value=Transform())
```

Creates a transform interpolator.

Args:
start_value (inkex.Transform, optional): start transform. Defaults to
inkex.Transform().
end_value (inkex.Transform, optional): end transform. Defaults to
inkex.Transform().

## TransformInterpolator.interpolate

```python
def interpolate(self, time=0)
```

Interpolates a transform by interpolating each item in the transform hexad
separately.

Args:
time (int, optional): Interpolation position. If 0, start_value is returned,
if 1, end_value is returned. Defaults to 0.

Returns:
Transform: interpolated transform

## class ColorInterpolator

```python
class ColorInterpolator(ArrayInterpolator)
```

Class for color interpolation

## ColorInterpolator.create

```python
def create(sst, est, attribute)
```

Creates a ColorInterpolator for either Fill or stroke, depending on the
attribute.

Args:
sst (Style): Start style
est (Style): End style
attribute (string): either fill or stroke

Raises:
ValueError: if none of the start or end style is a color.

Returns:
ColorInterpolator: A ColorInterpolator object

## ColorInterpolator.interpolate

```python
def interpolate(self, time=0)
```

Interpolates a color by interpolating its r, g, b, a channels separately.

Args:
time (int, optional): Interpolation position. If 0, start_value is returned,
if 1, end_value is returned. Defaults to 0.

Returns:
Color: interpolated color

## class GradientInterpolator

```python
class GradientInterpolator(AttributeInterpolator)
```

Base class for Gradient Interpolation

## GradientInterpolator.create

```python
def create(snode, enode, attribute)
```

Creates a `GradientInterpolator` for either fill or stroke, depending on
attribute.

Cases: (A, B) -> Interpolator

- Linear Gradient, Linear Gradient -> LinearGradientInterpolator
- Color or None, Linear Gradient -> LinearGradientInterpolator
- Radial Gradient, Radial Gradient -> RadialGradientInterpolator
- Color or None, Radial Gradient -> RadialGradientInterpolator
- Radial Gradient, Linear Gradient -> ValueError
- Color or None, Color or None -> ValueError

Args:
snode (BaseElement): start element
enode (BaseElement): end element
attribute (string): either fill or stroke

Raises:
ValueError: if none of the styles are a gradient or if they are gradients
of different types

Returns:
GradientInterpolator: an Interpolator object

## GradientInterpolator.interpolate_linear_list

```python
def interpolate_linear_list(positions, values, newpositions, func)
```

Interpolates a list of values given at n positions to the best approximation
at m newpositions.

|
|         x
|  x
_________________
pq  q  p   q
(x denotes function values, p: positions, q: newpositions)
A function may be given to interpolate between given values.

Args:
positions (list[number-like]): position of current function values
values (list[Type]): list of arbitrary type,
`len(values) == len(positions)`
newpositions (list[number-like]): position of interpolated values
func (Callable[[Type, Type, float], Type]): Function to interpolate between
values

Returns:
list[Type]: interpolated function values at positions

## GradientInterpolator.append_to_doc

```python
def append_to_doc(element, gradient)
```

Splits a gradient into stops and orientation, appends it to the document's
defs and returns the href to the orientation gradient.

Args:
element (BaseElement): an element inside the SVG that the gradient should be
added to
gradient (Gradient): the gradient to append to the document

Returns:
Gradient: the orientation gradient, or the gradient object if
element has no root or is None

## GradientInterpolator.interpolate

```python
def interpolate(self, time=0)
```

Interpolate with another gradient.

## class LinearGradientInterpolator

```python
class LinearGradientInterpolator(GradientInterpolator)
```

Class for interpolation of linear gradients

## LinearGradientInterpolator.initialize_position

```python
def initialize_position(grad, bbox)
```

Initializes a linear gradient's position

## class RadialGradientInterpolator

```python
class RadialGradientInterpolator(GradientInterpolator)
```

Class to interpolate radial gradients

## RadialGradientInterpolator.initialize_position

```python
def initialize_position(grad, bbox)
```

Initializes a radial gradient's position

## class StopInterpolator

```python
class StopInterpolator(AttributeInterpolator)
```

Class to interpolate gradient stops

## StopInterpolator.interpolate

```python
def interpolate(self, time=0)
```

Interpolates a gradient stop by interpolating style and offset separately

Args:
time (int, optional): Interpolation position. If 0, start_value is returned,
if 1, end_value is returned. Defaults to 0.

Returns:
Stop: interpolated gradient stop

## class PathInterpolator

```python
class PathInterpolator(AttributeInterpolator)
```

Base class for Path interpolation

## PathInterpolator.truncate_subpaths

```python
def truncate_subpaths(self)
```

Truncates the longer path so that all subpaths in both paths have an equal
number of bezier commands

## class EqualSubsegmentsInterpolator

```python
class EqualSubsegmentsInterpolator(PathInterpolator)
```

Interpolates the path by rediscretizing the subpaths first.

## EqualSubsegmentsInterpolator.get_subpath_lenghts

```python
def get_subpath_lenghts(path)
```

prepare lengths for interpolation

## EqualSubsegmentsInterpolator.process_path

```python
def process_path(path, other)
```

Rediscretize path so that all subpaths have an equal number of segments,
so that there is a node at the path "times" where path or other have a node

Args:
path (Path): the first path
other (Path): the second path

Returns:
Array: the prepared path description for the intermediate path

## class FirstNodesInterpolator

```python
class FirstNodesInterpolator(PathInterpolator)
```

Interpolates a path by discarding the trailing nodes of the longer subpath
