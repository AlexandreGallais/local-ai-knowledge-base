---
title: "DOMStringList: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domstringlist/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMStringList: item() method

The **`item()`** method returns a string from a `DOMStringList` by index.

## Syntax

```js
item(index)
```

JavaScript also offers an array-like bracketed syntax for obtaining an item from a
`DOMStringList` by index:

```js
list[index];
```

### Parameters

- `index`
    the index of the string to get. The index is zero-based.

### Return value

The string at the index position in the `DOMStringList`; otherwise `null` if the provided index is out of range.

### Exceptions

- `TypeError`
    Thrown if no argument is provided.
