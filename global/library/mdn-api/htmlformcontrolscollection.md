---
title: "HTMLFormControlsCollection"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformcontrolscollection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormControlsCollection

The **`HTMLFormControlsCollection`** interface represents a _collection_ of HTML _form control elements_, returned by the `HTMLFormElement` interface's `elements` property.

The collection returned by `HTMLFormElement.elements` includes the form's associated listed form controls. See `HTMLFormElement.elements` for the list of listed form controls and an explanation of form association.

This interface replaces one method from `HTMLCollection`, on which it is based.

## Instance properties

_This interface inherits the properties of its parent, `HTMLCollection`._

## Instance methods

_This interface inherits the methods of its parent, `HTMLCollection`._

- `HTMLFormControlsCollection.namedItem()`
    Returns the `RadioNodeList` or the `Element` in the collection whose `name` or `id` matches the specified name, or `null` if no nodes match. Note that this version of `namedItem()` hides the one inherited from `HTMLCollection`. Like that method, using the JavaScript array bracket syntax with a `String`, as in `collection["value"]`, is equivalent to `collection.namedItem("value")`.

## See also

- `HTMLCollection`, `RadioNodeList`, `HTMLOptionsCollection`
