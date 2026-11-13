---
title: "HTMLTextAreaElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: name property

The **`name`** property of the `HTMLTextAreaElement` interface indicates the name of the `<textarea>` element. It reflects the element's `name` attribute.

## Value

A string representing the element's name.

## Example

```js
const textareaElement = document.querySelector("#message");
console.log(`Element's name: ${textareaElement.name}`);
textareaElement.name = "response"; // sets or updates the element's name
```

## See also

- `HTMLTextAreaElement.value`
- `HTMLTextAreaElement.textLength`
