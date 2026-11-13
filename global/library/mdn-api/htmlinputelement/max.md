---
title: "HTMLInputElement: max property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/max/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: max property

The **`max`** property of the `HTMLInputElement` interface reflects the `` element's `max` attribute, which generally defines the maximum valid value for a numeric or date-time input. If the attribute is not explicitly set, the `max` property is an empty string.

## Value

A string representing the element's `max` value or an empty string if no `max` is explicitly set.

## Example

```js
const inputElement = document.querySelector("#time");
console.log(inputElement.max); // the current value of the max attribute
inputElement.max = "18:00:00"; // sets the max value to 6pm
```

## See also

- `` of type `<range>`, `<number>`, `<date>`, `<month>`, `<week>`, and `<time>`
- `HTMLInputElement.min`
- `HTMLInputElement.value`
- `HTMLInputElement.type`
