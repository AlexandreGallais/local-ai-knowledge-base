---
title: "HTMLButtonElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: name property

The **`name`** property of the `HTMLButtonElement` interface indicates the name of the `` element or the empty string if the element has no name. It reflects the element's `name` attribute.

## Value

A string representing the element's name.

## Example

```js
const buttonElement = document.querySelector("#myButton");
console.log(`Element's name: ${buttonElement.name}`);
buttonElement.name = "newName";
```

## See also

- `HTMLButtonElement.value`
- `HTMLButtonElement.type`
