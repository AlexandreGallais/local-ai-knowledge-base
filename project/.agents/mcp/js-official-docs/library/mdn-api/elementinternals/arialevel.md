---
title: "ElementInternals: ariaLevel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/arialevel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaLevel property

The **`ariaLevel`** property of the `ElementInternals` interface reflects the value of the `aria-level` attribute, which defines the hierarchical level of an element within a structure.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string containing an integer.

## Examples

In this example the value of `ariaLevel` is set to "1".

```js
class CustomEl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaLevel = "1";
  }
  // …
}
```

## See also

- ARIA: heading role
