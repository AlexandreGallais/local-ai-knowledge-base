---
title: "HTMLLabelElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllabelelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLabelElement

The **`HTMLLabelElement`** interface gives access to properties specific to `` elements. It inherits methods and properties from the base `HTMLElement` interface.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLLabelElement.control` (read-only)
    A `HTMLElement` representing the control with which the label is associated.
- `HTMLLabelElement.form` (read-only)
    A `HTMLFormElement` object representing the form with which the labeled control is associated, or `null` if there is no associated control, or if that control isn't associated with a form. In other words, this is just a shortcut for `HTMLLabelElement.control.form`.
- `HTMLLabelElement.htmlFor`
    A string containing the ID of the labeled control. This reflects the `for` attribute.

> **Note:**
> To programmatically set the `for` attribute, use `htmlFor`.

## Instance methods

_No specific methods; inherits methods from its parent, `HTMLElement`._

## See also

- The HTML element implementing this interface: ``
- `<form>`
- `HTMLFormElement`
