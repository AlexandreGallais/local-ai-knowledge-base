---
title: "KeyboardLayoutMap: has() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardlayoutmap/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardLayoutMap: has() method

The **`has()`** method of the
`KeyboardLayoutMap` interface returns a boolean indicating whether the
object has an element with the specified key.

A list of valid keys is found in
the UI Events KeyboardEvent code Values specification.

The method is otherwise the same as `Map.prototype.has()`.

## Syntax

```js
has(key)
```

### Parameters

- `key`
    The key of an element to search for in the map.

### Return value

A `Boolean` indicating whether the specified key was found.

## Examples

The following example checks whether the location- or layout-specific string associated with the keyboard code that corresponds to the 'W' key on an English QWERTY keyboard exists.

```js
navigator.keyboard.getLayoutMap().then((keyboardLayoutMap) => {
  console.log(keyboardLayoutMap.has("KeyW"));
});
```

## See also

- `Map.prototype.has()`
