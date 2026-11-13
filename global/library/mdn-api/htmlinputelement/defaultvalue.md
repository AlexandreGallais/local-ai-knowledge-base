---
title: "HTMLInputElement: defaultValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/defaultvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: defaultValue property

The **`defaultValue`** property of the `HTMLInputElement` interface indicates the original (or default) value of the `` element. It reflects the element's `value` attribute.

## Value

A string representing the default, or original, value of the `` element.

## Example

Given the following HTML:

```html
<label for="planet">Which planet were you born on?</label>
<input id="planet" type="text" value="Azarath" />
```

The following will provide the same results, no matter what the user enters into the text input.

```js
const inputElement = document.querySelector("#planet");
console.log(`Original value: ${inputElement.defaultValue}`); // "Original value: Azarath"
```

## See also

- `HTMLInputElement.value`
- `HTMLInputElement.type`
