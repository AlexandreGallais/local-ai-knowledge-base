---
title: "ElementInternals.ariaRowIndexText"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariarowindextext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals.ariaRowIndexText

The **`ariaRowIndexText`** property of the `ElementInternals` interface reflects the value of the `aria-rowindextext` attribute, which defines a human-readable text alternative of aria-rowindex.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string.

## Examples

In this example the value of `ariaRowIndexText` is set to "Heading row".

```js
class CustomEl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaRowIndexText = "Heading row";
  }
  // …
}
```

## See also

- ARIA: table role
