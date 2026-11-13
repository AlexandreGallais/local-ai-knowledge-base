---
title: "Temporal.PlainDate.prototype.monthsInYear"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/monthsinyear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.monthsInYear

The **`monthsInYear`** accessor property of `Temporal.PlainDate` instances returns a positive integer representing the number of months in the year of this date. It is calendar-dependent.

For the ISO 8601 calendar, this is always 12, but in other calendar systems it may differ. For example, in calendars using leap months, leap years will have one more month than common years.

The set accessor of `monthsInYear` is `undefined`. You cannot change this property directly.

## Examples

### Using monthsInYear

```js
const date = Temporal.PlainDate.from("2021-07-01");
console.log(date.monthsInYear); // 12

const date2 = Temporal.PlainDate.from("2021-07-01[u-ca=chinese]");
console.log(date2.monthsInYear); // 12

const date3 = Temporal.PlainDate.from("2023-07-01[u-ca=chinese]");
console.log(date3.monthsInYear); // 13; 2023 is a Chinese leap year
```

### Changing to the second last month of the year

You can use `monthsInYear` to change to the second last month of the year:

```js
const date = Temporal.PlainDate.from("2021-07-01");
const secondLastMonth = date.with({ month: date.monthsInYear - 1 });
console.log(secondLastMonth.toString()); // 2021-11-01
```

## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.with()`
- `Temporal.PlainDate.prototype.add()`
- `Temporal.PlainDate.prototype.subtract()`
- `Temporal.PlainDate.prototype.year`
- `Temporal.PlainDate.prototype.month`
- `Temporal.PlainDate.prototype.monthCode`
- `Temporal.PlainDate.prototype.daysInMonth`
