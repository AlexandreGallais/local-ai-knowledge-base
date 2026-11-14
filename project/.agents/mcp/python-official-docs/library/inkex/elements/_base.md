---
title: "inkex.elements._base"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/elements/_base.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.elements._base

Provide extra utility to each svg element type specific to its type.

This is useful for having a common interface for each element which can
give path, transform, and property access easily.

## class BaseElement

```python
class BaseElement(IBaseElement)
```

Provide automatic namespaces to all calls

## BaseElement.is_class_element

```python
def is_class_element(# pylint: disable=unused-argument cls, elem: etree.Element) -> bool
```

Hook to do more restrictive check in addition to (ns,tag) match

> *Added in version 1.2.*
> The function has been made public.

## BaseElement.new

```python
def new(cls, *children, **attrs)
```

Create a new element, converting attrs values to strings.

## BaseElement.wrapped_attrs

```python
def wrapped_attrs(self)
```

Map attributes to property name and wrapper class

## BaseElement.wrapped_props

```python
def wrapped_props(self)
```

Map properties to attribute name and wrapper class

## BaseElement.get

```python
def get(self, attr, default=None)
```

Get element attribute named, with addNS support.

## BaseElement.set

```python
def set(self, attr, value)
```

Set element attribute named, with addNS support

## BaseElement.update

```python
def update(self, **kwargs)
```

Update element attributes using keyword arguments

Note: double underscore is used as namespace separator,
i.e. "namespace__attr" argument name will be treated as "namespace:attr"

- **param `kwargs`:** dict with name=value pairs
- **return:** self

## BaseElement.pop

```python
def pop(self, attr, default=None)
```

Delete/remove the element attribute named, with addNS support.

## BaseElement.add

```python
def add(self, child1: BaseElement, child2: BaseElement, *children: BaseElement) -> Tuple[BaseElement]: ... @overload def add(self, child: T) -> T: ... def add(self, *children)
```

Like append, but will do multiple children and will return
children or only child

## BaseElement.add

```python
def add(self, child: T) -> T: ... def add(self, *children)
```

Like append, but will do multiple children and will return
children or only child

## BaseElement.add

```python
def add(self, *children)
```

Like append, but will do multiple children and will return
children or only child

## BaseElement.tostring

```python
def tostring(self)
```

Return this element as it would appear in an svg document

## BaseElement.set_random_id

```python
def set_random_id(self, prefix: Optional[str] = None, size: Optional[int] = None, backlinks: bool = False, blacklist: Optional[List[str]] = None,)
```

Sets the id attribute if it is not already set.

The id consists of a prefix and an appended random integer of length size.

Args:
prefix (str, optional): the prefix of the new ID. Defaults to the tag name.
size (Optional[int], optional): number of digits of the second part of the
id. If None, the length is chosen based on the amount of existing
objects. Defaults to None.

> *Changed in version 1.2.*
> The default of this value has been changed from 4 to None.

backlinks (bool, optional): Whether to update the links in existing objects
that reference this element. Defaults to False.
blacklist (List[str], optional): An additional list of ids that are not
allowed to be used. This is useful when bulk inserting objects.
Defaults to None.

> *Added in version 1.2.*

## BaseElement.set_random_ids

```python
def set_random_ids(self, prefix: Optional[str] = None, levels: int = -1, backlinks: bool = False, blacklist: Optional[List[str]] = None,)
```

Same as set_random_id, but will apply also to children

The id consists of a prefix and an appended random integer of length size.

Args:
prefix (str, optional): the prefix of the new ID. Defaults to the tag name.
levels (int, optional): the depth of the tree traversion, if negative, no
limit is imposed. Defaults to -1.
backlinks (bool, optional): Whether to update the links in existing objects
that reference this element. Defaults to False.
blacklist (List[str], optional): An additional list of ids that are not
allowed to be used. This is useful when bulk inserting objects.
Defaults to None.

> *Added in version 1.2.*

## BaseElement.get_id

```python
def get_id(self, as_url=0) -> str
```

Get the id for the element, will set a new unique id if not set.

