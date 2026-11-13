---
title: "Temporal.PlainDate.prototype.year"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/year/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.year

The **`year`** accessor property of `Temporal.PlainDate` instances returns an integer representing the number of years of this date relative to the start of a calendar-specific epoch year. This property has the same function as the `era`/`eraYear` pair as a unique identifier of a year in a calendar. It is calendar-dependent.

## Value

Usually year 1 is either the first year of the latest era or the ISO 8601 year `0001`. Because `year` is relative to the start of the epoch year, not the epoch date, if the epoch is in the middle of the year (only known to happen for the `japanese` calendar), that year will have the same `year` value before and after the start date of the era (for the `japanese` calendar, `year` is the same as the ISO 8601 year).

All specified calendars have arithmetic years fully defined by the spec.

- The following calendars have the same epoch year as ISO 8601: `chinese`, `dangi`, `gregory`, `japanese`, in which `year: 1` corresponds to the ISO year `1`.
- The `buddhist` calendar uses the Buddhist epoch of 543 BCE, so `year: 1` corresponds to the ISO year `-542`.
- The `coptic` calendar uses the Coptic epoch of 284 CE, so `year: 1` corresponds to the ISO year `284`.
- The `ethioaa` calendar uses the Anno Mundi epoch of 5493 BCE, so `year: 1` corresponds to the ISO year `-5492`.
- The `ethiopic` calendar uses the Ethiopic epoch of 8 CE, so `year: 1` corresponds to the ISO year `8`.
- The `hebrew` calendar uses the Anno Mundi epoch of 3761 BCE, so `year: 1` corresponds to the ISO year `-3760`.
- The `indian` calendar uses the Śaka epoch of 79 CE, so `year: 1` corresponds to the ISO year `79`.
- The following calendars use the Hijri epoch of 622 CE: `islamic-civil`, `islamic-tbla`, `islamic-umalqura`, `persian`, in which `year: 1` corresponds to the ISO year `622`.
- The `roc` calendar uses the Minguo epoch of 1912 CE, so `year: 1` corresponds to the ISO year `1912`.

> **Note:**
> For the `chinese` and `dangi` calendars, the CLDR data uses the Huangdi epoch of 2637 BCE by default, but Temporal defined it to use the ISO 8601 epoch for simplicity.

The set accessor of `year` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainDate` object with the desired new value.

## Examples

### Using year

```js
const date = Temporal.PlainDate.from("2021-07-01"); // ISO 8601 calendar
console.log(date.year); // 2021

const date2 = Temporal.PlainDate.from("-002021-07-01");
console.log(date2.year); // -2021

const date3 = Temporal.PlainDate.from("2021-07-01[u-ca=japanese]");
console.log(date3.year); // 2021; although the Japanese calendar uses eras,
// there's no obvious "default era", so the year is the same as the ISO year

const date4 = Temporal.PlainDate.from("2021-07-01[u-ca=hebrew]");
console.log(date4.year); // 5781; the Hebrew calendar uses the Anno Mundi epoch, which starts in 3761 BC
```

## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.with()`
- `Temporal.PlainDate.prototype.add()`
- `Temporal.PlainDate.prototype.subtract()`
- `Temporal.PlainDate.prototype.era`
- `Temporal.PlainDate.prototype.eraYear`
- `Temporal.PlainDate.prototype.yearOfWeek`
- `Temporal.PlainDate.prototype.month`
- `Temporal.PlainDate.prototype.day`
