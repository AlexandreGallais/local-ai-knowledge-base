---
title: "Date.prototype.setDate()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/setdate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.setDate()

The **`setDate()`** method of `Date` instances changes the day of the month for this date according to local time.

```js
const event = new Date("August 19, 1975 23:15:30");

event.setDate(24);

console.log(event.getDate());
// Expected output: 24

event.setDate(32);
// Only 31 days in August!

console.log(event.getDate());
// Expected output: 1
```

## Syntax

```js
setDate(dateValue)
```

### Parameters

- `dateValue`
    An integer representing the day of the month.

### Return value

Changes the `Date` object in place, and returns its new timestamp. If `dateValue` is `NaN` (or other values that get coerced to `NaN`, such as `undefined`), the date is set to Invalid Date and `NaN` is returned.

## Description

If you specify a number outside the expected range, the date information in the `Date` object is updated accordingly. For example, if the `Date` object holds June 1st, a `dateValue` of 40 changes the date to July 10th, while a `dateValue` of 0 changes the date to the last day of the previous month, May 31st.

Because `setDate()` operates on the local time, crossing a Daylight Saving Time (DST) boundary may result in a different elapsed time than expected. For example, if setting the date crosses a spring-forward transition (losing an hour), the difference in timestamps between the new and old date is one hour less than the nominal day difference multiplied by 24 hours. Conversely, crossing a fall-back transition (gaining an hour) result in an extra hour. If you need to adjust the date by a fixed amount of time, consider using `setUTCDate()` or `setTime()`.

If the new local time falls within an offset transition, the exact time is derived using the same behavior as `Temporal`'s `disambiguation: "compatible"` option. That is, if the local time corresponds to two instants, the earlier one is chosen; if the local time does not exist (there is a gap), we go forward by the gap duration.

## Examples

### Using setDate()

```js
const theBigDay = new Date(1962, 6, 7, 12); // noon of 1962-07-07 (7th of July 1962, month is 0-indexed)
const theBigDay2 = new Date(theBigDay).setDate(24); // 1962-07-24 (24th of July 1962)
const theBigDay3 = new Date(theBigDay).setDate(32); // 1962-08-01 (1st of August 1962)
const theBigDay4 = new Date(theBigDay).setDate(22); // 1962-07-22 (22nd of July 1962)
const theBigDay5 = new Date(theBigDay).setDate(0); // 1962-06-30 (30th of June 1962)
const theBigDay6 = new Date(theBigDay).setDate(98); // 1962-10-06 (6th of October 1962)
const theBigDay7 = new Date(theBigDay).setDate(-50); // 1962-05-11 (11th of May 1962)
```

## See also

- `Date()`
- `Date.prototype.getDate()`
- `Date.prototype.setUTCDate()`
