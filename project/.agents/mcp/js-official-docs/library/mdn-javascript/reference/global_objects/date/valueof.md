---
title: "Date.prototype.valueOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/valueof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.valueOf()

The **`valueOf()`** method of `Date` instances returns the number of milliseconds for this date since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC.

```js
const date1 = new Date(Date.UTC(96, 1, 2, 3, 4, 5));

console.log(date1.valueOf());
// Expected output: 823230245000

const date2 = new Date("02 Feb 1996 03:04:05 GMT");

console.log(date2.valueOf());
// Expected output: 823230245000
```

## Syntax

```js
valueOf()
```

### Parameters

None.

### Return value

A number representing the timestamp, in milliseconds, of this date. Returns `NaN` if the date is invalid.

## Description

The `valueOf()` method is part of the type coercion protocol. Because `Date` has a `[Symbol.toPrimitive]()` method, that method always takes priority over `valueOf()` when a `Date` object is implicitly coerced to a number. However, `Date.prototypeSymbol.toPrimitive` still calls `this.valueOf()` internally.

The `Date` object overrides the `valueOf()` method of `Object`. `Date.prototype.valueOf()` returns the timestamp of the date, which is functionally equivalent to the `Date.prototype.getTime()` method.

## Examples

### Using valueOf()

```js
const d = new Date(0); // 1970-01-01T00:00:00.000Z
console.log(d.valueOf()); // 0
```

## See also

- `Object.prototype.valueOf()`
- `Date.prototype.getTime()`
