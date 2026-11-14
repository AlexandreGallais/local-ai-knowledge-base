---
title: "ElementInternals: ariaChecked property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariachecked/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaChecked property

The **`ariaChecked`** property of the `ElementInternals` interface reflects the value of the `aria-checked` attribute, which indicates the current "checked" state of checkboxes, radio buttons, and other widgets that have a checked state.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"true"`
    The element is checked.
- `"mixed"`
    Indicates a mixed mode value for a tri-state checkbox or menuitemcheckbox.
- `"false"`
    The element supports being checked but is not currently checked.
- `"undefined"`
    The element does not support being checked.

## Examples

In this example the value of `ariaChecked` is set to "true".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaChecked = "true";
  }
  // …
}
```

## See also

- ARIA: checkbox role
