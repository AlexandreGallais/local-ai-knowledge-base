---
title: "Temporal.PlainDate.prototype.daysInWeek"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/daysinweek/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.daysInWeek

The **`daysInWeek`** accessor property of `Temporal.PlainDate` instances returns a positive integer representing the number of days in the week of this date. It is calendar-dependent.

For the ISO 8601 calendar, this is always 7, but in other calendar systems it may differ from week to week. All commonly supported calendars use 7-day weeks.

The set accessor of `daysInWeek` is `undefined`. You cannot change this property directly.

## Examples

### Using daysInWeek

```js
const date = Temporal.PlainDate.from("2021-07-01");
console.log(date.daysInWeek); // 7

const date2 = Temporal.PlainDate.from("2021-07-01[u-ca=chinese]");
console.log(date2.daysInWeek); // 7
```

## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.with()`
- `Temporal.PlainDate.prototype.add()`
- `Temporal.PlainDate.prototype.subtract()`
- `Temporal.PlainDate.prototype.yearOfWeek`
- `Temporal.PlainDate.prototype.weekOfYear`
- `Temporal.PlainDate.prototype.dayOfWeek`
- `Temporal.PlainDate.prototype.daysInMonth`
- `Temporal.PlainDate.prototype.daysInYear`
