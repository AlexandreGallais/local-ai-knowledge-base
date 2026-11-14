---
title: "Temporal.ZonedDateTime.prototype.eraYear"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/erayear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.eraYear

The **`eraYear`** accessor property of `Temporal.ZonedDateTime` instances returns a non-negative integer representing the year of this date within the era, or `undefined` if the calendar does not use eras (e.g., ISO 8601). The year index usually starts from 1 (more common) or 0, and years in an era can decrease with time (e.g., Gregorian BCE). `era` and `eraYear` together uniquely identify a year in a calendar, in the same way that `year` does. It is calendar-dependent.

The set accessor of `eraYear` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.ZonedDateTime` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.eraYear`.

## Examples

### Using eraYear

```js
const dt = Temporal.ZonedDateTime.from("2021-07-01[America/New_York]"); // ISO 8601 calendar
console.log(dt.eraYear); // undefined

const dt2 = Temporal.ZonedDateTime.from(
  "2021-07-01[America/New_York][u-ca=gregory]",
);
console.log(dt2.eraYear); // 2021

const dt3 = Temporal.ZonedDateTime.from(
  "-002021-07-01[America/New_York][u-ca=gregory]",
);
console.log(dt3.eraYear); // 2022; 0000 is used for the year 1 BC

const dt4 = Temporal.ZonedDateTime.from(
  "2021-07-01[America/New_York][u-ca=japanese]",
);
console.log(dt4.eraYear); // 3
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.subtract()`
- `Temporal.ZonedDateTime.prototype.year`
- `Temporal.ZonedDateTime.prototype.era`
- `Temporal.PlainDate.prototype.eraYear`
