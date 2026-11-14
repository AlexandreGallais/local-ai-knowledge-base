---
title: "KeyboardLayoutMap: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardlayoutmap/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardLayoutMap: size property

The **`size`** read-only property of
the `KeyboardLayoutMap` interface returns the number of elements in the
map.

The property is otherwise the same as `Map.prototype.size`.

## Value

A number.

## Examples

The following example get the count of the location- or layout-specific string and its associated keyboard code on an English QWERTY keyboard.

```js
navigator.keyboard.getLayoutMap().then((keyboardLayoutMap) => {
  console.log(keyboardLayoutMap.size);
});
```

## See also

- `Map.prototype.size`
