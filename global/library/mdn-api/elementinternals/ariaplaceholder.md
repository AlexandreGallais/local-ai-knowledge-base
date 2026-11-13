---
title: "ElementInternals: ariaPlaceholder property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariaplaceholder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaPlaceholder property

The **`ariaPlaceholder`** property of the `ElementInternals` interface reflects the value of the `aria-placeholder` attribute, which defines a short hint intended to aid the user with data entry when the control has no value.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string.

## Examples

In this example the value of `ariaPlaceholder` is set to "12345".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaPlaceholder = "12345";
  }
  // …
}
```

## See also

- ARIA: textbox role