as_url - If set to 1, returns #{id} as a string
If set to 2, returns url(#{id}) as a string

Args:
as_url (int, optional):
- If set to 1, returns #{id} as a string
- If set to 2, returns url(#{id}) as a string.

Defaults to 0.

> *Added in version 1.1.*

Returns:
str: formatted id

## BaseElement.set_id

```python
def set_id(self, new_id, backlinks=False)
```

Set the id and update backlinks to xlink and style urls if needed

## BaseElement.root

```python
def root(self) -> ISVGDocumentElement
```

Get the root document element from any element descendent

## BaseElement.get_or_create

```python
def get_or_create(self, xpath, nodeclass=None, prepend=False)
```

Get or create the given xpath, pre/append new node if not found.

> *Changed in version 1.1.*
> The `nodeclass` attribute is optional; if not given, it is looked up
> using `find_class()`

## BaseElement.descendants

```python
def descendants(self)
```

Walks the element tree and yields all elements, parent first

> *Changed in version 1.1.*
> The `*types` attribute was removed

## BaseElement.ancestors

```python
def ancestors(self, elem=None, stop_at=())
```

Walk the parents and yield all the ancestor elements, parent first

Args:
elem (BaseElement, optional): If provided, it will stop at the last common
ancestor. Defaults to None.

> *Added in version 1.1.*

stop_at (tuple, optional): If provided, it will stop at the first parent
that is in this list. Defaults to ().

> *Added in version 1.1.*

Returns:
ElementList: list of ancestors

## BaseElement.backlinks

```python
def backlinks(self, *types)
```

Get elements which link back to this element, like ancestors but via
xlinks

## BaseElement.xpath

```python
def xpath(self, pattern, namespaces=NSS): # pylint: disable=dangerous-default-value """Wrap xpath call and add svg namespaces""" return super().xpath(pattern, namespaces=namespaces) def findall(self, pattern, namespaces=NSS): # pylint: disable=dangerous-default-value """Wrap findall call and add svg namespaces""" return super().findall(pattern, namespaces=namespaces) def findone(self, xpath)
```

Gets a single element from the given xpath or returns None

## BaseElement.findall

```python
def findall(self, pattern, namespaces=NSS): # pylint: disable=dangerous-default-value """Wrap findall call and add svg namespaces""" return super().findall(pattern, namespaces=namespaces) def findone(self, xpath)
```

Gets a single element from the given xpath or returns None

## BaseElement.findone

```python
def findone(self, xpath)
```

Gets a single element from the given xpath or returns None

## BaseElement.delete

```python
def delete(self)
```

Delete this node from it's parent node

## BaseElement.remove_all

```python
def remove_all(self, *types)
```

Remove all children or child types

> *Added in version 1.1.*

## BaseElement.replace_with

```python
def replace_with(self, elem)
```

Replace this element with the given element

## BaseElement.copy

```python
def copy(self)
```

Make a copy of the element and return it

## BaseElement.duplicate

```python
def duplicate(self)
```

Like copy(), but the copy stays in the tree and sets a random id on the
duplicate.

> *Changed in version 1.2.*
> A random id is also set on all the duplicate's descendants

## BaseElement.href

```python
def href(self)
```

Returns the referred-to element if available

> *Changed in version 1.1.*
> A setter for href was added.

## BaseElement.href

```python
def href(self, elem)
```

Set the href object

## BaseElement.label

```python
def label(self)
```

Returns the inkscape label

## BaseElement.label

```python
def label(self, value)
```

Sets the inkscape label

## BaseElement.is_sensitive

```python
def is_sensitive(self)
```

Return true if this element is sensitive in Inkscape

> *Added in version 1.1.*

## BaseElement.set_sensitive

```python
def set_sensitive(self, sensitive=True)
```

Set the sensitivity of the element/layer

> *Added in version 1.1.*

## BaseElement.unit

```python
def unit(self)
```

Return the unit being used by the owning document, cached

> *Added in version 1.1.*

## BaseElement.to_dimensional

```python
def to_dimensional(value, to_unit="px")
```

Convert a value given in user units (px) the given unit type

> *Added in version 1.2.*

## BaseElement.to_dimensionless

```python
def to_dimensionless(value)
```

Convert a length value into user units (px)

> *Added in version 1.2.*

## BaseElement.uutounit

```python
def uutounit(self, value, to_unit="px")
```

Convert a unit value to a given unit. If the value does not have a unit,
"Document" units are assumed. "Document units" are an Inkscape-specific concept.
For most use-cases, `to_dimensional()` is more appropriate.

> *Added in version 1.1.*

## BaseElement.unittouu

```python
def unittouu(self, value)
```

Convert a unit value into document units. "Document unit" is an
Inkscape-specific concept. For most use-cases, `viewport_to_unit()` (when
the size of an object given in viewport units is needed) or
`to_dimensionless()` (when the equivalent value without unit is needed) is
more appropriate.

> *Added in version 1.1.*

## BaseElement.unit_to_viewport

```python
def unit_to_viewport(self, value, unit="px")
```

Converts a length value to viewport units, as defined by the width/height
element on the root (i.e. applies the equivalent transform of the viewport)

> *Added in version 1.2.*

## BaseElement.viewport_to_unit

```python
def viewport_to_unit(self, value, unit="px")
```

Converts a length given on the viewport to the specified unit in the user
coordinate system

> *Added in version 1.2.*

## BaseElement.add_unit

```python
def add_unit(self, value)
```

Add document unit when no unit is specified in the string.

> *Added in version 1.1.*

## BaseElement.cascaded_style

```python
def cascaded_style(self)
```

Returns the cascaded style of an element (all rules that apply the element
itself), based on the stylesheets, the presentation attributes and the inline
style using the respective specificity of the style.

see https://www.w3.org/TR/CSS22/cascade.html#cascading-order

> *Added in version 1.2.*

Returns:
Style: the cascaded style

## BaseElement.specified_style

```python
def specified_style(self)
```

Returns the specified style of an element, i.e. the cascaded style +
inheritance, see https://www.w3.org/TR/CSS22/cascade.html#specified-value.

Returns:
Style: the specified style

> *Added in version 1.2.*

## BaseElement.get_computed_style

```python
def get_computed_style(self, key)
```

Returns the computed style value with respect to an element, i.e. the
cascaded style + inheritance, see
https://www.w3.org/TR/CSS22/cascade.html#computed-value.

This is more efficient if only few style values per element are queried. If
many attributes are queried, use `specified_style()`.

> *Added in version 1.4.*

## BaseElement.presentation_style

```python
def presentation_style(self)
```

Return presentation attributes of an element as style

> *Added in version 1.2.*

## BaseElement.composed_transform

```python
def composed_transform(self, other=None)
```

Calculate every transform down to the other element
if none specified the transform is to the root document element

## class ShapeElement

```python
class ShapeElement(BaseElement)
```

Elements which have a visible representation on the canvas

## ShapeElement.path

```python
def path(self) -> Path
```

Gets the outline or path of the element, this may be a simple bounding box

## ShapeElement.clip

```python
def clip(self)
```

Gets the clip path element (if any). May be set through CSS.

> *Added in version 1.1.*

## ShapeElement.get_path

```python
def get_path(self) -> Path
```

Generate a path for this object which can inform the bounding box

## ShapeElement.set_path

```python
def set_path(self, path)
```

Set the path for this object (if possible)

## ShapeElement.to_path_element

```python
def to_path_element(self)
```

Replace this element with a path element

## ShapeElement.effective_style

```python
def effective_style(self)
```

Without parent styles, what is the effective style is

## ShapeElement.is_visible

```python
def is_visible(self)
```

Returns false if this object is invisible

> *Changed in version 1.3.*
> rely on cascaded_style() to include CSS and presentation attributes
> include `visibility` attribute with check for inherit
> include ancestors

> *Added in version 1.1.*

## ShapeElement.get_line_height_uu

```python
def get_line_height_uu(self)
```

Returns the specified value of line-height, in user units

> *Added in version 1.1.*

## class ViewboxMixin

```python
class ViewboxMixin
```

Mixin for elements with viewboxes, such as , <marker>

## ViewboxMixin.parse_viewbox

```python
def parse_viewbox(self, vbox: Optional[str]) -> Optional[List[float]]
```

Parses a viewbox. If an error occurs during parsing,
(0, 0, 0, 0) is returned. If the viewbox is None, None is returned.

> *Added in version 1.3.*
