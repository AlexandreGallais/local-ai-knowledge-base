---
title: "Temporal.PlainDate.prototype.toPlainYearMonth()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/toplainyearmonth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.toPlainYearMonth()

The **`toPlainYearMonth()`** method of `Temporal.PlainDate` instances returns a new `Temporal.PlainYearMonth` object representing the `year` and `month` of this date in the same calendar system.

## Syntax

```js
toPlainYearMonth()
```

### Parameters

None.

### Return value

A new `Temporal.PlainYearMonth` object representing the `year` and `month` of this date in the same calendar system.

## Examples

### Using toPlainYearMonth()

```js
const date = Temporal.PlainDate.from("2021-07-01");
const yearMonth = date.toPlainYearMonth();
console.log(yearMonth.toString()); // 2021-07
```

## See also

- `Temporal.PlainDate`
- `Temporal.PlainYearMonth`
- `Temporal.PlainDate.prototype.toPlainDateTime()`
- `Temporal.PlainDate.prototype.toPlainMonthDay()`
- `Temporal.PlainDate.prototype.toZonedDateTime()`
- `Temporal.PlainYearMonth.prototype.toPlainDate()`
