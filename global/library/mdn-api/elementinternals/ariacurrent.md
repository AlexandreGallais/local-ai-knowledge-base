---
title: "ElementInternals: ariaCurrent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariacurrent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaCurrent property

The **`ariaCurrent`** property of the `ElementInternals` interface reflects the value of the `aria-current` attribute, which indicates the element that represents the current item within a container or set of related elements.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"page"`
    Represents the current page within a set of pages.
- `"step"`
    Represents the current step within a process.
- `"location"`
    Represents the current location, for example the current page in a breadcrumbs hierarchy.
- `"date"`
    Represents the current date within a collection of dates.
- `"time"`
    Represents the current time within a set of times.
- `"true"`
    Represents the current item within a set.
- `"false"`
    Does not represent the current item within a set.

## Examples

In this example the value of `ariaCurrent` is set to "page".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaCurrent = "page";
  }
  // …
}
```

## See also

- Using the aria-current attribute
