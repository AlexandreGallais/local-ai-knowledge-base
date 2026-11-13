---
title: "KeyboardLayoutMap: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardlayoutmap/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardLayoutMap: forEach() method

The **`forEach()`** method of the
`KeyboardLayoutMap` interface executes a provided function once for
each element of the map.

The method is otherwise the same as `Map.prototype.forEach()`.

## Syntax

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    The function to execute for each element, taking three arguments:
    - `currentValue`
        The value of the current element being processed.
    - `index` (optional)
        The index of the current element being processed.
    - `array` (optional)
        The KeyboardLayoutMap that `forEach()` is being called on.

- `thisArg` (optional)
    Value to use as **`this`** (i.e., the reference
    `Object`) when executing `callback`.

### Return value

None (`undefined`).

## Examples

The following example iterates every location- or layout-specific string and its associated keyboard code on an English QWERTY keyboard.

```js
navigator.keyboard.getLayoutMap().then((keyboardLayoutMap) => {
  keyboardLayoutMap.forEach((key, code) => {
    console.log(`${code} keyboard code represents ${key} key`);
  });
});
```

## See also

- `Map.prototype.forEach()`
