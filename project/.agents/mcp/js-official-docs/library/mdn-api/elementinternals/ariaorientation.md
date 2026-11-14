---
title: "ElementInternals: ariaOrientation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariaorientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaOrientation property

The **`ariaOrientation`** property of the `ElementInternals` interface reflects the value of the `aria-orientation` attribute, which indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"horizontal"`
    The element is horizontal.
- `"vertical"`
    The element is vertical.
- `"undefined"`
    The element's orientation is unknown.

## Examples

In this example the value of `ariaOrientation` is set to "vertical".

```js
class CustomEl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaOrientation = "vertical";
  }
  // …
}
```
