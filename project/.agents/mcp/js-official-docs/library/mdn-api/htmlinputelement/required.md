---
title: "HTMLInputElement: required property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/required/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: required property

The **`required`** property of the `HTMLInputElement` interface specifies that the user must fill in a value before submitting a form. It reflects the `` element's `required` attribute.

While the HTML boolean `required` attribute is ignored if the type is `hidden`, `range`, `color`, `submit`, `reset`, `button`, and `image`, the `required` property is `true` for these input types if the attribute is present, `false` otherwise.

If a required input doesn't have a value, the `ValidityState` object's read-only `valueMissing` property will be true.

## Value

A boolean.

## Examples

```js
const inputElement = document.getElementById("name");
console.log(inputElement.required);
inputElement.required = true;
```

## See also

- ``
- `HTMLInputElement.validity`
- `:required` pseudo-class
