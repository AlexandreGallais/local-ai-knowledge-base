---
title: "KeyboardLayoutMap: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardlayoutmap/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardLayoutMap: values() method

The **`values()`** method of the `KeyboardLayoutMap` interface returns a new Iterator object that contains the values for each index in the `KeyboardLayoutMap` object.

The method is otherwise the same as `Map.prototype.values()`.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new Iterator object.

## Examples

The following example iterates every location- or layout-specific string on an English QWERTY keyboard.

```js
navigator.keyboard.getLayoutMap().then((keyboardLayoutMap) => {
  for (const key of keyboardLayoutMap.values()) {
    console.log(`${key} key`);
  }
});
```

## See also

- `Map.prototype.values()`
