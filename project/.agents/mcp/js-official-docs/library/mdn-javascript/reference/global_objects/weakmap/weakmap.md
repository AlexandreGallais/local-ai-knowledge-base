---
title: "WeakMap() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakmap/weakmap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakMap() constructor

The **`WeakMap()`** constructor creates `WeakMap` objects.

## Syntax

```js
new WeakMap()
new WeakMap(iterable)
```

> **Note:**
> `WeakMap()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `iterable`
    An `Array` or other iterable object that produces a two-element array-like object whose first element is a value that will be used as a `WeakMap` key and whose second element is the value to associate with that key. Each key-value pair will be added to the new `WeakMap`. `null` is treated as `undefined`.

## Examples

### Using WeakMap

```js
const wm1 = new WeakMap();
const wm2 = new WeakMap();
const wm3 = new WeakMap();
const o1 = {};
const o2 = () => {};
const o3 = window;

wm1.set(o1, 37);
wm1.set(o2, "azerty");
wm2.set(o1, o2); // a value can be anything, including an object or a function
wm2.set(o3, undefined);
wm2.set(wm1, wm2); // keys and values can be any objects. Even WeakMaps!

wm1.get(o2); // "azerty"
wm2.get(o2); // undefined, because there is no key for o2 on wm2
wm2.get(o3); // undefined, because that is the set value

wm1.has(o2); // true
wm2.has(o2); // false
wm2.has(o3); // true (even if the value itself is 'undefined')

wm3.set(o1, 37);
wm3.get(o1); // 37

wm1.has(o1); // true
wm1.delete(o1);
wm1.has(o1); // false
```

## See also

- Polyfill of `WeakMap` in `core-js`
- `WeakMap` in the JavaScript guide
- `Map`
- `Set`
- `WeakSet`
