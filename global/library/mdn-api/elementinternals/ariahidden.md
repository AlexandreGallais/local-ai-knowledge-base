---
title: "ElementInternals: ariaHidden property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariahidden/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaHidden property

The **`ariaHidden`** property of the `ElementInternals` interface reflects the value of the `aria-hidden` attribute, which indicates whether the element is exposed to an accessibility API.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"true"`
    The element is hidden from the accessibility API.
- `"false"`
    The element is exposed to the accessibility API as if it were rendered.
- `"undefined"`
    The element's hidden state is determined by the user agent based on whether it is rendered.

## Examples

In this example the value of `ariaHidden` is set to "true".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaHidden = "true";
  }
  // …
}
```
