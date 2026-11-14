---
title: "inkex.elements._selected"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/elements/_selected.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.elements._selected

When elements are selected, these structures provide an advanced API.

> *Added in version 1.1.*

## class ElementList

```python
class ElementList(OrderedDict)
```

A list of elements, selected by id, iterator or xpath

This may look like a dictionary, but it is really a list of elements.
The default iterator is the element objects themselves (not keys) and it is
possible to key <example-value> by their numerical index.

It is also possible to look up items by their id and the element object itself.

## ElementList.clear

```python
def clear(self)
```

Also clear ids

## ElementList.set

```python
def set(self, *ids)
```

Sets the currently selected elements to these ids, any existing
selection is cleared.

Arguments a list of element ids, element objects or
a single xpath expression starting with `//`.

All element objects must have an id to be correctly set.

```python
selection.set("rect123", "path456", "text789")
selection.set(elem1, elem2, elem3)
selection.set("//rect")
```

## ElementList.pop

```python
def pop(self, key=None)
```

Remove the key item or remove the last item selected

## ElementList.add

```python
def add(self, *ids)
```

Like set() but does not clear first

## ElementList.rendering_order

```python
def rendering_order(self)
```

Get the selected elements by z-order (stacking order), ordered from bottom to
top

> *Added in version 1.2.*
> `paint_order()` has been renamed to `rendering_order()`

## ElementList.filter

```python
def filter(self, *types)
```

Filter selected elements of the given type, returns a new SelectedElements
object

## ElementList.filter_nonzero

```python
def filter_nonzero(self, *types, error_msg: Optional[str] = None)
```

Filter selected elements of the given type, returns a new SelectedElements
object. If the selection is empty, abort the extension.

> *Added in version 1.2.*

- **param `error_msg`:** e
- **type `error_msg`:** str, optional

Args:
*types (Type) : type(s) to filter the selection by
error_msg (str, optional): error message that is displayed if the selection
is empty, defaults to
`_("Please select at least one element of type(s) {}")`.
Defaults to None.

Raises:
AbortExtension: if the selection is empty

Returns:
ElementList: filtered selection

## ElementList.get

```python
def get(self, *types)
```

Like filter, but will enter each element searching for any child of the given
types

## ElementList.id_dict

```python
def id_dict(self)
```

For compatibility, return regular dictionary of id -> element pairs

## ElementList.bounding_box

```python
def bounding_box(self)
```

Gets a `inkex.transforms.BoundingBox` object for the
selected items.

Text objects have a bounding box without width or height that only
reflects the coordinate of their anchor. If a text object is a part of
the selection's boundary, the bounding box may be inaccurate.

When no object is selected or when the object's location cannot be
determined (e.g. empty group or layer), all coordinates will be None.

## ElementList.first

```python
def first(self)
```

Returns the first item in the selected list
