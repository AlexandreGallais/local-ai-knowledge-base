---
title: "ElementInternals: ariaInvalid property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariainvalid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaInvalid property

The **`ariaInvalid`** property of the `ElementInternals` interface reflects the value of the `aria-invalid` attribute. Relevant for the `application`, `checkbox`, `combobox`, `gridcell`, `listbox`, `radiogroup`, `slider`, `spinbutton`, `textbox`, and `tree` roles, it indicates to the accessibility API whether the entered value does not conform to the format expected by the application.

> **Note:**
> Setting ARIA attributes on `ElementInternals` allows default semantics to be defined on a custom element. These may be overwritten by author-defined attributes, but ensure that default semantics are retained should the author delete those attributes, or fail to add them at all. For more information see the Accessibility Object Model explainer.

## Value

A string with one of the following values:

- `"true"`
    The element is invalid.
- `"false"` (default)
    The element is not in an invalid state.
- `"grammar"`
    The element is in an invalid state because grammatical error was detected.
- `"spelling"`
    The element is in an invalid state because spelling error was detected.

## Examples

In this example, we define and create a `<custom-text>` element, and then retrieve the value of `ariaInvalid` from the first `<custom-text>` element in the document.

```js
class CustomControl extends HTMLElement {
  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.ariaInvalid = "false";
  }
  // …
}

window.customElements.define("custom-text", CustomControl);

const element = document.querySelector("custom-text");
console.log(element._internals.ariaInvalid);
```

## See also

- `ElementInternals.ariaRequired`
- `aria-required`
- `aria-errormessage`
