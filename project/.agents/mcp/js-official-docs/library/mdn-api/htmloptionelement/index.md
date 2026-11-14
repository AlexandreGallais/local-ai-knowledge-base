---
title: "HTMLOptionElement: index property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionelement/index/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionElement: index property

The read-only **`index`** property of the `HTMLOptionElement` interface specifies the 0-based index of the element; that is, the position of the `<option>` within the list of options it belongs to, in tree-order, as an integer. If the `<option>` is not part of an option-list, the value is `0`.

## Value

A number.

## Examples

```js
const optionElement = document.getElementById("myOption");
console.log(optionElement.index);
```

## See also

- `<option>`
- `<select>`
- `<datalist>`
- `HTMLOptionElement.defaultSelected`
- `HTMLOptionElement.selected`
- `HTMLSelectElement.selectedIndex`
- `HTMLOptionsCollection`
