---
title: "inkex.inx"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/inx.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.inx

Parsing inx files for checking and generating.

## class InxLookup

```python
class InxLookup(etree.CustomElementClassLookup)
```

Custom inx xml file lookup

## class InxFile

```python
class InxFile
```

Open an INX file and provide useful functions

## InxFile.script

```python
def script(self)
```

Returns information about the called script

## InxFile.extension_class

```python
def extension_class(self)
```

Attempt to get the extension class

## InxFile.metadata

```python
def metadata(self)
```

Returns information about what type of extension this is

## InxFile.menu

```python
def menu(self)
```

Return the menu this effect ends up in

## InxFile.params

```python
def params(self)
```

Get all params at all levels

## class InxElement

```python
class InxElement(etree.ElementBase)
```

Any element in an inx file

> *Added in version 1.1.*

## InxElement.set_warning

```python
def set_warning(self, msg)
```

Set a warning for slightly incorrect inx contents

## InxElement.get_root

```python
def get_root(self)
```

Get the root document element from any element descendent

## InxElement.get_default_prefix

```python
def get_default_prefix(self)
```

Set default xml namespace prefix. If none is defined, set warning

## InxElement.apply_nss

```python
def apply_nss(self, xpath, nss=None)
```

Add prefixes to any xpath string

## InxElement.xpath

```python
def xpath(self, xpath, nss=None)
```

Namespace specific xpath searches

> *Added in version 1.1.*

## InxElement.find_one

```python
def find_one(self, name, nss=None)
```

Return the first element matching the given name

> *Added in version 1.1.*

## InxElement.get_text

```python
def get_text(self, name, default=None, nss=None)
```

Get text content agnostically

## class ParamElement

```python
class ParamElement(InxElement)
```

A param in an inx file.

## ParamElement.options

```python
def options(self)
```

Return a list of option values
