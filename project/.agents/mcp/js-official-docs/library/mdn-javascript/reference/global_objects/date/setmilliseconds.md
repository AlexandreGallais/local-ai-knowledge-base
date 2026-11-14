---
title: "Date.prototype.setMilliseconds()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/setmilliseconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.setMilliseconds()

The **`setMilliseconds()`** method of `Date` instances changes the milliseconds for this date according to local time.

```js
const event = new Date("August 19, 1975 23:15:30");

console.log(event.getMilliseconds());
// Expected output: 0

event.setMilliseconds(456);

console.log(event.getMilliseconds());
// Expected output: 456
```

## Syntax

```js
setMilliseconds(millisecondsValue)
```

### Parameters

- `millisecondsValue`
    An integer between 0 and 999 representing the milliseconds.

### Return value

Changes the `Date` object in place, and returns its new timestamp. If `millisecondsValue` is `NaN` (or other values that get coerced to `NaN`, such as `undefined`), the date is set to Invalid Date and `NaN` is returned.

## Description

If you specify a number outside the expected range, the date information in the `Date` object is updated accordingly. For example, if you specify 1005, the number of seconds is incremented by 1, and 5 is used for the milliseconds.

Because `setMilliseconds()` operates on the local time, crossing a Daylight Saving Time (DST) boundary may result in a different elapsed time than expected. For example, if setting the milliseconds crosses a spring-forward transition (losing an hour), the difference in timestamps between the new and old date is one hour less than the nominal time difference. Conversely, crossing a fall-back transition (gaining an hour) result in an extra hour. If you need to adjust the date by a fixed amount of time, consider using `setUTCMilliseconds()` or `setTime()`.

If the new local time falls within an offset transition, the exact time is derived using the same behavior as `Temporal`'s `disambiguation: "compatible"` option. That is, if the local time corresponds to two instants, the earlier one is chosen; if the local time does not exist (there is a gap), we go forward by the gap duration.

## Examples

### Using setMilliseconds()

```js
const theBigDay = new Date();
theBigDay.setMilliseconds(100);
```

## See also

- `Date.prototype.getMilliseconds()`
- `Date.prototype.setUTCMilliseconds()`
