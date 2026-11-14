---
title: "inkex.elements._groups"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/elements/_groups.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.elements._groups

Interface for all group based elements such as Groups, Use, Markers etc.

## class GroupBase

```python
class GroupBase(ShapeElement)
```

Base Group element

## GroupBase.bake_transforms_recursively

```python
def bake_transforms_recursively(self, apply_to_paths=True)
```

Bake transforms, i.e. each leaf node has the effective transform (starting
from this group) set, and parent transforms are removed.

> *Added in version 1.4.*

Args:
apply_to_paths (bool, optional): For path elements, the
path data is transformed with its effective transform. Nodes and handles
will have the same position as before, but visual appearance of the
stroke may change (stroke-width is not touched). Defaults to True.

## class Group

```python
class Group(GroupBase)
```

Any group element (layer or regular group)

## Group.effective_style

```python
def effective_style(self)
```

A blend of each child's style mixed together (last child wins)

## Group.groupmode

```python
def groupmode(self)
```

Return the type of group this is

## class Layer

```python
class Layer(Group)
```

Inkscape extension of svg:g

## class Anchor

```python
class Anchor(GroupBase)
```

An anchor or link tag

## class ClipPath

```python
class ClipPath(GroupBase)
```

A path used to clip objects

## class Marker

```python
class Marker(GroupBase, ViewboxMixin)
```

The <marker> element defines the graphic that is to be used for drawing
arrowheads or polymarkers on a given , <line>, <polyline> or <polygon>
element.

## Marker.get_viewbox

```python
def get_viewbox(self) -> List[float]
```

Returns the viewbox of the Marker, falling back to
[0 0 markerWidth markerHeight]

> *Added in version 1.3.*
