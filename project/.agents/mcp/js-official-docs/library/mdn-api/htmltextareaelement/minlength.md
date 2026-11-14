---
title: "HTMLTextAreaElement: minLength property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/minlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: minLength property

The **`minLength`** property of the `HTMLTextAreaElement` interface indicates the minimum number of characters (in UTF-16 code units) required for the value of the `<textarea>` element to be valid. It reflects the element's `minlength` attribute. `-1` means there is no minimum length requirement.

> **Note:**
> If the textarea has a value, and that value has fewer characters than the `minlength` attribute requires, the element is considered invalid and the `ValidityState` object's `tooShort` property will be `true`.

## Value

A number representing the element's `minlength` if present or `-1`.

## Example

Given the following HTML:

```html
<p>
  <label for="comment">Comment</label>
  <textarea id="comment" minlength="10" maxlength="200"></textarea>
</p>
```

You can use the `minLength` property to retrieve or set the `<textarea>`'s `minlength` attribute value:

```js
const textareaElement = document.querySelector("#comment");
console.log(`Element's minLength: ${textareaElement.minLength}`); // "Element's minlength: 10"
textareaElement.minLength = 5; // updates the element's minlength attribute value
```

## See also

- `HTMLTextAreaElement.value`
- `HTMLTextAreaElement.maxLength`
- `ValidityState.tooShort`
