---
title: "ElementInternals: form property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/form/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: form property

The **`form`** read-only property of the `ElementInternals` interface returns the `HTMLFormElement` associated with this element.

## Value

An `HTMLFormElement`.

## Examples

The following example shows a custom checkbox component inside a form with an ID of `myForm`.
Printing `form.length` to the console, gives us the value of `HTMLFormElement.length`.

```html
<form id="myForm">
  <custom-checkbox id="custom-checkbox"></custom-checkbox>
  <custom-label for="custom-checkbox">Join newsletter</custom-label>
</form>
```

```js
class CustomCheckbox extends HTMLElement {
  static formAssociated = true;
  #internals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  connectedCallback() {
    console.log(this.#internals.form.length);
  }
}

window.customElements.define("custom-checkbox", CustomCheckbox);
```
