---
title: "KeyboardLayoutMap: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardlayoutmap/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardLayoutMap: entries() method

The **`entries()`** method of the `KeyboardLayoutMap` interface returns a new Iterator object that contains the key/value pairs, in the same order as that provided by a `for...in` loop (the difference being that a `for-in` loop enumerates properties in the prototype chain as well).

The method is otherwise the same as `Map.prototype.entries()`.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

A new Iterator object.

## Examples

The following example iterates every location- or layout-specific string and its associated keyboard code on an English QWERTY keyboard.

```js
navigator.keyboard.getLayoutMap().then((keyboardLayoutMap) => {
  for (const [code, key] of keyboardLayoutMap.entries()) {
    console.log(`${code} keyboard code represents ${key} key`);
  }
});
```

## See also

- `Map.prototype.entries()`
