---
title: "Temporal.PlainDate.prototype.weekOfYear"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/weekofyear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.weekOfYear

The **`weekOfYear`** accessor property of `Temporal.PlainDate` instances returns a positive integer representing the 1-based week index in the `yearOfWeek` of this date, or `undefined` if the calendar does not have a well-defined week system. The first week of the year is `1`. It is calendar-dependent.

Note that for ISO 8601, the first and last few days of the year may be attributed to the last week of the previous year or the first week of the next year. Namely, if a week crosses two years, then it belongs to the year that has the majority of its days. To get the year that the `weekOfYear` belongs to, use the `yearOfWeek` property, not the `year` property.

The set accessor of `weekOfYear` is `undefined`. You cannot change this property directly. To create a new `Temporal.PlainDate` object with the desired new `weekOfYear` value, use the `add()` or `subtract()` method with the appropriate number of `weeks`.

## Examples

### Using weekOfYear

```js
const date = Temporal.PlainDate.from("2021-07-01");
console.log(date.weekOfYear); // 26

// If 01-01 is a Friday/Saturday/Sunday, it belongs to the last week of the previous year
const date2 = Temporal.PlainDate.from("2021-01-01");
console.log(date2.dayOfWeek); // 5
console.log(date2.weekOfYear); // 53; 2020 has 53 weeks
console.log(date2.yearOfWeek); // 2020

// Otherwise, it belongs to the first week of the year
const date3 = Temporal.PlainDate.from("2020-01-01");
console.log(date3.dayOfWeek); // 3
console.log(date3.weekOfYear); // 1
console.log(date3.yearOfWeek); // 2020

// Similarly, if 12-31 is a Monday/Tuesday/Wednesday, it belongs to the first week of the next year
const date4 = Temporal.PlainDate.from("2019-12-31");
console.log(date4.dayOfWeek); // 2
console.log(date4.weekOfYear); // 1
console.log(date4.yearOfWeek); // 2020
```

### Changing weekOfYear

`PlainDate` does not support changing `weekOfYear` directly. To change the week, you need to first figure out the difference in weeks to your desired week, then use `add` or `subtract` to adjust the date accordingly. For example, to change to the previous week:

```js
const date = Temporal.PlainDate.from("2021-07-01");
const previousWeek = date.subtract({ weeks: 1 });
console.log(previousWeek.toString()); // 2021-06-24
```

## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.with()`
- `Temporal.PlainDate.prototype.add()`
- `Temporal.PlainDate.prototype.subtract()`
- `Temporal.PlainDate.prototype.yearOfWeek`
- `Temporal.PlainDate.prototype.dayOfWeek`
- `Temporal.PlainDate.prototype.daysInWeek`
- `Temporal.PlainDate.prototype.daysInYear`
