---
title: "ElementInternals: ariaSetSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariasetsize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaSetSize property

The **`ariaSetSize`** property of the `ElementInternals` interface reflects the value of the `aria-setsize` attribute, which defines the number of items in the current set of listitems or treeitems.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string containing an integer.

## Examples

In this example the value of `ariaSetSize` is set to "4".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaSetSize = "4";
  }
  // …
}
```

## See also

- ARIA: tab role
