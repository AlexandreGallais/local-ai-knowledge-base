---
title: "ElementInternals: ariaHasPopup property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariahaspopup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaHasPopup property

The **`ariaHasPopup`** property of the `ElementInternals` interface reflects the value of the `aria-haspopup` attribute, which indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"false"`
    The element does not have a popup.
- `"true"`
    The element has a popup that is a menu.
- `"menu"`
    The element has a popup that is a menu.
- `"listbox"`
    The element has a popup that is a listbox.
- `"tree"`
    The element has a popup that is a tree.
- `"grid"`
    The element has a popup that is a grid.
- `"dialog"`
    The element has a popup that is a dialog.

## Examples

In this example the value of `ariaHasPopup` is set to "true".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaHasPopup = "true";
  }
  // …
}
```
