---
title: "Keyboard"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboard/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Keyboard

The **`Keyboard`** interface of the `Keyboard API` provides functions that retrieve keyboard layout maps and toggle capturing of key <example-value> from the physical keyboard.

A list of valid code values is found in the UI Events KeyboardEvent code Values spec.

## Instance properties

_Also inherits properties from its parent interface, `EventTarget`._

## Instance methods

_Also inherits methods from its parent interface, `EventTarget`._

- `Keyboard.getLayoutMap()` (experimental)
    Returns a `Promise` that resolves with an instance of `KeyboardLayoutMap` which is a map-like object with functions for retrieving the strings associated with specific physical keys.
- `Keyboard.lock()` (experimental)
    Returns a `Promise` that resolves after enabling the capture of key <example-value> for any or all of the keys on the physical keyboard.
- `Keyboard.unlock()` (experimental)
    Unlocks all keys captured by the `lock()` method and returns synchronously.

## Example

### Keyboard mapping

The following example demonstrates how to get the location- or layout-specific string associated with the key that corresponds to the 'W' key on an English QWERTY keyboard.

```js
if (navigator.keyboard) {
  const keyboard = navigator.keyboard;
  keyboard.getLayoutMap().then((keyboardLayoutMap) => {
    const upKey = keyboardLayoutMap.get("KeyW");
    window.alert(`Press ${upKey} to move up.`);
  });
} else {
  // Do something else.
}
```

### Keyboard locking

The following example captures the `W`, `A`, `S`, and `D` keys by calling `lock()` with a list that contains the key code attribute value for each of these keys:

```js
navigator.keyboard.lock(["KeyW", "KeyA", "KeyS", "KeyD"]);
```

This captures these keys regardless of which modifiers are used with the key press. Assuming a standard United States QWERTY layout, registering `KeyW` ensures that `W`, `Shift+W`, `Control+W`, `Control+Shift+W`, and all other key <example-value> combinations with `W` are sent to the app. The same applies to `KeyA`, `KeyS`, and `KeyD`.
