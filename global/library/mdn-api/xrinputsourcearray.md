---
title: "XRInputSourceArray"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourcearray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourceArray

The interface **`XRInputSourceArray`** represents a _live_ list of WebXR input sources, and is used as the return value of the `XRSession` property `inputSources`. Each entry is an `XRInputSource` representing one input device connected to the WebXR system.

In addition to being able to access the input sources in the list using standard array notation (that is, with index numbers inside square brackets), methods are available to allow the use of iterators and the `forEach()` method is also available.

## Instance properties

_The following properties are available on `XRInputSourceArray` objects._

- `length` (read-only) (experimental)
    The number of `XRInputSource` objects in the list.

## Instance methods

_The following methods are available on `XRInputSourceArray` objects. You may also use the features of the `Symbol` type._

- `entries()` (experimental)
    Returns an `iterator` you can use to walk the list of key/value pairs in the list. Each item returned is an array whose first value is the index and whose second value is the `XRInputSource` at that index.
- `forEach()` (experimental)
    Iterates over each item in the list, in order from first to last.
- `keys()` (experimental)
    A list of the keys corresponding to the entries in the input source list.
- `values()` (experimental)
    Returns an `iterator` you can use to go through all the values in the list. Each item is a single `XRInputSource` object.

In addition to these methods, you may use array notation to access items in the list by index For example, the snippet of code below calls a function `handleInput()`, passing into it the first item in the input source list, if the list isn't empty.

```js
let sources = xrSession.inputSources;
if (sources.length > 0) {
  handleInput(sources[0]);
}
```
