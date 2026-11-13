---
title: "Date.prototype.setHours()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/sethours/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.setHours()

The **`setHours()`** method of `Date` instances changes the hours, minutes, seconds, and/or milliseconds for this date according to local time.

```js
const event = new Date("August 19, 1975 23:15:30");
event.setHours(20);

console.log(event);
// Expected output: "Tue Aug 19 1975 20:15:30 GMT+0200 (CEST)"
// Note: your timezone may vary

event.setHours(20, 21, 22);

console.log(event);
// Expected output: "Tue Aug 19 1975 20:21:22 GMT+0200 (CEST)"
```

## Syntax

```js
setHours(hoursValue)
setHours(hoursValue, minutesValue)
setHours(hoursValue, minutesValue, secondsValue)
setHours(hoursValue, minutesValue, secondsValue, msValue)
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

If you do not specify the `minutesValue`, `secondsValue`, and `msValue` parameters, the same values as what are returned by `getMinutes()`, `getSeconds()`, and `getMilliseconds()` are used.

If a parameter you specify is outside of the expected range, other parameters and the date information in the `Date` object are updated accordingly. For example, if you specify 100 for `secondsValue`, the minutes are incremented by 1 (`minutesValue + 1`), and 40 is used for seconds.

Because `setHours()` operates on the local time, crossing a Daylight Saving Time (DST) boundary may result in a different elapsed time than expected. For example, if setting the hours crosses a spring-forward transition (losing an hour), the difference in timestamps between the new and old date is one hour less than the nominal hour difference. Conversely, crossing a fall-back transition (gaining an hour) result in an extra hour. If you need to adjust the date by a fixed amount of time, consider using `setUTCHours()` or `setTime()`.

If the new local time falls within an offset transition, the exact time is derived using the same behavior as `Temporal`'s `disambiguation: "compatible"` option. That is, if the local time corresponds to two instants, the earlier one is chosen; if the local time does not exist (there is a gap), we go forward by the gap duration.

## Examples

### Using setHours()

```js
const theBigDay = new Date();
theBigDay.setHours(7);
```

## See also

- `Date.prototype.getHours()`
- `Date.prototype.setUTCHours()`
