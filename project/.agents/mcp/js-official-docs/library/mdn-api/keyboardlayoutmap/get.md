---
title: "KeyboardLayoutMap: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardlayoutmap/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardLayoutMap: get() method

The **`get()`** method of the
`KeyboardLayoutMap` interface returns the element with the given
key.

A list of valid keys is found in the UI Events KeyboardEvent code Values specification.

The method is otherwise the same as `Map.prototype.get()`.

## Syntax

```js
get(key)
```

### Parameters

- `key`
    The key of the item to return from the map.

### Return value

The value of the specified key.

## Examples

The following example demonstrates how to get the location- or layout-specific string associated with the keyboard code that corresponds to the 'W' key on an English QWERTY keyboard.

```js
navigator.keyboard.getLayoutMap().then((keyboardLayoutMap) => {
  const upKey = keyboardLayoutMap.get("KeyW");
  window.alert(`Press ${upKey} to move up.`);
});
```

## See also

- `Map.prototype.get()`
