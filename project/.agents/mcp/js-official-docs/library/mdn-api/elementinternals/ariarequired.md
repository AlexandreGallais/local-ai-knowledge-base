---
title: "ElementInternals: ariaRequired property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariarequired/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaRequired property

The **`ariaRequired`** property of the `ElementInternals` interface reflects the value of the `aria-required` attribute, which indicates that user input is required on the element before a form may be submitted.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"true"`
    Users need to provide input on an element before a form is submitted.
- `"false"`
    User input is not necessary to submit the form.

## Examples

In this example the value of `ariaRequired` is set to "true".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaRequired = "true";
  }
  // …
}
```

## See also

- ARIA: textbox role
