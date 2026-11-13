---
title: "ElementInternals: validity property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/validity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: validity property

The **`validity`** read-only property of the `ElementInternals` interface returns a `ValidityState` object which represents the different validity states the element can be in, with respect to constraint validation.

## Value

A `ValidityState` object.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the element does not have its `formAssociated` property set to `true`.

## Examples

The following example shows a custom checkbox component with `formAssociated` set to `true`, the value of `validity.valid` is logged to the console.

```js
class CustomCheckbox extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.internals_ = this.attachInternals();
  }

  // …
}

window.customElements.define("custom-checkbox", CustomCheckbox);

let element = document.getElementById("custom-checkbox");
console.log(element.internals_.validity.valid);
```
