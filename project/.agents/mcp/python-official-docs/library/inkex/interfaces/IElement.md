---
title: "inkex.interfaces.IElement"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/interfaces/IElement.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.interfaces.IElement

Element abstractions for type comparisons without circular imports

> *Added in version 1.2.*

## class IBaseElement

```python
class IBaseElement(ABC, etree.ElementBase)
```

Abstraction for BaseElement to avoid circular imports

## IBaseElement.get_id

```python
def get_id(self, as_url=0)
```

Returns the element ID. If not set, generates a unique ID.

## class BaseElementProtocol

```python
class BaseElementProtocol(Protocol)
```

Abstraction for BaseElement, to be used as typehint in mixin classes

## BaseElementProtocol.get_id

```python
def get_id(self, as_url=0) -> str
```

Returns the element ID. If not set, generates a unique ID.

## BaseElementProtocol.root

```python
def root(self) -> ISVGDocumentElement
```

Returns the element's root.

## class ISVGDocumentElement

```python
class ISVGDocumentElement(IBaseElement)
```

Abstraction for SVGDocumentElement
