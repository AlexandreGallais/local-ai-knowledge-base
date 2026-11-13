---
title: "HTMLTextAreaElement: textLength property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/textlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: textLength property

The **`textLength`** read-only property of the `HTMLTextAreaElement` interface is a non-negative integer representing the number of characters, in UTF-16 code units, of the `<textarea>` element's value. It is a shortcut of accessing `length` on its `value` property.

## Value

A non-negative integer.

## Examples

```js
const textareaElement = document.getElementById("comment");
console.log(textArea.textLength);
```

## See also

- `<textarea>`
- `HTMLTextAreaElement.rows`
- `HTMLTextAreaElement.cols`
- `HTMLTextAreaElement.minLength`
- `HTMLTextAreaElement.maxLength`
