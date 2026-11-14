# inkex.elements._parser

Utilities for parsing SVG documents.

.. versionadded:: 1.2
    Separated out from :py:mod:`inkex.elements._base`

## class NodeBasedLookup

```python
class NodeBasedLookup(etree.PythonElementClassLookup)
```

We choose what kind of Elements we should return for each element, providing useful
SVG based API to our extensions system.

## NodeBasedLookup.register_class

```python
def register_class(cls, klass)
```

Register the given class using it's attached tag name

## NodeBasedLookup.find_class

```python
def find_class(cls, xpath)
```

Find the class for this type of element defined by an xpath

.. versionadded:: 1.1

## load_svg

```python
def load_svg(stream)
```

Load SVG file using the SVG_PARSER