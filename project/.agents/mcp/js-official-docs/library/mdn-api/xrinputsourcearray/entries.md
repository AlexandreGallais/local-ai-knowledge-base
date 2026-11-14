---
title: "XRInputSourceArray: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourcearray/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourceArray: entries() method

The `XRInputSourceArray` interface's
**`entries()`** method returns a JavaScript
`iterator`
which can then be used to iterate over the key/value pairs in the input source
array. Each key is the index of an input source in the array, and each value is
the corresponding `XRInputSource` object.

Most frequently, you will use this in tandem with statements such as
`for...of`.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

An `iterator`
which yields an `[index, inputSource]` pair for each `XRInputSource` object
included in the input source array.

## Examples

This example snippet gets the list of inputs for a session and tries to handle each
type of input device it supports using.

```js
let sources = xrSession.inputSources;

for (const [index, input] of sources.entries()) {
  if (input.gamepad) {
    checkGamepad(input.gamepad);
  } else if (
    input.targetRayMode === "tracked-pointer" &&
    input.handedness === player.handedness
  ) {
    /* Handle main hand controller */
    handleMainHandInput(input);
  } else {
    /* Handle other inputs */
  }
}
```

For each input in the list, gamepad inputs are dispatched to
a `checkGamepad()` with the input's `Gamepad` object, taken from
its `gamepad` property, as an input

For other devices, we look for `tracked-pointer` devices in the player's
main hand, dispatching those to a `handleMainHandInput()` method.
