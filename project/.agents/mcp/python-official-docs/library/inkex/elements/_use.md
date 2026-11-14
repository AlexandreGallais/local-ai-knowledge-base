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

.. versionchanged:: 1.3
    include transform of the referenced element

## Use.get_path

```python
def get_path(self)
```

Returns the path of the cloned href plus any transformation

.. versionchanged:: 1.3
    include transform of the referenced element

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

.. versionadded:: 1.1