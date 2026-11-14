---
title: "KeyboardLayoutMap"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardlayoutmap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardLayoutMap

The **`KeyboardLayoutMap`** interface of the `Keyboard API` is a read-only object with functions for retrieving the string associated with specific physical keys.

A `KeyboardLayoutMap` instance is a read-only `Map`-like object, in which each key is a string identifying the unique physical key on the keyboard (a "key code"), and the corresponding value is the associated key <example-value> value (which may be affected by the keyboard layout, and so on).

A list of valid keys is found in the UI Events KeyboardEvent code Values specification.

## Instance properties

- `KeyboardLayoutMap.size` (read-only) (experimental)
    Returns the number of elements in the `KeyboardLayoutMap` object.

## Instance methods

- `KeyboardLayoutMapSymbol.iterator` (experimental)
    Returns a new Iterator object that contains the key/value pairs.
- `KeyboardLayoutMap.entries()` (experimental)
    Returns a new Iterator object that contains the key/value pairs.
- `KeyboardLayoutMap.forEach()` (experimental)
    Executes a provided function once for each element of `KeyboardLayoutMap`.
- `KeyboardLayoutMap.get()` (experimental)
    Returns the element with the given key from the `KeyboardLayoutMap` object.
- `KeyboardLayoutMap.has()` (experimental)
    Returns a boolean indicating whether the `KeyboardLayoutMap` object has an element with the specified key.
- `KeyboardLayoutMap.keys()` (experimental)
    Returns a new Iterator object that contains the keys for each index in the `KeyboardLayoutMap` object.
- `KeyboardLayoutMap.values()` (experimental)
    Returns a new Iterator object that contains the values for each index in the `KeyboardLayoutMap` object.

## Examples

The following example demonstrates how to get the location- or layout-specific string associated with the keyboard code that corresponds to the 'W' key on an English QWERTY keyboard.

```js
navigator.keyboard.getLayoutMap().then((keyboardLayoutMap) => {
  const upKey = keyboardLayoutMap.get("KeyW");
  window.alert(`Press ${upKey} to move up.`);
});
```
