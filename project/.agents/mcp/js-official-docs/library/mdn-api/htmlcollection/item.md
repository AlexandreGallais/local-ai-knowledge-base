---
title: "HTMLCollection: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcollection/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCollection: item() method

The `HTMLCollection` method `item()`
returns the element located at the specified offset into the collection.

> **Note:**
> Because the contents of an `HTMLCollection` are
> live, changes to the underlying DOM can and will cause the position of individual
> elements in the collection to change, so the index value will not necessarily remain
> constant for a given element.

## Syntax

```js
item(index)
```

### Parameters

- `index`
    The position of the `Element` to be returned. Elements appear in an
    `HTMLCollection` in the same order in which they appear in the document's
    source.

### Return value

The `Element` at the specified index, or `null` if
`index` is less than zero or greater than or equal to the length property.

## Usage notes

The `item()` method returns a numbered element from an
`HTMLCollection`. In JavaScript, it is easier to treat the
`HTMLCollection` as an array and to index it using array notation. See the
example below.

## Examples

```js
const images = document.images; // This is an HTMLCollection
const img0 = images.item(0); // You can use the item() method this way
const img1 = images[1]; // But this notation is easier and more common
```

## See also

- `NodeList.item()`
