---
title: "NamedNodeMap"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/namednodemap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NamedNodeMap

The **`NamedNodeMap`** interface represents a collection of `Attr` objects. Objects inside a `NamedNodeMap` are not in any particular order, unlike `NodeList`, although they may be accessed by an index as in an array.

A `NamedNodeMap` object is _live_ and will thus be auto-updated if changes are made to its contents internally or elsewhere.

> **Note:**
> Although called `NamedNodeMap`, this interface doesn't deal with `Node` objects but with `Attr` objects, which are a specialized class of `Node` objects.

## Instance properties

_This interface doesn't inherit any property._

- `NamedNodeMap.length` (read-only)
    Returns the number of objects in the map.

## Instance methods

_This interface doesn't inherit any method._

- `NamedNodeMap.getNamedItem()`
    Returns an `Attr`, corresponding to the given name.
- `NamedNodeMap.setNamedItem()`
    Replaces, or adds, the `Attr` identified in the map by the given name.
- `NamedNodeMap.removeNamedItem()`
    Removes the `Attr` identified by the given map.
- `NamedNodeMap.item()`
    Returns the `Attr` at the given index, or `null` if the index is higher or equal to the number of nodes.
- `NamedNodeMap.getNamedItemNS()`
    Returns an `Attr` identified by a namespace and related local name.
- `NamedNodeMap.setNamedItemNS()`
    Replaces, or adds, the `Attr` identified in the map by the given namespace and related local name.
- `NamedNodeMap.removeNamedItemNS()`
    Removes the `Attr` identified by the given namespace and related local name.

## See also

- `Element.attributes`
