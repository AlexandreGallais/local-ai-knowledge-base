---
title: "HTMLTextAreaElement: readOnly property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/readonly/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: readOnly property

The **`readOnly`** property of the `HTMLTextAreaElement` interface indicates that the user cannot modify the value of the control. Unlike the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or selecting in the control. It reflects the `<textarea>` element's `readonly` attribute.

## Value

A boolean.

## Examples

```js
const textareaElement = document.getElementById("comment");
console.log(textArea.readOnly);
```

## See also

- `<textarea>`
- `HTMLTextAreaElement.disabled`
- `:read-only` pseudo-class
