---
title: "HTMLInputElement: min property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/min/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: min property

The **`min`** property of the `HTMLInputElement` interface reflects the `` element's `min` attribute, which generally defines the minimum valid value for a numeric or date-time input. If the attribute is not explicitly set, the `min` property is an empty string.

## Value

A string representing the element's `min` value or an empty string if no `min` is explicitly set.

## Example

```js
const inputElement = document.querySelector("#range");
console.log(inputElement.min); // the current value of the min attribute
inputElement.min = 0; // sets the min value to "0"
```

## See also

- `` of type `<range>`, `<number>`, `<date>`, `<month>`, `<week>`, and `<time>`
- `HTMLInputElement.max`
- `HTMLInputElement.value`
- `HTMLInputElement.type`
