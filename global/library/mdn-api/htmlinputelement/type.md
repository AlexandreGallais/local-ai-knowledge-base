---
title: "HTMLInputElement: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: type property

The **`type`** property of the `HTMLInputElement` interface indicates the kind of data allowed in the `` element, for example a number, a date, or an email. Browsers will select the appropriate widget and behavior to help users to enter a valid value.

It reflects the `type` attribute of the `` element.

## Value

A string representing the type.

Its possible values are listed in the attribute's input types section.

## Example

### HTML

```html
<input id="input1" type="date" />
```

### JavaScript

```js
const inputElement = document.querySelector("#input1");
console.log(inputElement.type); // Output: "date"
```

## See also

- `HTMLTextAreaElement.type` property
- `HTMLButtonElement.type` property
