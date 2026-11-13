---
title: "HTMLTextAreaElement: autocomplete property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/autocomplete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: autocomplete property

The **`autocomplete`** property of the `HTMLTextAreaElement` interface indicates whether the value of the control can be automatically completed by the browser. It reflects the `<textarea>` element's `autocomplete` attribute.

## Value

A string representing the value of the `autocomplete` attribute (`"<example-value>"`, `"<example-value>"`, or a `<token-list>`) or the empty string (`""`) if unspecified.

## Examples

```js
const textareaElement = document.getElementById("comment");
console.log(textArea.autocomplete);
```

## See also

- `<textarea>`
- HTML `autocomplete` attribute
- ARIA `aria-autocomplete` attribute
- Turning off autocompletion
