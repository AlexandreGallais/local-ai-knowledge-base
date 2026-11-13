---
title: "HTMLTextAreaElement: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: value property

The **`value`** property of the `HTMLTextAreaElement` interface represents the value of the `<textarea>` element as a string, which is an empty string if the widget contains no content. It returns or sets the raw value contained in the control.

## Value

A string containing the contents of the `<textarea>` element.

## Examples

```js
const textareaElement = document.getElementById("comment");
const oldText = textArea.value;
textArea.value = oldText.toUpperCase();
```

## See also

- `<textarea>`
- `HTMLTextAreaElement.textLength`
- `HTMLTextAreaElement.labels`
- `HTMLTextAreaElement.selectionStart`
- `HTMLTextAreaElement.selectionEnd`
