---
title: "StylePropertyMap"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMap

The **`StylePropertyMap`** interface of the CSS Typed Object Model API provides a representation of a CSS declaration block that is an alternative to `CSSStyleDeclaration`.

> **Note:**
> This interface is only available on the window thread; unlike other interfaces in this API it cannot be accessed in `Worker` or `Worklet` contexts.
> Worklets receive a read-only snapshot of an element's style through `StylePropertyMapReadOnly`.

## Instance properties

_Also inherits properties from its parent interface, `StylePropertyMapReadOnly`._

## Instance methods

_Also inherits methods from its parent interface, `StylePropertyMapReadOnly`._

- `StylePropertyMap.append()`
    Adds a new CSS declaration to the `StylePropertyMap` with the given property and value.
- `StylePropertyMap.clear()`
    Removes all declarations in the `StylePropertyMap`.
- `StylePropertyMap.delete()`
    Removes the CSS declaration with the given property.
- `StylePropertyMap.set()`
    Changes the CSS declaration with the given property.
