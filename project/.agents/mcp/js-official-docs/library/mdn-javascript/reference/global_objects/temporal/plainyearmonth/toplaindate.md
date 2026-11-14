---
title: "Temporal.PlainYearMonth.prototype.toPlainDate()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainyearmonth/toplaindate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainYearMonth.prototype.toPlainDate()

The **`toPlainDate()`** method of `Temporal.PlainYearMonth` instances returns a new `Temporal.PlainDate` object representing this year-month and a supplied day in the same calendar system.

## Syntax

```js
toPlainDate(dayInfo)
```

### Parameters

- `dayInfo` (optional)
    An object representing the day component of the resulting `PlainDate`, containing the following property:
    - `day`
        Corresponds to the `day` property.

### Return value

A new `Temporal.PlainDate` object representing the date specified by this year-month and the day in `dayInfo`, interpreted in the calendar system of this year-month.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.
- `TypeError`
    Thrown if `dayInfo` is not an object.

## Examples

### Using toPlainDate()

```js
const ym = Temporal.PlainYearMonth.from("2021-07");
const date = ym.toPlainDate({ day: 1 });
console.log(date.toString()); // 2021-07-01

const ym2 = Temporal.PlainYearMonth.from("2021-07-01[u-ca=chinese]");
const date2 = ym2.toPlainDate({ day: 15 });
console.log(date2.toString()); // 2021-06-24[u-ca=chinese]
```

## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.toPlainYearMonth()`
