---
title: "inkex.elements._meta"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/elements/_meta.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.elements._meta

Provide extra utility to each svg element type specific to its type.

This is useful for having a common interface for each element which can
give path, transform, and property access easily.

## class Defs

```python
class Defs(BaseElement)
```

A header defs element, one per document

## class StyleElement

```python
class StyleElement(BaseElement)
```

A CSS style element containing multiple style definitions

## StyleElement.set_text

```python
def set_text(self, content)
```

Sets the style content text as a CDATA section

## StyleElement.stylesheet

```python
def stylesheet(self)
```

Return the StyleSheet() object for the style tag

## class Script

```python
class Script(BaseElement)
```

A javascript tag in SVG

## Script.set_text

```python
def set_text(self, content)
```

Sets the style content text as a CDATA section

## class Desc

```python
class Desc(BaseElement)
```

Description element

## class Title

```python
class Title(BaseElement)
```

Title element

## class NamedView

```python
class NamedView(BaseElement)
```

The NamedView element is Inkscape specific metadata about the file

## NamedView.center

```python
def center(self)
```

Returns view_center in terms of document units

## NamedView.get_guides

```python
def get_guides(self)
```

Returns a list of guides

## NamedView.add_guide

```python
def add_guide(self, position, orient=True, name=None) -> Guide
```

Creates a new guide in this namedview

> *Added in version 1.3.*

Args:
position: a float containing the y position for `orient is True`, or
the x position for `orient is False`. The position is specified in the
post-1.0 coordinate system, i.e. y=0 is at the top left of the viewbox,
positive y axis pointing down.

Alternatively, the position may be given as Tuple (or VectorLike)
orient: True for horizontal, False for Vertical

alternatively: Tuple / Vector specifying x and y coordinates of the
normal vector of the guide, or the (clockwise) angle between the
horizontal axis and the guide. Defaults to True (horizontal)
name: label of the guide

Returns:
the created guide

## NamedView.new_guide

```python
def new_guide(self, position, orient=True, name=None)
```

> *Deprecated since version 1.3.*
> Use `add_guide()` instead.

Creates a new guide in this namedview

Args:
position: a float containing the y position for `orient is True`, or
the x position for `orient is False`

> *Changed in version 1.2.*
> Alternatively, the position may be given as Tuple (or VectorLike)

orient: True for horizontal, False for Vertical

> *Changed in version 1.2.*
> Tuple / Vector specifying x and y coordinates of the normal vector
> of the guide.

name: label of the guide

Returns:
the created guide

## NamedView.new_unique_guide

```python
def new_unique_guide(self, position: Vector2d, orientation: Vector2d) -> Optional[Guide]
```

> *Deprecated since version 1.3.*
> Use `add_unique_guide()` instead.

Add a guide iif there is no guide that looks the same.

> *Added in version 1.2.*

## NamedView.add_unique_guide

```python
def add_unique_guide(self, position: Vector2d, orientation: Vector2d) -> Optional[Guide]
```

Add a guide iif there is no guide that looks the same.

> *Added in version 1.3.*

Args:
position: Position as Tuple / Vector
orientation: Tuple / Vector specifying x and y coordinates of the normal
vector of the guide.
name: label of the guide

## NamedView.get_similar_guide

```python
def get_similar_guide(self, other: Guide) -> Optional[Guide]
```

Check if the namedview contains a guide that looks identical to one
defined by (position, orientation) and is not identity (same element) as the
first one. If such a guide exists, return it; otherwise, return None.

> *Added in version 1.2.*

## NamedView.get_pages

```python
def get_pages(self) -> List[Page]
```

Returns a list of pages within the document. For single page documents,
a detached page element with dimensions according to the viewbox will be
returned.

> *Added in version 1.2.*

> *Changed in version 1.3.*
> For single-page documents, this function now returns the viewbox
> dimensions.

## NamedView.new_page

```python
def new_page(self, x, y, width, height, label=None)
```

Creates a new page in this namedview. Always add pages through this
function to ensure that single-page documents are treated correctly.

> *Added in version 1.2.*

> *Changed in version 1.3.*
> If none exists, a page element with the viewbox dimensions will be
> inserted before the new page.

## class Guide

```python
class Guide(BaseElement)
```

An inkscape guide

## Guide.orientation

```python
def orientation(self) -> Vector2d
```

Vector normal to the guide, in the pre-1.0 coordinate system (y axis upwards)

> *Added in version 1.2.*

## Guide.angle

```python
def angle(self) -> float
```

(Clockwise) angle between the guide and the horizontal axis in degrees
(i.e. what Inkscape 1.2+ shows as "Angle" in the guide properties)

> *Added in version 1.3.*

## Guide.raw_position

```python
def raw_position(self) -> Vector2d
```

Position of the guide handle.

The y coordinate is flipped and relative to the bottom of the
viewbox, this is a remnant of the pre-1.0 coordinate system

## Guide.point

```python
def point(self)
```

Use raw_position or position instead

## Guide.position

```python
def position(self) -> Vector2d
```

Position of the guide handle in normal coordinates.

This means (0,0) is at the top left corner of the viewbox,
positive y axis pointing downwards.

This function can only be used for guides which are attached to a root
svg element.

## Guide.set_position

```python
def set_position(self, pos_x, pos_y, angle=None)
```

Move this guide to the given x,y position and optionally set its orientation.

The coordinate system used is the post-1.0 coordinate system (origin in the
top left corner, y axis pointing down), which also defines the sense of
rotation.

The guide must be rooted for this function to be used. Preferably, use
`inkex.elements._meta.add_guide()` to create a new guide.

> *Added in version 1.3.*

Args:
pos_x (Union[str, int, float]): x position of the guide's reference point
pos_y (Union[str, int, float]): y position of the guide's reference point
angle (Union[str, float, int, tuple, list], optional): Angle may be a
string, float or integer, which will set the clockwise angle between the
horizontal axis and the guide.

Alternatively, it may be a pair of numbers (tuple) which will be set
as normal vector.

If not given at all, the orientation remains unchanged.
Defaults to None.

Returns:
Guide: the modified guide

## Guide.move_to

```python
def move_to(self, pos_x, pos_y, angle=None)
```

> *Deprecated since version 1.3.*
> Use `set_position()` instead.

Move this guide to the given x,y position,

Angle may be a float or integer, which will change the orientation. Alternately,
it may be a pair of numbers (tuple) which will set the orientation directly.
If not given at all, the orientation remains unchanged.

## Guide.guides_coincident

```python
def guides_coincident(guide1, guide2)
```

Check if two guides defined by (position, orientation) and (opos, oor) look
identical.

Returns:
True if the position lies on the other guide AND the guide is
(anti)parallel to the other guide.

> *Added in version 1.2.*

## class Metadata

```python
class Metadata(BaseElement)
```

Resource Description Framework (RDF) metadata

## class ForeignObject

```python
class ForeignObject(BaseElement)
```

SVG foreignObject element

## class Switch

```python
class Switch(BaseElement)
```

A switch element

## class Grid

```python
class Grid(BaseElement)
```

A namedview grid child

## class Page

```python
class Page(BaseElement)
```

A namedview page child

> *Added in version 1.2.*

## Page.new

```python
def new(cls, width, height, x, y)
```

Creates a new page element in the namedview

## Page.move_to

```python
def move_to(self, x, y)
```

Move this page to the given x,y position

## Page.bounding_box

```python
def bounding_box(self) -> BoundingBox
```

Returns the bounding box of the page.
