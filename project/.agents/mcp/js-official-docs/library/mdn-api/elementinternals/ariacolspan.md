---
title: "ElementInternals: ariaColSpan property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariacolspan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaColSpan property

The **`ariaColSpan`** property of the `ElementInternals` interface reflects the value of the `aria-colspan` attribute, which defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string which contains an integer.

## Examples

In this example the value of `ariaColspan` is set to "2".

```js
class CustomEl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaColspan = "2";
  }
  // …
}
```

## See also

- ARIA: table role
