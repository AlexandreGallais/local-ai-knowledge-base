---
title: "WeakSet() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakset/weakset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakSet() constructor

The **`WeakSet()`** constructor creates `WeakSet` objects.

## Syntax

```js
new WeakSet()
new WeakSet(iterable)
```

> **Note:**
> `WeakSet()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `iterable` (optional)
    If an iterable object is passed, all of its elements will be added to the new `WeakSet`. `null` is treated as `undefined`.

## Examples

### Using the WeakSet object

```js
const ws = new WeakSet();
const foo = {};
const bar = {};

ws.add(foo);
ws.add(bar);

ws.has(foo); // true
ws.has(bar); // true

ws.delete(foo); // removes foo from the set
ws.has(foo); // false, foo has been removed
ws.has(bar); // true, bar is retained
```

Note that `foo !== bar`. While they are similar objects, _they are not
**the same object**_. And so they are both added to the set.

## See also

- Polyfill of `WeakSet` in `core-js`
- `WeakSet`
