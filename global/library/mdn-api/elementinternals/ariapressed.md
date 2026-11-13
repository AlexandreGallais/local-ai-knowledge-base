---
title: "ElementInternals: ariaPressed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariapressed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaPressed property

The **`ariaPressed`** property of the `ElementInternals` interface reflects the value of the `aria-pressed` attribute, which indicates the current "pressed" state of toggle buttons.

> **Note:**
> Setting aria attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"true"`
    The element is pressed.
- `"false"`
    The element supports being pressed but is not currently pressed.
- `"mixed"`
    Indicates a mixed mode value for a tri-state toggle button.
- `"undefined"`
    The element does not support being pressed.

## Examples

In this example the value of `ariaPressed` is set to "true".

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.ariaPressed = "true";
  }
  // …
}
```

## See also

- ARIA: button role
