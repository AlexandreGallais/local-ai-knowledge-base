---
title: "AudioParamMap"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioparammap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioParamMap

The **`AudioParamMap`** interface of the Web Audio API represents an iterable and read-only set of multiple audio parameters.

An `AudioParamMap` instance is a read-only `Map`-like object, in which each key is the name string for a parameter, and the corresponding value is an `AudioParam` containing the value of that parameter.

## Instance properties

The following methods are available to all read-only `Map`-like objects (the below links are to the `Map` global object reference page).

- `size`
    Returns the number of entries in the map.

## Instance methods

The following methods are available to all read-only `Map`-like objects (the below links are to the `Map` global object reference page).

- `entries()`
    Returns a new iterator object that yields entries in `[key, value]` pairs in the map in insertion order.
- `forEach()`
    Calls a provided callback function once for each value and key <example-value> in the map, in insertion order.
- `get()`
    Returns the `AudioParam` value associated with the string key, or `undefined` if there is none.
- `has()`
    Returns a boolean indicating whether a key is present in the map or not.
- `keys()`
    Returns a new iterator object that yields the string keys in the map in insertion order.
- `values()`
    Returns a new iterator object that yields the `AudioParam` values in the map in insertion order.
