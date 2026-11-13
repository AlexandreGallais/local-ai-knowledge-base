---
title: "HTMLInputElement: autocomplete property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/autocomplete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: autocomplete property

The **`autocomplete`** property of the `HTMLInputElement` interface indicates whether the value of the control can be automatically completed by the browser. It reflects the `` element's `autocomplete` attribute.

## Value

A string; the value of the `autocomplete` attribute (`"<example-value>"`, `"<example-value>"`, a `<token-list>`), or the empty string `""` if unspecified.

## Examples

```js
const inputElement = document.getElementById("name");
console.log(inputElement.autocomplete);
```

## See also

- ``
- `HTMLInputElement.value`
- HTML `autocomplete` attribute
- ARIA `aria-autocomplete` attribute
- Turning off autocompletion
