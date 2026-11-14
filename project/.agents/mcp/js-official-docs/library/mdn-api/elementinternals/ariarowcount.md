---
title: "ElementInternals: ariaRowCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariarowcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaRowCount property

The **`ariaRowCount`** property of the `ElementInternals` interface reflects the value of the `aria-rowcount` attribute, which defines the total number of rows in a table, grid, or treegrid.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string which contains an integer.

## Examples

In this example the value of `ariaRowCount` is set to "100".

```js
class CustomEl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaRowCount = "100";
  }
  // …
}
```

## See also

- ARIA: table role
