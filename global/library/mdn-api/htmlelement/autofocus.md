---
title: "HTMLElement: autofocus property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/autofocus/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: autofocus property

The **`autofocus`** property of the `HTMLElement` interface represents a boolean value reflecting the `autofocus` HTML global attribute. This indicates whether the element should be focused on page load or, if it is nested inside a `<dialog>` or `popover` element, when the `<dialog>` or popover is shown.

Only one element inside a document, `<dialog>` element, or popover may have this attribute specified. If applied to multiple elements, the first focusable one will receive focus.

> **Note:**
> Setting this property doesn't set the focus to the associated element: it merely tells the browser to focus to it when _the element is inserted_ in the document. Setting it after the insertion, that is most of the time after the document load, has no visible effect.

## Value

A boolean value.
