---
title: "HTMLOptionElement: text property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionelement/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionElement: text property

The **`text`** property of the `HTMLOptionElement` represents the text inside the `<option>` element.
This property represents the same information as `Node.textContent`.

> **Note:**
> If the element has a `label`, the text inside the `<option>` is not visually rendered. In this case, the `text` property can still be used to set the content, but it will have no visible effect.

## Value

A string.

## Example

```js
const optionElement = document.getElementById("exampleOption");
console.log(`Text property: ${optionElement.text}`);
optionElement.text = "Updated text";
```

## See also

- `<select>`
- `<datalist>`
- `<optgroup>`
- `HTMLOptionElement.value`
- `HTMLOptionElement.label`
- `HTMLScriptElement.text`
- `HTMLAnchorElement.text`
