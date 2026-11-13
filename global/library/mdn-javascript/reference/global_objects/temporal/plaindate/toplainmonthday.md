---
title: "Temporal.PlainDate.prototype.toPlainMonthDay()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/toplainmonthday/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.toPlainMonthDay()

The **`toPlainMonthDay()`** method of `Temporal.PlainDate` instances returns a new `Temporal.PlainMonthDay` object representing the `monthCode` and `day` of this date in the same calendar system.

Note that `PlainMonthDay` objects do not have a `month` component, because months with the same name can have different `month` indexes in different years due to leap months.

## Syntax

```js
toPlainMonthDay()
```

### Parameters

None.

### Return value

A new `Temporal.PlainMonthDay` object representing the `monthCode` and `day` of this date in the same calendar system.

## Examples

### Using toPlainMonthDay()

```js
const date = Temporal.PlainDate.from("2021-07-01");
const monthDay = date.toPlainMonthDay();
console.log(monthDay.toString()); // 07-01
```

## See also

- `Temporal.PlainDate`
- `Temporal.PlainMonthDay`
- `Temporal.PlainDate.prototype.toPlainDateTime()`
- `Temporal.PlainDate.prototype.toPlainYearMonth()`
- `Temporal.PlainDate.prototype.toZonedDateTime()`
- `Temporal.PlainMonthDay.prototype.toPlainDate()`
