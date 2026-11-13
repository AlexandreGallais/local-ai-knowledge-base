---
title: "Temporal.PlainYearMonth.prototype.since()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainyearmonth/since/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainYearMonth.prototype.since()

The **`since()`** method of `Temporal.PlainYearMonth` instances returns a new `Temporal.Duration` object representing the duration from another year-month (in a form convertible by `Temporal.PlainYearMonth.from()`) to this year-month. The duration is positive if the other month is before this month, and negative if after.

This method does `this - other`. To do `other - this`, use the `until()` method.

## Syntax

```js
since(other)
since(other, options)
```

### Parameters

- `other`
    A string, an object, or a `Temporal.PlainYearMonth` instance representing a year-month to subtract from this year-month. It is converted to a `Temporal.PlainYearMonth` object using the same algorithm as `Temporal.PlainYearMonth.from()`. It must have the same calendar as `this`.
- `options` (optional)
    An object containing the options for `Temporal.Duration.prototype.round()`, which includes `largestUnit`, `roundingIncrement`, `roundingMode`, and `smallestUnit`. `largestUnit` and `smallestUnit` only accept the units: `"years"`, `"months"`, or their singular forms. For `largestUnit`, the default value `"auto"` means `"years"`. For `smallestUnit`, the default value is `"months"`. The current date is used as the `relativeTo` option.

### Return value

A new `Temporal.Duration` object representing the duration _since_ `other` to this year-month. The duration is positive if `other` is before this year-month, and negative if after.

### Exceptions

- `RangeError`
    Thrown in one of the following cases:
    - `other` has a different calendar than `this`.
    - Any of the options is invalid.

## Examples

### Using since()

```js
const lastUpdated = Temporal.PlainYearMonth.from("2022-01");
const now = Temporal.Now.plainDateISO().toPlainYearMonth();
const duration = now.since(lastUpdated);
console.log(`Last updated ${duration.toLocaleString("en-US")} ago`);
// Expected output: "Last updated [number] years, [number] months ago"

const duration2 = now.since(lastUpdated, { largestUnit: "months" });
console.log(`Last updated ${duration2.toLocaleString("en-US")} ago`);
// Expected output: "Last updated [number] months ago"

const duration3 = now.since(lastUpdated, { smallestUnit: "years" });
console.log(`Last updated ${duration3.toLocaleString("en-US")} ago`);
// Expected output: "Last updated [number] years ago"
```

### Rounding the result

By default the fractional part of the `smallestUnit` is truncated. You can round it up using the `roundingIncrement` and `roundingMode` options.

```js
const ym1 = Temporal.PlainYearMonth.from("2022-01");
const ym2 = Temporal.PlainYearMonth.from("2022-11");
const duration = ym2.since(ym1, {
  smallestUnit: "years",
  roundingMode: "ceil",
});
console.log(duration.toString()); // "P1Y"
```

### Getting the result in days

By default, the resulting duration never contains days, because `PlainYearMonth` does not offer day-level precision. You can get the result in days by converting it to a `Temporal.PlainDate` first with an unambiguous day.

```js
const ym1 = Temporal.PlainYearMonth.from("2022-01");
const ym2 = Temporal.PlainYearMonth.from("2022-11");
const duration = ym2.toPlainDate({ day: 1 }).since(ym1.toPlainDate({ day: 1 }));
console.log(duration.toString()); // "P304D"
```

## See also

- `Temporal.PlainYearMonth`
- `Temporal.Duration`
- `Temporal.PlainYearMonth.prototype.add()`
- `Temporal.PlainYearMonth.prototype.subtract()`
- `Temporal.PlainYearMonth.prototype.until()`
