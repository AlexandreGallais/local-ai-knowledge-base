---
title: "Temporal.PlainDate.prototype.toPlainDateTime()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/toplaindatetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.toPlainDateTime()

The **`toPlainDateTime()`** method of `Temporal.PlainDate` instances returns a new `Temporal.PlainDateTime` object representing this date and a supplied time in the same calendar system.

## Syntax

```js
toPlainDateTime()
toPlainDateTime(plainTime)
```

### Parameters

- `plainTime` (optional)
    A string, an object, or a `Temporal.PlainTime` instance representing the time component of the resulting `PlainDateTime`. It is converted to a `Temporal.PlainTime` object using the same algorithm as `Temporal.PlainTime.from()`. Defaults to `"00:00:00"`.

### Return value

A new `Temporal.PlainDateTime` object representing the date and time specified by this date and `plainTime`, interpreted in the calendar system of this date.

## Examples

### Using toPlainDateTime()

```js
const date = Temporal.PlainDate.from("2021-07-01");
const dateTime = date.toPlainDateTime("12:34:56");
console.log(dateTime.toString()); // 2021-07-01T12:34:56

const midnight = date.toPlainDateTime();
console.log(midnight.toString()); // 2021-07-01T00:00:00

const date2 = Temporal.PlainDate.from("2021-07-01[u-ca=chinese]");
const dateTime2 = date2.toPlainDateTime("12:34:56");
console.log(dateTime2.toString()); // 2021-07-01T12:34:56[u-ca=chinese]
```

## See also

- `Temporal.PlainDate`
- `Temporal.PlainDateTime`
- `Temporal.PlainTime`
- `Temporal.PlainDate.prototype.toPlainMonthDay()`
- `Temporal.PlainDate.prototype.toPlainYearMonth()`
- `Temporal.PlainDate.prototype.toZonedDateTime()`
- `Temporal.PlainDateTime.prototype.toPlainDate()`
