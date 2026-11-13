---
title: "ElementInternals: ariaDescription property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariadescription/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaDescription property

The **`ariaDescription`** property of the `ElementInternals` interface reflects the value of the `aria-description` attribute, which defines a string value that describes or annotates the current element.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string.

## Examples

In this example the value of `ariaDescription` is set to "A description of this widget".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaDescription = "A description of this widget";
  }
  // …
}
```
