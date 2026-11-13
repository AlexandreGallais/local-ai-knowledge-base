---
title: "Temporal.PlainYearMonth.prototype.eraYear"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainyearmonth/erayear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainYearMonth.prototype.eraYear

The **`eraYear`** accessor property of `Temporal.PlainYearMonth` instances returns a non-negative integer representing the year of this year-month within the era, or `undefined` if the calendar does not use eras (e.g., ISO 8601). The year index usually starts from 1 (more common) or 0, and years in an era can decrease with time (e.g., Gregorian BCE). `era` and `eraYear` together uniquely identify a year in a calendar, in the same way that `year` does. It is calendar-dependent.

The set accessor of `eraYear` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainYearMonth` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.eraYear`.

## Examples

### Using eraYear

```js
const ym = Temporal.PlainYearMonth.from("2021-07"); // ISO 8601 calendar
console.log(ym.eraYear); // undefined

const ym2 = Temporal.PlainYearMonth.from("2021-07-01[u-ca=gregory]");
console.log(ym2.eraYear); // 2021

const ym3 = Temporal.PlainYearMonth.from("-002021-07-01[u-ca=gregory]");
console.log(ym3.eraYear); // 2022; 0000 is used for the year 1 BC

const ym4 = Temporal.PlainYearMonth.from("2021-07-01[u-ca=japanese]");
console.log(ym4.eraYear); // 3
```

## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainYearMonth.prototype.with()`
- `Temporal.PlainYearMonth.prototype.add()`
- `Temporal.PlainYearMonth.prototype.subtract()`
- `Temporal.PlainYearMonth.prototype.year`
- `Temporal.PlainYearMonth.prototype.era`
- `Temporal.PlainDate.prototype.eraYear`
