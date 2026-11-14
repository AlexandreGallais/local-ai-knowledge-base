---
title: "ElementInternals: ariaMultiSelectable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariamultiselectable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaMultiSelectable property

The **`ariaMultiSelectable`** property of the `ElementInternals` interface reflects the value of the `aria-multiselectable` attribute, which indicates that the user may select more than one item from the current selectable descendants.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"true"`
    More than one item may be selected at a time.
- `"false"`
    Only one item may be selected.

## Examples

In this example the value of `ariaMultiSelectable` is set to "true".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaMultiSelectable = "true";
  }
  // …
}
```

## See also

- ARIA: listbox role
