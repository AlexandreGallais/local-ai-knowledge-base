---
title: "HTMLOptionElement: defaultSelected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionelement/defaultselected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionElement: defaultSelected property

The **`defaultSelected`** property of the `HTMLOptionElement` interface specifies the default selected state of the element. This property reflects the `<option>` element's `selected` attribute. The presence of the `selected` attribute sets the `defaultSelected` property to `true`.

## Value

A boolean.

## Examples

```js
const optionElement = document.getElementById("water");
console.log(optionElement.defaultSelected);
```

## See also

- `<option>`
- `HTMLOptionElement.selected`
- `HTMLOptionElement.index`
- `HTMLOptionsCollection`
- `:default`
