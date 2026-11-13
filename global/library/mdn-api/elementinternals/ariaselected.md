---
title: "ElementInternals: ariaSelected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariaselected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaSelected property

The **`ariaSelected`** property of the `ElementInternals` interface reflects the value of the `aria-selected` attribute, which indicates the current "selected" state of elements that have a selected state.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"true"`
    The item is selected.
- `"false"`
    The item is not selected.
- `"undefined"`
    The item is not

## Examples

In this example the value of `ariaSelected` is set to "true".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaSelected = "true";
  }
  // …
}
```

## See also

- ARIA: tab role
