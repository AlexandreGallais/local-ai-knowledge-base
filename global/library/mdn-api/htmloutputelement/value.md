---
title: "HTMLOutputElement: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloutputelement/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOutputElement: value property

The **`value`** property of the `HTMLOutputElement` interface represents the value of the `<output>` element as a string, or the empty string if no value is set. It returns or sets the contents of the element, similar to the `textContent` property.

> **Note:**
> When the `value` property of an `<output>` element is set, the element goes into value mode and the default value is accessible only through the `HTMLOutputElement.defaultValue` property.

## Value

A string containing the contents of the `<output>` element.

## Examples

```js
const outputElement = document.getElementById("log");
console.log(`value: ${outputElement.value}`);
```

## See also

- `<output>`
- `HTMLOutputElement.defaultValue`
- `HTMLOutputElement.labels`
- `HTMLOutputElement.htmlFor`
