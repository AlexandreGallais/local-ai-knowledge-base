---
title: "ElementInternals: ariaSort property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariasort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaSort property

The **`ariaSort`** property of the `ElementInternals` interface reflects the value of the `aria-sort` attribute, which indicates if items in a table or grid are sorted in ascending or descending order.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"ascending"`
    Items are sorted in ascending order by this column.
- `"descending"`
    Items are sorted in descending order by this column.
- `"none"`
    There is no defined sort applied to the column.
- `"other"`
    A sort algorithm other than ascending or descending has been applied.

## Examples

In this example the value of `ariaSort` is set to "ascending".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaSort = "ascending";
  }
  // …
}
```

## See also

- ARIA: table role
