---
title: "Temporal.PlainYearMonth.prototype.calendarId"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainyearmonth/calendarid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainYearMonth.prototype.calendarId

The **`calendarId`** accessor property of `Temporal.PlainYearMonth` instances returns a string representing the calendar used to interpret the internal ISO 8601 date.

See `Intl.supportedValuesOf()` for a list of commonly supported calendar types.

The set accessor of `calendarId` is `undefined`. You cannot change this property directly. There's no obvious way to create a new `Temporal.PlainYearMonth` object with a different calendar that represents the same year-month, so you need to convert it to a `Temporal.PlainDate` object first using `toPlainDate()`, change the calendar, and then convert it back.

## Examples

### Using calendarId

```js
const ym = Temporal.PlainYearMonth.from("2021-07");
console.log(ym.calendarId); // "iso8601"; default

const ym2 = Temporal.PlainYearMonth.from("2021-07-01[u-ca=chinese]");
console.log(ym2.calendarId); // "chinese"
```

### Changing calendarId

```js
const ym = Temporal.PlainYearMonth.from("2021-07");
const newYM = ym
  .toPlainDate({ day: 1 })
  .withCalendar("chinese")
  .toPlainYearMonth();
console.log(newYM.year, newYM.monthCode); // 2021 "M05"

const newYM2 = ym
  .toPlainDate({ day: 31 })
  .withCalendar("chinese")
  .toPlainYearMonth();
console.log(newYM2.year, newYM2.monthCode); // 2021 "M06"
```

## See also

- `Temporal.PlainYearMonth`
