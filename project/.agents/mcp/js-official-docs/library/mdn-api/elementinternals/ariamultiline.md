---
title: "ElementInternals: ariaMultiLine property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariamultiline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaMultiLine property

The **`ariaMultiLine`** property of the `ElementInternals` interface reflects the value of the `aria-multiline` attribute, which indicates whether a text box accepts multiple lines of input or only a single line.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"true"`
    This is a multi-line text box.
- `"false"`
    This is a single-line text box.

## Examples

In this example the value of `ariaMultiLine` is set to "true".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaMultiLine = "true";
  }
  // …
}
```

## See also

- ARIA: textbox role
