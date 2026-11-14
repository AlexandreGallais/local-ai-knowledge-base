# inkex.deprecated.main

Provide some documentation to existing extensions about why they're failing.

## class lazyproxy

```python
class lazyproxy
```

Proxy, use as decorator on a function with provides the wrapped object.
The decorated function is called when a member is accessed on the proxy.

## lazyproxy.__init__

```python
def __init__(self, getwrapped)
```

:param getwrapped: Callable which returns the wrapped object

## zSort

```python
def zSort(inNode, idList)
```

self.svg.get_z_selected()

## description

```python
def description(self, value)
```

Use elem.desc = value

## composed_style

```python
def composed_style(element: ShapeElement)
```

Calculate the final styles applied to this element

This function has been deprecated in favor of BaseElement.specified_style()

## paint_order

```python
def paint_order(selection: ElementList)
```

Use :func:`rendering_order`

## transform_imul

```python
def transform_imul(self, matrix)
```

Use @= operator instead

## transform_mul

```python
def transform_mul(self, matrix)
```

Use @ operator instead

## to_xpath

```python
def to_xpath(self)
```

Depending on whether you need to apply the rule to an individual element
or find all matches in a subtree, use

.. code::

    style.matches(element)
    style.all_matches(subtree)

## to_xpaths

```python
def to_xpaths(self)
```

Depending on whether you need to apply the rule to an individual element
or find all matches in a subtree, use

.. code::

    style.matches(element)
    style.all_matches(subtree)

## apply_shorthands

```python
def apply_shorthands(self)
```

Apply all shorthands in this style.

Shorthands are now simplified automatically,
so this method does nothing