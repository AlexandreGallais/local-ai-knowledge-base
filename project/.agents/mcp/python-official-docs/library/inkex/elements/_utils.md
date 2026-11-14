---
title: "inkex.elements._utils"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/elements/_utils.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.elements._utils

Useful utilities specifically for elements (that aren't base classes)

> *Added in version 1.1.*
> Most of the methods in this module were moved from inkex.utils.

## registerNS

```python
def registerNS(prefix, url)
```

Register the given prefix as a namespace url.

## addNS

```python
def addNS(tag, ns=None, namespaces=NSS): # pylint: disable=invalid-name """Add a known namespace to a name for use with lxml""" if tag.startswith("{") and ns: _, tag = removeNS(tag) if not tag.startswith("{"): tag = tag.replace("__", ":") if ":" in tag: (ns, tag) = tag.rsplit(":", 1) ns = namespaces.get(ns, None) or ns if ns is not None: return f"{{{ns}}}{tag}" return tag def removeNS(name, reverse_namespaces=SSN, default="svg"): # pylint: disable=invalid-name """The reverse of addNS, finds any namespace and returns tuple (ns, tag)""" if name[0] == "{": (url, tag) = name[1:].split("}", 1) return reverse_namespaces.get(url, default), tag if ":" in name: return name.rsplit(":", 1) return default, name def splitNS(name, namespaces=NSS): # pylint: disable=invalid-name """Like removeNS, but returns a url instead of a prefix""" (prefix, tag) = removeNS(name) return (namespaces[prefix], tag) 
```

Helper for a natural sort

See https://stackoverflow.com/a/16090640/3298143

## splitNS

```python
def splitNS(name, namespaces=NSS): # pylint: disable=invalid-name """Like removeNS, but returns a url instead of a prefix""" (prefix, tag) = removeNS(name) return (namespaces[prefix], tag) def natural_sort_key(key, _nsre=re.compile("([0-9]+)"))
```

Helper for a natural sort

See https://stackoverflow.com/a/16090640/3298143

## natural_sort_key

```python
def natural_sort_key(key, _nsre=re.compile("([0-9]+)"))
```

Helper for a natural sort

See https://stackoverflow.com/a/16090640/3298143

## class ChildToProperty

```python
class ChildToProperty(property)
```

Use when you have a singleton child element who's text
content is the canonical value for the property

## class CloningVat

```python
class CloningVat
```

When modifying defs, sometimes we want to know if every backlink would have
needed changing, or it was just some of them.

This tracks the def elements, their promises and creates clones if needed.

## CloningVat.track

```python
def track(self, elem, parent, set_id=None, **kwargs)
```

Track the element and connected parent

## CloningVat.process

```python
def process(self, process, types=(), make_clones=True, **kwargs)
```

Process each tracked item if the backlinks match the parents

Optionally make clones, process the clone and set the new id.
