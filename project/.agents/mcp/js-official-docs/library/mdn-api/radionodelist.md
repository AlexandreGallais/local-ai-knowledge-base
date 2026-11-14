---
title: "RadioNodeList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/radionodelist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RadioNodeList

The **`RadioNodeList`** interface represents a collection of elements in a `<form>` returned by a call to `HTMLFormControlsCollection.namedItem()`.

## Instance properties

_The `RadioNodeList` interface inherits the properties of_ `NodeList`.

- `RadioNodeList.value`
    If the underlying element collection contains radio buttons, the `value` property represents the checked radio button. On retrieving the `value` property, the `value` of the currently `checked` radio button is returned as a string. If the collection does not contain any radio buttons or none of the radio buttons in the collection is in `checked` state, the empty string is returned. On setting the `value` property, the first radio button input element whose `value` property is equal to the new value will be set to `checked`.

## Instance methods

_The `RadioNodeList` interface inherits the methods of_ `NodeList`.

## See also

- The `<form>`, `` elements.
