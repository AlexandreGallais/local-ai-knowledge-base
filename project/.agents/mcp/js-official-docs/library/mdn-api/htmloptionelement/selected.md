---
title: "HTMLOptionElement: selected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionelement/selected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionElement: selected property

The **`selected`** property of the `HTMLOptionElement` interface specifies the current selectedness of the element; that is, whether the `<option>` is selected or not.

The presence of the HTML `selected` attribute indicates the option is selected by default. It does not indicate whether this option is currently selected: if the option's state changes, the `selected` content attribute does not reflect the change; only the `HTMLOptionElement`'s `selected` IDL property is updated. The `selected` attribute is reflected by the `defaultSelected` property.

## Value

A boolean.

## Examples

```js
const optionElement = document.getElementById("water");
console.log(optionElement.selected);
```

## See also

- `<option>`
- `<select>`
- `HTMLOptionElement.defaultSelected`
- `HTMLOptionElement.index`
- `HTMLOptionsCollection`
- `HTMLSelectElement.selectedIndex`
