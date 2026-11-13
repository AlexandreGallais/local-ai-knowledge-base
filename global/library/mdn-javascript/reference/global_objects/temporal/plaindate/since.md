---
title: "Temporal.PlainDate.prototype.since()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/since/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.since()

The **`since()`** method of `Temporal.PlainDate` instances returns a new `Temporal.Duration` object representing the duration from another date (in a form convertible by `Temporal.PlainDate.from()`) to this date. The duration is positive if the other date is before this date, and negative if after.

This method does `this - other`. To do `other - this`, use the `until()` method.

## Syntax

```js
since(other)
since(other, options)
```

### Parameters

- `other`
    A string, an object, or a `Temporal.PlainDate` instance representing a date to subtract from this date. It is converted to a `Temporal.PlainDate` object using the same algorithm as `Temporal.PlainDate.from()`. It must have the same calendar as `this`.
- `options` (optional)
    An object containing the options for `Temporal.Duration.prototype.round()`, which includes `largestUnit`, `roundingIncrement`, `roundingMode`, and `smallestUnit`. `largestUnit` and `smallestUnit` only accept the units: `"years"`, `"months"`, `"weeks"`, `"days"`, or their singular forms. For `largestUnit`, the default value `"auto"` means `"days"` or `smallestUnit`, whichever is greater. For `smallestUnit`, the default value is `"days"`. The current date is used as the `relativeTo` option. Note that using units larger than `"days"` may make the duration not portable to other calendars or dates.

### Return value

A new `Temporal.Duration` object representing the duration _since_ `other` to this date. The duration is positive if `other` is before this date, and negative if after.

### Exceptions

- `RangeError`
    Thrown in one of the following cases:
    - `other` has a different calendar than `this`.
    - Any of the options is invalid.

## Examples

### Using since()

```js
const date = Temporal.PlainDate.from("2022-12-25");
const now = Temporal.Now.plainDateISO();
const duration = now.since(date);
const formatter = new Intl.DurationFormat("en-US", { style: "long" });
console.log(`It's been ${formatter.format(duration)} since that Christmas...`);
// Expected output: "It's been [number] days since that Christmas..."

const duration2 = now.since(date, { smallestUnit: "months" });
console.log(`It's been ${formatter.format(duration2)} since that Christmas...`);
// Expected output: "It's been [number] months since that Christmas..."

const duration3 = now.since(date, {
  largestUnit: "years",
  smallestUnit: "months",
});
console.log(`It's been ${formatter.format(duration3)} since that Christmas...`);
// Expected output: "It's been [number] years, [number] months since that Christmas..."
```

### Rounding the result

By default the fractional part of the `smallestUnit` is truncated. You can round it up using the `roundingIncrement` and `roundingMode` options.

```js
const date1 = Temporal.PlainDate.from("2022-01-01");
const date2 = Temporal.PlainDate.from("2022-01-28");
const duration = date2.since(date1, {
  smallestUnit: "days",
  roundingIncrement: 5,
  roundingMode: "ceil",
});
console.log(duration.toString()); // "P30D"
```

### Comparing different calendars

By default, the two dates must have the same calendar. This is to avoid ambiguity in the meaning of months and years. If you want to compare dates from different calendars, you can convert them to the same calendar first.

```js
const date1 = Temporal.PlainDate.from("2022-01-01");
const date2 = Temporal.PlainDate.from("2022-01-28[u-ca=chinese]");
const duration = date2.withCalendar("iso8601").since(date1);
console.log(duration.toString()); // "P27D"
```

## See also

- `Temporal.PlainDate`
- `Temporal.Duration`
- `Temporal.PlainDate.prototype.add()`
- `Temporal.PlainDate.prototype.subtract()`
- `Temporal.PlainDate.prototype.until()`
