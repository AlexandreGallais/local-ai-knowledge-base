---
title: "XRInputSourceArray: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourcearray/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourceArray: values() method

The `XRInputSourceArray`
method **`values()`** returns a JavaScript
`iterator`
that can walk over the list of `XRInputSource` objects contained in the
array, from first to last.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A
JavaScript `iterator` that
can be used to walk through the list of `XRInputSource` objects in the
array, starting with the first entry (at index 0) and proceeding straight through the
list.

## Examples

This example snippet walks through each input and calls the
function `checkInput()` with each returned value.

```js
for (const source of xrSession.inputSources.values()) {
  checkInput(source);
}
```

Here,
`for...of`
is used to iterate over the array's contents. Each pass <example-value> the loop,
`source` is the next `XRInputSource` in the list. The loop exits
once every input has been delivered to `checkInput()`.

## See also

- Inputs and input sources
- The `XRInputSourceArray` method `keys()`
- The
  `Array` method `values()`
- `XRInputSource`
