---
title: "HTMLButtonElement: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: type property

The **`type`** property of the `HTMLButtonElement` interface is a string that indicates the behavior type of the `` element.

It reflects the `type` attribute of the `` element.

## Value

A string representing the type.

Its possible values are listed in the attribute's button types section.

## Example

### HTML

```html
<button id="button" type="reset">type</button>
```

### JavaScript

```js
const buttonElement = document.querySelector("#button");
console.log(buttonElement.type); // "reset"
```

## See also

- `HTMLTextAreaElement.type` property
- `HTMLInputElement.type` property
