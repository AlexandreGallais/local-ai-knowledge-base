---
title: "HTMLTextAreaElement: required property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/required/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: required property

The **`required`** property of the `HTMLTextAreaElement` interface specifies that the user must fill in a value before submitting a form. It reflects the `<textarea>` element's `required` attribute.

## Value

A boolean.

## Examples

```js
const textareaElement = document.getElementById("comment");
console.log(textArea.required);
```

## See also

- `<textarea>`
- `HTMLTextAreaElement.validity`
- `:required` pseudo-class
