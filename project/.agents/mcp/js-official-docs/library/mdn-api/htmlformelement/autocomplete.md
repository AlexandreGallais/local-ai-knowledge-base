---
title: "HTMLFormElement: autocomplete property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/autocomplete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: autocomplete property

The **`autocomplete`** property of the `HTMLFormElement` interface indicates whether the value of the form's controls can be automatically completed by the browser. It reflects the `<form>` element's `autocomplete` attribute.

## Value

A string; the value `"off"` if explicitly set to `"off"`, and otherwise always `"on"`.

## Examples

```js
const formElement = document.getElementById("name");
console.log(formElement.autocomplete);
```

## See also

- `<form>`
- HTML `autocomplete` attribute
- ARIA `aria-autocomplete` attribute
- Turning off autocompletion
