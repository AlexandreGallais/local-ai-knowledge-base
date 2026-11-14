---
title: "ElementInternals: ariaDisabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariadisabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaDisabled property

The **`ariaDisabled`** property of the `ElementInternals` interface reflects the value of the `aria-disabled` attribute, which indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"true"`
    The element and all focusable descendants are disabled, but perceivable, and their values cannot be changed by the user.
- `"false"`
    The element is enabled.

## Examples

In this example the value of `ariaDisabled` is set to "true".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaDisabled = "true";
  }
  // …
}
```
