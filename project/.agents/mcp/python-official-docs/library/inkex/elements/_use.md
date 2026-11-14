---
title: "inkex.elements._use"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/elements/_use.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.elements._use

Interface for the Use and Symbol elements

## class Symbol

```python
class Symbol(GroupBase)
```

SVG symbol element

## class Use

```python
class Use(ShapeElement)
```

A 'use' element that links to another in the document

## Use.new

```python
def new(cls, elem, x, y, **attrs): # pylint: disable=arguments-differ ret = super().new(x=x, y=y, **attrs) ret.href = elem return ret def get_path(self)
```

Returns the path of the cloned href plus any transformation

> *Changed in version 1.3.*
> include transform of the referenced element

## Use.get_path

```python
def get_path(self)
```

Returns the path of the cloned href plus any transformation

> *Changed in version 1.3.*
> include transform of the referenced element

## Use.effective_style

```python
def effective_style(self)
```

Href's style plus this object's own styles

## Use.unlink

```python
def unlink(self)
```

Unlink this clone, replacing it with a copy of the original

## Use.shape_box

```python
def shape_box(self, transform=None)
```

BoundingBox of the unclipped shape

> *Added in version 1.1.*
