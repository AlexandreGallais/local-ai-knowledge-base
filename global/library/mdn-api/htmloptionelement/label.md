---
title: "HTMLOptionElement: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionelement/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionElement: label property

The **`label`** property of the `HTMLOptionElement` represents the text displayed for an option in a `<select>` element or as part of a list of suggestions in a `<datalist>` element. It reflects the `<option>` element's `label` attribute.

If the attribute is omitted or the empty string, the `label` property returns the element's `text` content.

## Value

A string.

## Example

```js
const optionElement = document.getElementById("exampleOption");
console.log(`Option's label: ${optionElement.label}`);
optionElement.label = "Updated label";
```

## See also

- `HTMLOptionElement.value`
- `<select>`
- `<datalist>`
- `<optgroup>`
