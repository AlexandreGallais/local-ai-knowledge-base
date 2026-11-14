---
title: "HTMLInputElement: maxLength property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/maxlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: maxLength property

The **`maxLength`** property of the `HTMLInputElement` interface indicates the maximum number of characters (in UTF-16 code units) allowed to be entered for the value of the `` element, and the maximum number of characters allowed for the value to be valid. It reflects the element's `maxlength` attribute. `-1` means there is no limit on the length of the value.

> **Note:**
> Browser generally prevent users from entering more characters than the `maxlength` attribute allows. Should the length be longer, the element is considered invalid and the `ValidityState` object's `tooLong` property will be `true`.

## Value

A number representing the element's `maxlength` if present, or `-1`.

## Example

Given the following HTML:

```html
<p>
  <label for="<example-value>">Your password</label>
  <input id="<example-value>" type="<example-value>" <example-value>"<example-value>" maxlength="<example-value>" />
</p>
```

You can use the `maxLength` property to retrieve or set the ``'s `maxlength` attribute value:

```js
const inputElement = document.querySelector("<example-value>");
console.log(`Element's maxLength: ${inputElement.maxLength}`); // "Element's maxlength: 20"
inputElement.maxLength = 18; // updates the element's maxlength attribute value
```

## See also

- `HTMLInputElement.value`
- `HTMLInputElement.minLength`
- `ValidityState.tooLong`
