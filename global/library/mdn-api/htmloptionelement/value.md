---
title: "HTMLOptionElement: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionelement/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionElement: value property

The **`value`** property of the `HTMLOptionElement` interface represents the value of the `<option>` element as a string, or the empty string if no value is set. It reflects the element's `value` attribute, if present. Otherwise, it returns or sets the contents of the element, similar to the `textContent` property.

## Value

A string containing the `value` attribute value, if present, or the contents of the element.

## Examples

```js
const optionElement = document.querySelector("datalist option:first-of-type");
const oldValue = optionElement.value;
optionElement.value = oldValue.toUpperCase();
```

## See also

- `<option>`
- `HTMLOptionElement.selected`
- `HTMLOptionElement.defaultSelected`
- `HTMLOptionElement.label`
