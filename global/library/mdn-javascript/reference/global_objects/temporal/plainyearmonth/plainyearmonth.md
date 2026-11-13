---
title: "Temporal.PlainYearMonth() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainyearmonth/plainyearmonth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainYearMonth() constructor

The **`Temporal.PlainYearMonth()`** constructor creates `Temporal.PlainYearMonth` objects.

This constructor allows you to create instances by directly supplying the underlying data. Like all other `Temporal` classes, you should usually construct `Temporal.PlainYearMonth` objects using the `Temporal.PlainYearMonth.from()` static method, which can handle a variety of input types.

## Syntax

```js
new Temporal.PlainYearMonth(year, month)
new Temporal.PlainYearMonth(year, month, calendar)
new Temporal.PlainYearMonth(year, month, calendar, referenceDay)
```

> **Note:**
> `Temporal.PlainYearMonth()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

> **Warning:**
> Avoid using the `calendar` and `referenceDay` parameters, because `equals()` and `compare()` will consider the reference day for comparison, causing two equivalent year-months to be considered different if they have different reference days. To create a `Temporal.PlainYearMonth` object with a non-ISO calendar, use the `Temporal.PlainYearMonth.from()` static method.

### Parameters

- `year` (optional)
    A number, truncated to an integer, representing the year in the ISO calendar system.
- `month`
    A number, truncated to an integer, representing the month in the ISO calendar system.
- `calendar` (optional)
    A string representing the calendar to use. See `Intl.supportedValuesOf()` for a list of commonly supported calendar types. Defaults to `"iso8601"`. Note that irrespective of the `calendar`, the `year`, `month`, and `referenceDay` must be in the ISO 8601 calendar system.
- `referenceDay`
    A number, truncated to an integer, representing the day of the month in the ISO calendar system. Defaults to `1`. The same ISO year-month can represent different months on different days with non-ISO calendars. For example, the days 2021-07-01 and 2021-07-31 may fall in different months in a non-Gregorian calendar, and just specifying "2021-07" is insufficient to unambiguously determine a month in the target calendar. Therefore, you virtually always want to specify a `referenceDay` when using a non-ISO calendar.

### Return value

A new `Temporal.PlainYearMonth` object, representing the year-month of the date specified by `year`, `month`, and `referenceDay` (in the ISO calendar), interpreted in the calendar system specified by `calendar`.

### Exceptions

- `TypeError`
    Thrown if `calendar` is not a string or `undefined`.
- `RangeError`
    Thrown in one of the following cases:
    - `year`, `month`, or `referenceDay` is not a finite number.
    - The `year`, `month`, and `referenceDay` combination does not represent a valid date in the ISO calendar system, or is not in the representable range, which is ±(108 + 1) days, or about ±273,972.6 years, from the Unix epoch.
    - `calendar` is not a valid calendar identifier.

## Examples

### Using Temporal.PlainYearMonth()

```js
const ym = new Temporal.PlainYearMonth(2021, 7);
console.log(ym.toString()); // 2021-07

const ym2 = new Temporal.PlainYearMonth(2021, 7, "chinese");
console.log(ym2.toString()); // 2021-07-01[u-ca=chinese]

const ym3 = new Temporal.PlainYearMonth(2021, 7, "chinese", 31);
console.log(ym3.toString()); // 2021-07-31[u-ca=chinese]
```

### Improper usage

You should avoid using the `calendar` and `referenceDay` parameters, unless you know that the `referenceDay` is the canonical reference day that would be selected by `Temporal.PlainYearMonth.from()` for the same year-month.

```js
const ym = new Temporal.PlainYearMonth(2021, 7, "chinese", 1);
const ym2 = Temporal.PlainYearMonth.from("2021-07-01[u-ca=chinese]");
console.log(ym.equals(ym2)); // false
console.log(ym.toString()); // 2021-07-01[u-ca=chinese]
console.log(ym2.toString()); // 2021-06-10[u-ca=chinese]
```

## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainYearMonth.from()`
