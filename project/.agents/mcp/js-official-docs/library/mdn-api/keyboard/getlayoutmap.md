---
title: "Keyboard: getLayoutMap() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboard/getlayoutmap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Keyboard: getLayoutMap() method

The **`getLayoutMap()`** method of the
`Keyboard` interface returns a `Promise` that resolves with
an instance of `KeyboardLayoutMap` which is a map-like object with
functions for retrieving the strings associated with specific physical keys.

## Syntax

```js
getLayoutMap()
```

### Parameters

None.

### Return value

A `Promise` that resolves with an instance of
`KeyboardLayoutMap`.

### Exceptions

- `SecurityError` `DOMException`
    Thrown if the call is blocked by a permission policy.

## Examples

The following example demonstrates how to get the location- or layout-specific string
associated with the key that corresponds to the 'W' key on an English QWERTY keyboard.

```js
const keyboard = navigator.keyboard;
keyboard.getLayoutMap().then((keyboardLayoutMap) => {
  const upKey = keyboardLayoutMap.get("KeyW");
  window.alert(`Press ${upKey} to move up.`);
});
```

## See also

- `Intl`
