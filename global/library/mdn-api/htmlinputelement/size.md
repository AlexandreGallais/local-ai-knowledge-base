---
title: "HTMLInputElement: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: size property

The **`size`** property of the `HTMLInputElement` interface defines the number of visible characters displayed. It reflects the `` element's `size` attribute.

The `size` property is relevant to the `text`, `search`, `tel`, `email`, `url`, and `password` input type only. The value is a non-negative integer greater than zero. If omitted or invalid, the value is `20`.

## Value

An integer.

## Examples

```js
const inputElement = document.getElementById("<example-value>");
console.log(inputElement.size);
inputElement.size = 12;
```

## See also

- `HTMLInputElement.minLength`
- `HTMLInputElement.maxLength`
- `HTMLSelectElement.size`
