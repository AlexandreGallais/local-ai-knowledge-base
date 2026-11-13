---
title: "Temporal.PlainMonthDay.prototype.toPlainDate()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainmonthday/toplaindate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainMonthDay.prototype.toPlainDate()

The **`toPlainDate()`** method of `Temporal.PlainMonthDay` instances returns a new `Temporal.PlainDate` object representing this month-day and a supplied year in the same calendar system.

## Syntax

```js
toPlainDate(yearInfo)
```

### Parameters

- `yearInfo`
    An object representing the year component of the resulting `PlainDate`, containing the following properties (in the order they are retrieved and validated):
    - `era` and `eraYear`
        A string and an integer that correspond to the `era` and `eraYear` properties. Are only used if the calendar system has eras. `era` and `eraYear` must be provided simultaneously. If they are not provided, then `year` must be provided. If all of `era`, `eraYear`, and `year` are provided, they must be consistent.
    - `year`
        Corresponds to the `year` property.

### Return value

A new `Temporal.PlainDate` object representing the date specified by this month-day and the year in `yearInfo`, interpreted in the calendar system of this month-day.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.
- `TypeError`
    Thrown if `yearInfo` is not an object.

## Examples

### Using toPlainDate()

```js
const md = Temporal.PlainMonthDay.from("07-01");
const date = md.toPlainDate({ year: 2021 });
console.log(date.toString()); // 2021-07-01

const md2 = Temporal.PlainMonthDay.from("2021-07-01[u-ca=japanese]");
const date2 = md2.toPlainDate({ era: "reiwa", eraYear: 1 });
console.log(date2.toString()); // 2019-07-01[u-ca=japanese]
```

## See also

- `Temporal.PlainMonthDay`
- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.toPlainMonthDay()`
