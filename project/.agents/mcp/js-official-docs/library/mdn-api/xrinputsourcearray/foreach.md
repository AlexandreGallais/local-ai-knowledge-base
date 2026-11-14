---
title: "XRInputSourceArray: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourcearray/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourceArray: forEach() method

The `XRInputSourceArray`
method **`forEach()`** executes the specified callback once for
each input source in the array, starting at index 0 and progressing until the end of the
list.

## Syntax

```js
forEach(callback)
forEach(callback, thisArg)
```

### Parameters

- `callback`
    A function to execute once for each entry in the
    array `xrInputSourceArray`. The callback accepts up to three parameters:
    - `currentValue`
        A `XRInputSource` object which is the value of the item from within
        the `xrInputSourceArray` which is currently being processed.
    - `currentIndex` (optional)
        An integer value providing the index into the array at which the element given
        by `currentValue` is located. If you don't need to know the index
        number, you can omit this.
    - `sourceList` (optional)
        The `XRInputSourceArray` object which is being processed. If you
        don't need this information, you may omit this.

- `thisArg` (optional)
    The value to be used for
    `this`
    while executing the callback. Note that if you use arrow function notation (`=>`) to provide the callback, you can
    omit `thisArg`, since all arrow functions lexically bind `this`.

### Return value

Undefined.

## Examples

This example snippet gets the list of inputs for a session and tries to handle each
type of input device it supports using.

```js
let inputSources = xrSession.inputSources;

inputSources.forEach((input) => {
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
});
```

For each input in the list, the callback dispatches gamepad inputs to
a `checkGamepad()` with the input's `Gamepad` object, taken from
its `gamepad` property, as an input

For other devices, we look for `tracked-pointer` devices in the player's
main hand, dispatching those to a `handleMainHandInput()` method.

## See also

- Inputs and input sources
- The
  `Array` method `forEach()`
- `XRInputSource`
