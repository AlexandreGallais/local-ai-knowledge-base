---
title: "ElementInternals: willValidate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/willvalidate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: willValidate property

The **`willValidate`** read-only property of the `ElementInternals` interface returns `true` if the element is a submittable element that is a candidate for constraint validation.

Elements that are barred from being candidates for constraint validation include those that have the attributes: `disabled`, `hidden` or `readonly`, input elements of `type=button` or `type=reset`, or any element that is a `<datalist>` element or has a `<datalist>` element ancestor.

## Value

`true` if the element is a candidate for constraint validation, otherwise `false`.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the element does not have its `formAssociated` property set to `true`.

## Examples

The following example shows a custom checkbox component with `formAssociated` set to `true`, the value of `willValidate` is logged to the console.

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
console.log(element.internals_.willValidate); // true
```
