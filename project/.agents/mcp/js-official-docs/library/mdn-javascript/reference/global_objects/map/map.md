---
title: "Map() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/map/map/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Map() constructor

The **`Map()`** constructor creates `Map` objects.

## Syntax

```js
new Map()
new Map(iterable)
```

> **Note:**
> `Map()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `iterable` (optional)
    If an iterable object (such as an array) is passed, all of its elements will be added to the new `Map`. Each element must be an object with two properties: `0` and `1`, which correspond to the key and value (for example, `[[1, "one"],[2, "two"]]`). If you don't specify this parameter, or its value is `null` or `undefined`, the new `Map` is empty.

## Examples

### Creating a new Map

```js
const myMap = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
```

## See also

- Polyfill for `Map` in `core-js`
- es-shims polyfill of `Map`
- `Set`
- `WeakMap`
- `WeakSet`
