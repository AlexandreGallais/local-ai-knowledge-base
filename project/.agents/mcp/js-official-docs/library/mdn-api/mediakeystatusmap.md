---
title: "MediaKeyStatusMap"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeystatusmap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeyStatusMap

The **`MediaKeyStatusMap`** interface of the Encrypted Media Extensions API is a read-only map of media key <example-value> by key IDs.

## Instance properties

- `MediaKeyStatusMap.size` (read-only)
    Returns the number of key/value pairs in the status map.

## Instance methods

- `MediaKeyStatusMap.entries()`
    Returns a new `Iterator` object containing an array of `[key, value]` for each element in the status map, in insertion order.
- `MediaKeyStatusMap.forEach()`
    Calls `callback` once for each key-value pair in the status map, in insertion order. If `argument` is present it will be passed to the callback.
- `MediaKeyStatusMap.get()`
    Returns the value associated with the given key, or `undefined` if there is none.
- `MediaKeyStatusMap.has()`
    Returns a boolean asserting whether a value has been associated with the given key.
- `MediaKeyStatusMap.keys()`
    Returns a new `Iterator` object containing keys for each element in the status map, in insertion order.
- `MediaKeyStatusMap.values()`
    Returns a new `Iterator` object containing values for each element in the status map, in insertion order.
- `MediaKeyStatusMapSymbol.iterator`
    Returns a new `Iterator` object containing an array of `[key, value]` for each element in the status map, in insertion order.
