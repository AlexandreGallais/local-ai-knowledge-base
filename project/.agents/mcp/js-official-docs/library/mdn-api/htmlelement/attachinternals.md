---
title: "HTMLElement: attachInternals() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/attachinternals/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: attachInternals() method

The **`HTMLElement.attachInternals()`** method returns an `ElementInternals` object.
This method allows a custom element to participate in HTML forms. The `ElementInternals` interface provides utilities for working with these elements in the same way you would work with any standard HTML form element, and also exposes the Accessibility Object Model to the element.

## Syntax

```js
attachInternals()
```

### Parameters

None.

### Return value

An `ElementInternals` object.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the element is not a custom element.
- `NotSupportedError` `DOMException`
    Thrown if the "internals" feature was disabled as part of the element definition.
- `NotSupportedError` `DOMException`
    Thrown if this method is called twice on the same element.

## Examples

The following example demonstrates how to create a custom form-associated element with `HTMLElement.attachInternals`. The `ElementInternals.form` property is then printed to the console to demonstrate that we have an `ElementInternals` object.

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
console.log(element.internals_.form);
```

## See also

- More capable form controls
- Creating custom form controls with ElementInternals
