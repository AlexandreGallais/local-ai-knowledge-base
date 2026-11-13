---
title: "Temporal.PlainMonthDay.prototype.day"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainmonthday/day/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainMonthDay.prototype.day

The **`day`** accessor property of `Temporal.PlainMonthDay` instances returns a positive integer representing the 1-based day index in the month of this date, which is the same day number you would see on a calendar. It is calendar-dependent.

The set accessor of `day` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainMonthDay` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.day`.

## Examples

### Using day

```js
const md = Temporal.PlainMonthDay.from("07-01"); // ISO 8601 calendar
console.log(md.day); // 1

const md2 = Temporal.PlainMonthDay.from("2021-07-01[u-ca=chinese]");
console.log(md2.day); // 22; it is May 22 in the Chinese calendar
```

### Changing day

```js
const md = Temporal.PlainMonthDay.from("07-01");
const newMD = md.with({ day: 15 });
console.log(newMD.toString()); // 07-15
```

By default, `with()` constrains the day to the range of valid values. So you can use `{ day: 1 }` to set the day to the first day of the month, even if the first day does not have the number `1`. Similarly, the following will set the day to the last day of the month:

```js
const md = Temporal.PlainMonthDay.from("07-01");
const lastMD = md.with({ day: Number.MAX_VALUE }); // 07-31
```

For the purpose of `PlainMonthDay`, February is always considered to have 29 days.

```js
const md = Temporal.PlainMonthDay.from("02-01");
const lastMD = md.with({ day: Number.MAX_VALUE }); // 02-29
console.log(lastMD.day); // 29
```

For other calendars, as long as there exists a year in which the month-day is valid, the month-day is considered valid, and the underlying reference year may therefore change. For example:

```js
const md = Temporal.PlainMonthDay.from({
  monthCode: "M02",
  day: 29,
  calendar: "hebrew",
});
console.log(md.toString()); // 1972-11-06[u-ca=hebrew]
console.log(md.toLocaleString("en-US", { calendar: "hebrew" })); // 29 Heshvan
const lastMD = md.with({ day: Number.MAX_VALUE });
// 30 Heshvan does not exist in 1972, so the reference year changes to 1971
console.log(lastMD.toString()); // 1971-11-18[u-ca=hebrew]
console.log(lastMD.toLocaleString("en-US", { calendar: "hebrew" })); // 30 Heshvan
```

## See also

- `Temporal.PlainMonthDay`
- `Temporal.PlainMonthDay.prototype.with()`
- `Temporal.PlainMonthDay.prototype.monthCode`
