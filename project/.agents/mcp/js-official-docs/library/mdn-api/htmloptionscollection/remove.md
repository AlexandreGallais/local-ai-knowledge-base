---
title: "HTMLOptionsCollection: remove() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionscollection/remove/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionsCollection: remove() method

The **`remove()`** method of the `HTMLOptionsCollection` interface removes the `<option>` element specified by the index from this collection.

## Syntax

```js
remove(index)
```

### Parameters

- `index`
    A zero-based integer for the index of the `HTMLOptionElement` in the `HTMLOptionsCollection`. If the index is not found the method has no effect.

### Return value

None (`undefined`).

## Examples

```js
const optionList = document.querySelector("select").options;
const listLength = optionList.length;
optionList.remove(listLength - 1); // removes the last item
optionList.remove(0); // removes the first item
```

## See also

- `HTMLOptionsCollection.add()`
- `HTMLOptionsCollection.length`
- `HTMLOptionsCollection.selectedIndex`
- `HTMLOptionsCollection`
- `Element.remove`
