---
title: "HTMLOptionsCollection"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionscollection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionsCollection

The **`HTMLOptionsCollection`** interface represents a collection of `<option>` HTML elements (in document order) and offers methods and properties for selecting from the list as well as optionally altering its items. This object is returned only by the `options` property of select.

## Instance properties

- `HTMLOptionsCollection.length`
    Returns or sets the number of options in the collection.
- `HTMLOptionsCollection.selectedIndex`
    The index number of the first selected `<option>` element. The value `-1` indicates no element is selected.

## Instance methods

_This interface inherits the methods of its parent, `HTMLCollection`._

- `HTMLOptionsCollection.add()`
    Appends an `HTMLOptionElement` or `HTMLOptGroupElement` element to the collection of `option` elements or adds it before a specified option.
- `HTMLOptionsCollection.remove()`
    Removes the element at the specified index from the options collection.

## See also

- `HTMLOptionElement`
- `HTMLCollection`
- `HTMLOptGroupElement`
- `HTMLSelectElement`
- Indexed collections guide
