---
title: "HTMLLIElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllielement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLIElement

The **`HTMLLIElement`** interface exposes specific properties and methods (beyond those defined by regular `HTMLElement` interface it also has available to it by inheritance) for manipulating list elements.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLLIElement.type` (deprecated)
    A string representing the type of the bullets, `"disc"`, `"square"` or `"circle"`. As the standard way of defining the list type is via the CSS `list-style-type` property, use the CSSOM methods to set it via a script.
- `HTMLLIElement.value`
    An integer indicating the ordinal position of the _list element_ inside a given ``. It reflects the `value` attribute of the HTML `` element, and can be smaller than `0`. If the `` element is not a child of an `` element, the property has no meaning.

## Instance methods

_No specific method; inherits methods from its parent, `HTMLElement`._

## See also

- The HTML element implementing this interface: ``
