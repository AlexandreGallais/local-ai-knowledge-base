---
title: "HTMLOptionsCollection: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionscollection/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionsCollection: length property

The **`length`** property of the `HTMLOptionsCollection` interface returns the number of `<option>` elements in the collection. The property can get or set the size of the collection.

When setting `length` to a value smaller than the current, the options collection gets truncated; otherwise, new blank `<option>` elements are appended to the end of the `<select>`.

## Value

An integer value representing the number of items in this `HTMLOptionsCollection`.

## Example

```js
const optCollection = document.getElementById("fruits").options;
const origLength = optCollection.length;
optCollection.length += 50; // adds 50 blank options to the collection
optCollection.length = origLength; // truncates the list back to the original size
```

## See also

- `HTMLOptionsCollection.add()`
- `HTMLOptionsCollection.remove()`
- `HTMLOptionsCollection.selectedIndex`
- `HTMLSelectElement`
- `HTMLOptGroupElement`
- `HTMLCollection.length`
