---
title: "ElementInternals: ariaModal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariamodal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaModal property

The **`ariaModal`** property of the `ElementInternals` interface reflects the value of the `aria-modal` attribute, which indicates whether an element is modal when displayed.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"true"`
    The element is modal.
- `"false"`
    The element is not modal.

## Examples

In this example the value of `ariaModal` is set to "true".

```js
class CustomEl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaModal = "true";
  }
  // …
}
```

## See also

- ARIA: dialog role
