---
title: "Temporal.PlainDate.prototype.dayOfWeek"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/dayofweek/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.dayOfWeek

The **`dayOfWeek`** accessor property of `Temporal.PlainDate` instances returns a positive integer representing the 1-based day index in the week of this date. Days in a week are numbered sequentially from `1` to `daysInWeek`, with each number mapping to its name. It is calendar-dependent. 1 usually represents Monday in the calendar, even when locales using the calendar may consider a different day as the first day of the week (see `Intl.Locale.prototype.getWeekInfo()`).

All commonly supported calendars use 7-day weeks, and you could generally expect this property to return the same value for the same date across different calendars.

The set accessor of `dayOfWeek` is `undefined`. You cannot change this property directly. To create a new `Temporal.PlainDate` object with the desired new `dayOfWeek` value, use the `add()` or `subtract()` method with the appropriate number of `days`.

## Examples

### Using dayOfWeek

```js
const date = Temporal.PlainDate.from("2021-07-01");
console.log(date.dayOfWeek); // 4; Thursday

const date2 = Temporal.PlainDate.from("2021-07-01[u-ca=chinese]");
console.log(date2.dayOfWeek); // 4
```

### Changing dayOfWeek

`PlainDate` does not support changing `dayOfWeek` directly. To change the day of the week, you need to first figure out the difference in days to your desired day of the week, then use `add` or `subtract` to adjust the date accordingly. For example, to change to the Friday of this week (whether before or after):

```js
function getDayInSameWeek(date, destDayOfWeek) {
  return date.add({ days: destDayOfWeek - date.dayOfWeek });
}

console.log(
  getDayInSameWeek(Temporal.PlainDate.from("2021-07-01"), 5).toString(),
); // 2021-07-02
console.log(
  getDayInSameWeek(Temporal.PlainDate.from("2021-07-03"), 5).toString(),
); // 2021-07-02
```

To change to the next Friday:

```js
function getNextDayInWeek(date, destDayOfWeek) {
  const distance = destDayOfWeek - date.dayOfWeek;
  return date.add({
    days: distance < 0 ? date.daysInWeek + distance : distance,
  });
}

console.log(
  getNextDayInWeek(Temporal.PlainDate.from("2021-07-01"), 5).toString(),
); // 2021-07-02
console.log(
  getNextDayInWeek(Temporal.PlainDate.from("2021-07-03"), 5).toString(),
); // 2021-07-09
```

To change to the previous Friday:

```js
function getPreviousDayInWeek(date, destDayOfWeek) {
  const distance = date.dayOfWeek - destDayOfWeek;
  return date.subtract({
    days: distance < 0 ? date.daysInWeek + distance : distance,
  });
}

console.log(
  getPreviousDayInWeek(Temporal.PlainDate.from("2021-07-01"), 5).toString(),
); // 2021-06-25
console.log(
  getPreviousDayInWeek(Temporal.PlainDate.from("2021-07-03"), 5).toString(),
); // 2021-07-02
```

## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.with()`
- `Temporal.PlainDate.prototype.add()`
- `Temporal.PlainDate.prototype.subtract()`
- `Temporal.PlainDate.prototype.day`
- `Temporal.PlainDate.prototype.dayOfYear`
- `Temporal.PlainDate.prototype.daysInWeek`
- `Temporal.PlainDate.prototype.weekOfYear`
- `Temporal.PlainDate.prototype.yearOfWeek`
