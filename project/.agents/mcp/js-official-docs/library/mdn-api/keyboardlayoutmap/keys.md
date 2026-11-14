---
title: "KeyboardLayoutMap: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardlayoutmap/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardLayoutMap: keys() method

The **`keys()`** method of the `KeyboardLayoutMap` interface returns a new Iterator object that contains the keys for each index in the `KeyboardLayoutMap` object.

The method is otherwise the same as `Map.prototype.keys()`.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A new Iterator object.

## Examples

The following example iterates every keyboard code on an English QWERTY keyboard.

```js
navigator.keyboard.getLayoutMap().then((keyboardLayoutMap) => {
  for (const code of keyboardLayoutMap.keys()) {
    console.log(`${code} keyboard code`);
  }
});
```

## See also

- `Map.prototype.keys()`
