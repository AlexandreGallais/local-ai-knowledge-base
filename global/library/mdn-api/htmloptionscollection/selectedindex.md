---
title: "HTMLOptionsCollection: selectedIndex property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionscollection/selectedindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionsCollection: selectedIndex property

The **`selectedIndex`** property of the `HTMLOptionsCollection` interface is the numeric index of the first selected `<option>` element, if any, or `−1` if no `<option>` is selected. Setting this property selects the option at that index and deselects all other options in this collection, while setting it to `-1` deselects any currently selected elements. It is exactly equivalent to the `selectedIndex` property of the `HTMLSelectElement` that owns this collection.

## Value

A number.

## Examples

```js
const optionColl = document.getElementById("select").options;
console.log(`selected option: ${optionColl.selectedIndex}`); // the index of the first selected option, or -1 if no option is selected
optionColl.selectedIndex = 0; // selects the first item
optionColl.selectedIndex = -1; // deselects any selected option
```

## See also

- `HTMLOptionsCollection.length`
- `HTMLOptionsCollection.add()`
- `HTMLOptionsCollection.remove()`
- `HTMLOptionsCollection`
- `HTMLOptionElement`
- `HTMLOptGroupElement`
- `HTMLSelectElement`
