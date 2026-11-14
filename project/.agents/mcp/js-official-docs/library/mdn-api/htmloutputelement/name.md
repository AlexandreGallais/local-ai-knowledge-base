---
title: "HTMLOutputElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloutputelement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOutputElement: name property

The **`name`** property of the `HTMLOutputElement` interface indicates the name of the `<output>` element. It reflects the element's `name` attribute.

## Value

A string representing the element's name.

## Example

```js
const outputElement = document.querySelector("#log");
console.log(`Element's name: ${outputElement.name}`);
outputElement.name = "sum"; // sets or updates the element's name
```

## See also

- `HTMLOutputElement.defaultValue`
- `HTMLOutputElement.htmlFor`
- `HTMLOutputElement.labels`
