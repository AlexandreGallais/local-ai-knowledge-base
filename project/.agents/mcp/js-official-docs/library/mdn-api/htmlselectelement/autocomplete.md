---
title: "HTMLSelectElement: autocomplete property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/autocomplete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: autocomplete property

The **`autocomplete`** property of the `HTMLSelectElement` interface indicates whether the value of the control can be automatically completed by the browser. It reflects the `<select>` element's `autocomplete` attribute.

## Value

A string representing the value of the `autocomplete` attribute (`"<example-value>"`, `"<example-value>"`, or a `<token-list>`) or the empty string (`""`) if unspecified.

## Examples

```js
const selectElement = document.getElementById("favorite-fruit");
console.log(textArea.autocomplete);
```

## See also

- `<select>`
- `<option>`
- HTML `autocomplete` attribute
- ARIA `aria-autocomplete` attribute
- Turning off autocompletion
