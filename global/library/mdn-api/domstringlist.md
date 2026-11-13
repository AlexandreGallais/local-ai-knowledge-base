---
title: "DOMStringList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domstringlist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMStringList

The **`DOMStringList`** interface is a legacy type returned by some APIs and represents a non-modifiable list of strings (`DOMString`).

This interface was an attempt to create an unmodifiable list and only continues to be supported to not break code that's already using it. Modern APIs represent list structures using types based on JavaScript arrays, thus making many array methods available, and at the same time imposing additional semantics on their usage (such as making their items read-only).

These historical reasons do not mean that you as a developer should avoid `DOMStringList`. You don't create `DOMStringList` objects yourself, but you get them from APIs such as `Location.ancestorOrigins`, and these APIs are not deprecated. However, be careful of the semantic differences from a real array.

This interface is used in IndexedDB and in the `Location` API:

- `IDBDatabase.objectStoreNames`
- `IDBObjectStore.indexNames`
- `Location.ancestorOrigins`

## Instance properties

- `DOMStringList.length` (read-only)
    Returns the size of the list.

## Instance methods

- `DOMStringList.item()`
    Returns a string from the list with the given index.
- `DOMStringList.contains()`
    Returns a boolean indicating whether the given string is in the list.
