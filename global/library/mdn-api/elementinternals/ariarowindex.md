---
title: "ElementInternals: ariaRowIndex property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariarowindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaRowIndex property

The **`ariaRowIndex`** property of the `ElementInternals` interface reflects the value of the `aria-rowindex` attribute, which defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string which contains an integer.

## Examples

In this example the value of `ariaRowIndex` is set to "1".

```js
class CustomEl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaRowIndex = "1";
  }
  // …
}
```

## See also

- ARIA: table role
