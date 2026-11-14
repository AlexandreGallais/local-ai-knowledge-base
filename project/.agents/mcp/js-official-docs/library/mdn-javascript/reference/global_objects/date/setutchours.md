---
title: "Date.prototype.setUTCHours()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/setutchours/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.setUTCHours()

The **`setUTCHours()`** method of `Date` instances changes the hours, minutes, seconds, and/or milliseconds for this date according to universal time.

```js
const event = new Date("August 19, 1975 23:15:30 GMT-3:00");

console.log(event.toUTCString());
// Expected output: "Wed, 20 Aug 1975 02:15:30 GMT"

console.log(event.getUTCHours());
// Expected output: 2

event.setUTCHours(23);

console.log(event.toUTCString());
// Expected output: "Wed, 20 Aug 1975 23:15:30 GMT"
```

## Syntax

```js
setUTCHours(hoursValue)
setUTCHours(hoursValue, minutesValue)
setUTCHours(hoursValue, minutesValue, secondsValue)
setUTCHours(hoursValue, minutesValue, secondsValue, msValue)
```

### Parameters

- `hoursValue`
    An integer between 0 and 23 representing the hours.
- `minutesValue` (optional)
    An integer between 0 and 59 representing the minutes.
- `secondsValue` (optional)
    An integer between 0 and 59 representing the seconds. If you specify `secondsValue`, you must also specify `minutesValue`.
- `msValue` (optional)
    An integer between 0 and 999 representing the milliseconds. If you specify `msValue`, you must also specify `minutesValue` and `secondsValue`.

### Return value

Changes the `Date` object in place, and returns its new timestamp. If a parameter is `NaN` (or other values that get coerced to `NaN`, such as `undefined`), the date is set to Invalid Date and `NaN` is returned.

## Description

If you do not specify the `minutesValue`,
`secondsValue`, and `msValue` parameters,
the values returned from the `getUTCMinutes()`, `getUTCSeconds()`,
and `getUTCMilliseconds()` methods
are used.

If a parameter you specify is outside of the expected range, `setUTCHours()`
attempts to update the date information in the `Date` object accordingly.
For example, if you use 100 for `secondsValue`, the minutes will
be incremented by 1 (`minutesValue + 1`), and 40 will be used for seconds.

## Examples

### Using setUTCHours()

```js
const theBigDay = new Date();
theBigDay.setUTCHours(8);
```

## See also

- `Date.prototype.getUTCHours()`
- `Date.prototype.setHours()`
