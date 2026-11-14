---
title: "XRInputSourceArray: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourcearray/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourceArray: keys() method

The **`keys()`** method in the
`XRInputSourceArray` interface returns a JavaScript
`iterator`
which can then be used to iterate over the keys used to reference each item in the array
of input sources.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A
JavaScript `iterator` that
can be used to walk through the keys for each entry in the list of input sources. The
values returned by the iterator are the indexes of each entry in the list; that is, the
numbers 0, 1, 2, and so forth through the index of the last item in the list.

## Examples

This example snippet gets the list of inputs for a session and tries to handle each
type of input device it supports using.

```js
for (const inputIdx of xrSession.inputSources.keys()) {
  /* the keys are the indexes into the list of inputs */
  checkInput(xrSession.inputSources[inputIdx]);
}
```

Here,
`for...of`
is used to iterate over each of the keys. For each key, the input is retrieved using the
index with array notation: `xrSession.inputSources[inputIdx]`.

## See also

- Inputs and input sources
- The `XRInputSourceArray` method `values()`
- The `Array` method `keys()`
- `XRInputSource`
