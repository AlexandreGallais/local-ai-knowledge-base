# inkex.deprecated.meta

Deprecation functionality which does not require imports from Inkex.

## deprecate

```python
def deprecate(func, version: Optional[str] = None)
```

Function decorator for deprecation functions which have a one-liner
equivalent in the new API. The one-liner has to passed as a string
to the decorator.

>>> @deprecate
>>> def someOldFunction(*args):
>>>     '''Example replacement code someNewFunction('foo', ...)'''
>>>     someNewFunction('foo', *args)

Or if the args API is the same:

>>> someOldFunction = deprecate(someNewFunction)

## class DeprecatedSvgMixin

```python
class DeprecatedSvgMixin
```

Mixin which adds deprecated API elements to the SvgDocumentElement

## DeprecatedSvgMixin.selected

```python
def selected(self)
```

svg.selection

## DeprecatedSvgMixin.set_selected

```python
def set_selected(self, *ids)
```

svg.selection.set(\*ids)

## DeprecatedSvgMixin.get_z_selected

```python
def get_z_selected(self)
```

svg.selection.rendering_order()

## DeprecatedSvgMixin.get_selected

```python
def get_selected(self, *types)
```

svg.selection.filter(\*types).values()

## DeprecatedSvgMixin.get_selected_or_all

```python
def get_selected_or_all(self, *types)
```

Set select_all = True in extension class

## DeprecatedSvgMixin.get_selected_bbox

```python
def get_selected_bbox(self)
```

selection.bounding_box()

## DeprecatedSvgMixin.get_first_selected

```python
def get_first_selected(self, *types)
```

selection.filter(\*types).first() or [0] if you'd like an error