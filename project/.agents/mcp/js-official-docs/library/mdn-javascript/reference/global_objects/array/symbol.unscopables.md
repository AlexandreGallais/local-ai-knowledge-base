---
title: "Array.prototype[Symbol.unscopables]"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/symbol.unscopables/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype[Symbol.unscopables]

The **`[Symbol.unscopables]`** data property of `Array.prototype` is shared by all `Array` instances. It contains property names that were not included in the ECMAScript standard prior to the ES2015 version and that are ignored for `with` statement-binding purposes.

## Value

A `null`-prototype object with property names given below and their values set to `true`.

## Description

The default `Array` properties that are ignored for `with` statement-binding purposes are:

- `at()`
- `copyWithin()`
- `entries()`
- `fill()`
- `find()`
- `findIndex()`
- `findLast()`
- `findLastIndex()`
- `flat()`
- `flatMap()`
- `includes()`
- `keys()`
- `toReversed()`
- `toSorted()`
- `toSpliced()`
- `values()`

`Array.prototype[Symbol.unscopables]` is an empty object only containing all the above property names with the value `true`. Its prototype is `null`, so `Object.prototype` properties like `toString` won't accidentally be made unscopable, and a `toString()` within the `with` statement will continue to be called on the array.

See `Symbol.unscopables` for how to set unscopable properties for your own objects.

## Examples

Imagine the `values.push('something')` call below is in code that was written prior to ECMAScript 2015.

```js
var values = [];

with (values) {
  values.push("something");
}
```

When ECMAScript 2015 introduced the `Array.prototype.values()` method, the `with` statement in the above code started to interpret `values` as the `values.values` array method instead of the external `values` variable. The `values.push('something')` call would break because it's now accessing `push` on the `values.values` method. This caused a bug to be reported to Firefox (Firefox Bug 883914).

So the `[Symbol.unscopables]` data property for `Array.prototype` causes the `Array` properties introduced in ECMAScript 2015 to be ignored for `with` statement-binding purposes — allowing code that was written prior to ECMAScript 2015 to continue working as expected, rather than breaking.

## See also

- Polyfill of `Array.prototype[Symbol.unscopables]` in `core-js`
- Indexed collections guide
- `Array`
- `with`
- `Symbol.unscopables`
