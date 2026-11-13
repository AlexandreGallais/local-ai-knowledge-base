---
title: "HTMLInputElement: step property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/step/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: step property

The **`step`** property of the `HTMLInputElement` interface indicates the step by which numeric or date-time `` elements can change. It reflects the element's `step` attribute. Valid values include the string `"any"` or a string containing a positive floating point number. If the attribute is not explicitly set, the `step` property is an empty string.

## Value

A string representing the element's `step` value or an empty string if no step is explicitly set.

## Example

```js
const inputElement = document.querySelector('[type="number"]');
console.log(inputElement.step); // the current value of the step attribute
inputElement.step = 0.1; // sets the step value to "0.1"
inputElement.step = "any"; // sets the step to "any"
```

## See also

- `` of type `<range>`, `<number>`, `<date>`, `<month>`, `<week>`, and `<time>`
- `HTMLInputElement.value`
- `HTMLInputElement.type`
