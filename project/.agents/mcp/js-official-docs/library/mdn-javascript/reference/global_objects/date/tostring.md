---
title: "Date.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.toString()

The **`toString()`** method of `Date` instances returns a string representing this date interpreted in the local timezone.

```js
const event = new Date("August 19, 1975 23:15:30");

console.log(event.toString());
// Expected output: "Tue Aug 19 1975 23:15:30 GMT+0200 (CEST)"
// Note: your timezone may vary
```

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string representing the given date (see description for the format). Returns `"Invalid Date"` if the date is invalid.

## Description

The `toString()` method is part of the type coercion protocol. Because `Date` has a `[Symbol.toPrimitive]()` method, that method always takes priority over `toString()` when a `Date` object is implicitly coerced to a string. However, `Date.prototypeSymbol.toPrimitive` still calls `this.toString()` internally.

The `Date` object overrides the `toString()` method of `Object`. `Date.prototype.toString()` returns a string representation of the Date as interpreted in the local timezone, containing both the date and the time — it joins the string representation specified in `toDateString()` and `toTimeString()` together, adding a space in between. For example: "Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time)".

`Date.prototype.toString()` must be called on `Date` instances. If the `this` value does not inherit from `Date.prototype`, a `TypeError` is thrown.

- If you only want to get the _date_ part, use `toDateString()`.
- If you only want to get the _time_ part, use `toTimeString()`.
- If you want to make the date interpreted as UTC instead of local timezone, use `toUTCString()`.
- If you want to format the date in a more user-friendly format (e.g., localization), use `toLocaleString()`.

## Examples

### Using toString()

```js
const d = new Date(0);
console.log(d.toString()); // "Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time)"
```

## See also

- `Object.prototype.toString()`
- `Date.prototype.toDateString()`
- `Date.prototype.toLocaleString()`
- `Date.prototype.toTimeString()`
