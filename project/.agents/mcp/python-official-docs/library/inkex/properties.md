---
title: "inkex.properties"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/properties.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.properties

Property management and parsing, CSS cascading, default value storage

> *Added in version 1.2.*

#### `all_properties`

A list of all properties, their parser class, and additional information
such as whether they are inheritable or can be given as presentation attributes

## class PropertyDescription

```python
class PropertyDescription
```

Describes a CSS / presentation attribute
