---
title: "HTMLFieldSetElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfieldsetelement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFieldSetElement: name property

The **`name`** property of the `HTMLFieldSetElement` interface indicates the name of the `<fieldset>` element. It reflects the element's `name` attribute.

## Value

A string representing the element's name.

## Example

```js
const fs = document.querySelector("fieldset");
console.log(`Element's name: ${fs.name}`);
fs.name = "billing"; // sets or updates the element's name
```

## See also

- `HTMLFieldSetElement.elements`
- `HTMLFieldSetElement.disabled`
- `HTMLLegendElement`
- `HTMLFormElement`
- `<fieldset>`
- `<legend>`
- `<form>`
