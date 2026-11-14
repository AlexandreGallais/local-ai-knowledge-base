---
title: "inkex.base"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/base.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.base

The ultimate base functionality for every Inkscape extension.

## class InkscapeExtension

```python
class InkscapeExtension
```

The base class extension, provides argument parsing and basic
variable handling features.

## InkscapeExtension.arg_number_ranges

```python
def arg_number_ranges()
```

Parses a number descriptor. e.g:
`1,2,4-5,7,9-` is parsed to `1, 2, 4, 5, 7, 9, 10, ..., lastvalue`

> *Added in version 1.2.*

Usage:

```python
#### in add_arguments()
pars.add_argument("--pages", type=self.arg_number_ranges(), default=1-)
#### later on, pages is then a list of ints
pages = self.options.pages(lastvalue)
```

## InkscapeExtension.arg_class

```python
def arg_class(options: List[Type]) -> Callable[[str], Any]
```

Used by add_argument to match an option with a class

Types to choose from are given by the options list

> *Added in version 1.2.*

Usage:

```python
pars.add_argument("--class", type=self.arg_class([ClassA, ClassB]),
                  default="ClassA")
```

## class SvgOutputMixin

```python
class SvgOutputMixin(_Base): # pylint: disable=too-few-public-methods, abstract-method """ Expects the output document to be an svg document and will write an etree xml. A template can be specified to kick off the svg document building process. """ template = """<svg viewBox="0 0 {width} {height}" width="{width}{unit}" height="{height}{unit}" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"> </svg>""" @classmethod def get_template(cls, **kwargs)
```

Opens a template svg document for building, the kwargs
MUST include all the replacement values in the template, the
default template has 'width' and 'height' of the document.

## SvgOutputMixin.get_template

```python
def get_template(cls, **kwargs)
```

Opens a template svg document for building, the kwargs
MUST include all the replacement values in the template, the
default template has 'width' and 'height' of the document.
