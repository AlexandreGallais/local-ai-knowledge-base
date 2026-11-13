---
title: "HTMLLabelElement: control property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllabelelement/control/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLabelElement: control property

The read-only **`HTMLLabelElement.control`** property returns a
reference to the control (in the form of an object of type `HTMLElement` or
one of its derivatives) with which the `` element is associated,
or `null` if the label isn't associated with a control.

## Value

An `HTMLElement` derived object representing the control with which the
`` is associated, or `null` if the label stands alone.

> **Note:**
> If this property has a value and `HTMLLabelElement.htmlFor` has a value,
> the `HTMLLabelElement.htmlFor` property must refer to the same control.

## See also

- `HTMLLabelElement`
- `HTMLElement`
- ``
- HTML forms guide
