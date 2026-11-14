---
title: "HTMLEmbedElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlembedelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLEmbedElement

The **`HTMLEmbedElement`** interface provides special properties (beyond the regular `HTMLElement` interface it also has available to it by inheritance) for manipulating `` elements.

> **Note:**
> This topic describes the `HTMLEmbedElement` interface as defined in the standard. It does not address earlier, non-standardized version of the interface.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLEmbedElement.align` (deprecated)
    A string representing an enumerated property indicating alignment of the element's contents with respect to the surrounding context. The possible values are `"left"`, `"right"`, `"center"`, and `"justify"`.
- `HTMLEmbedElement.height`
    A string reflecting the `height` HTML attribute, containing the displayed height of the resource.
- `HTMLEmbedElement.name` (deprecated)
    A string representing the name of the embedded object.
- `HTMLEmbedElement.src`
    A string that reflects the `src` HTML attribute, containing the address of the resource.
- `HTMLEmbedElement.type`
    A string that reflects the `type` HTML attribute, containing the type of the resource.
- `HTMLEmbedElement.width`
    A string that reflects the `width` HTML attribute, containing the displayed width of the resource.

## Instance methods

_Also inherits methods from its parent interface, `HTMLElement`._

- `HTMLEmbedElement.getSVGDocument()`
    Returns the embedded SVG as a `Document`.

## See also

- The HTML element implementing this interface: ``
