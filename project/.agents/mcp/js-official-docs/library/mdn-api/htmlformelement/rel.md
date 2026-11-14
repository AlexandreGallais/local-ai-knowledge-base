---
title: "HTMLFormElement: rel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/rel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: rel property

The **`rel`** property of the `HTMLFormElement` interface reflects the `rel` attribute. It is a string containing what kinds of links the HTML `<form>` element creates, as a space-separated list of enumerated values.

To retrieve the value as an array of tokens, use `HTMLFormElement.relList`.

## Value

A string.

## Examples

```js
const form = document.querySelector("form");
console.log(form.rel);

form.rel = "noopener noreferrer";
```

## See also

- `HTMLFormElement.relList`
- `HTMLLinkElement.rel`
- `HTMLAnchorElement.rel`
