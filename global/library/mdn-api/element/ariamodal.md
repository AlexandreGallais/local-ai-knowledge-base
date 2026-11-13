---
title: "Element: ariaModal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariamodal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaModal property

The **`ariaModal`** property of the `Element` interface reflects the value of the `aria-modal` attribute, which indicates whether an element is modal when displayed. Applying the `aria-modal` property to an element with `role="dialog"` replaces the technique of using aria-hidden on the background for informing assistive technologies that content outside a dialog is inert.

## Value

A string with one of the following values:

- `"true"`
    The element is modal.
- `"false"`
    The element is not modal.

## Examples

In this example the `aria-modal` attribute on the element with an ID of `address-modal` is set to "true" indicating that this is a modal dialog. Using `ariaModal` we update the value to "false".

```html
<div
  role="dialog"
  id="address-modal"
  aria-labelledby="dialog1Title"
  aria-describedby="dialog1Desc"
  aria-modal="true"></div>
```

```js
let el = document.getElementById("address-modal");
console.log(el.ariaModal); // "true"
el.ariaModal = "false";
console.log(el.ariaModal); // "false"
```

## See also

- ARIA: dialog role
