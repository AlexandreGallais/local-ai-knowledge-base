---
title: "HTMLInputElement: minLength property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/minlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: minLength property

The **`minLength`** property of the `HTMLInputElement` interface indicates the minimum number of characters (in UTF-16 code units) required for the value of the `` element to be valid. It reflects the element's `minlength` attribute. `-1` means there is no minimum length requirement.

> **Note:**
> If the input has a value, and that value has fewer characters than the `minlength` attribute requires, the element is considered invalid and the `ValidityState` object's `tooShort` property will be `true`.

## Value

A number representing the element's `minlength` if present or `-1`.

## Example

Given the following HTML:

```html
<p>
  <label for="<example-value>">Your password</label>
  <input id="<example-value>" type="<example-value>" <example-value>"<example-value>" maxlength="<example-value>" />
</p>
```

You can use the `minLength` property to retrieve or set the ``'s `minlength` attribute value:

```js
const inputElement = document.querySelector("<example-value>");
console.log(`Element's minLength: ${inputElement.minLength}`); // "Element's minlength: 8"
inputElement.minLength = 12; // updates the element's minlength attribute value
```

## See also

- `HTMLInputElement.value`
- `HTMLInputElement.maxLength`
- `ValidityState.tooShort`
