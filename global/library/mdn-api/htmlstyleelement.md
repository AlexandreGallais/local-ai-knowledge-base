---
title: "HTMLStyleElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlstyleelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLStyleElement

The **`HTMLStyleElement`** interface represents a `<style>` element. It inherits properties and methods from its parent, `HTMLElement`.

In most cases, this interface doesn't allow you to manipulate the CSS it contains. To manipulate CSS, see Using dynamic styling information for an overview of the objects used to manipulate specified CSS properties using the DOM.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLStyleElement.blocking`
    A string indicating that certain operations should be blocked on the fetching of critical subresources. It reflects the `blocking` attribute of the `<style>` element.
- `HTMLStyleElement.media`
    A string reflecting the HTML attribute representing the intended destination medium for style information.
- `HTMLStyleElement.type` (deprecated)
    A string reflecting the HTML attribute representing the type of style being applied by this statement.
- `HTMLStyleElement.disabled`
    A boolean value indicating whether or not the associated stylesheet is disabled.
- `HTMLStyleElement.sheet` (read-only)
    Returns the `CSSStyleSheet` object associated with the given element, or `null` if there is none.

## Instance methods

_No specific method; inherits methods from its parent, `HTMLElement`._

## See also

- The HTML element implementing this interface: `<style>`.
- Using dynamic styling information to see how to manipulate CSS.
