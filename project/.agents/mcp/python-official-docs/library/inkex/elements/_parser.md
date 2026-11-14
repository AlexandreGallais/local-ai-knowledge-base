---
title: "inkex.elements._parser"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/elements/_parser.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.elements._parser

Utilities for parsing SVG documents.

> *Added in version 1.2.*
> Separated out from `inkex.elements._base`

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

> *Added in version 1.1.*

## load_svg

```python
def load_svg(stream)
```

Load SVG file using the SVG_PARSER
