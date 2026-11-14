---
title: "Date.prototype.setUTCSeconds()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/setutcseconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.setUTCSeconds()

The **`setUTCSeconds()`** method of `Date` instances changes the seconds and/or milliseconds for this date according to universal time.

```js
const date = new Date("December 31, 1975, 23:15:30 GMT+11:00");

console.log(date.getUTCSeconds());
// Expected output: 30

date.setUTCSeconds(39);

console.log(date.getUTCSeconds());
// Expected output: 39
```

## Syntax

```js
setUTCSeconds(secondsValue)
setUTCSeconds(secondsValue, msValue)
```

### Parameters

- `secondsValue`
    An integer between 0 and 59 representing the seconds.
- `msValue` (optional)
    An integer between 0 and 999 representing the milliseconds.

### Return value

Changes the `Date` object in place, and returns its new timestamp. If a parameter is `NaN` (or other values that get coerced to `NaN`, such as `undefined`), the date is set to Invalid Date and `NaN` is returned.

## Description

If you do not specify the `msValue` parameter, the value returned from the
`getUTCMilliseconds()` method is
used.

If a parameter you specify is outside of the expected range,
`setUTCSeconds()` attempts to update the date information in the
`Date` object accordingly. For example, if you use 100 for
`secondsValue`, the minutes stored in the `Date` object will be
incremented by 1, and 40 will be used for seconds.

## Examples

### Using setUTCSeconds()

```js
const theBigDay = new Date();
theBigDay.setUTCSeconds(20);
```

## See also

- `Date.prototype.getUTCSeconds()`
- `Date.prototype.setSeconds()`
