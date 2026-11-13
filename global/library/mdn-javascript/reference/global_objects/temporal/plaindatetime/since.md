---
title: "Temporal.PlainDateTime.prototype.since()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindatetime/since/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDateTime.prototype.since()

The **`since()`** method of `Temporal.PlainDateTime` instances returns a new `Temporal.Duration` object representing the duration from another date-time (in a form convertible by `Temporal.PlainDateTime.from()`) to this date-time. The duration is positive if the other date-time is before this date-time, and negative if after.

This method does `this - other`. To do `other - this`, use the `until()` method.

## Syntax

```js
since(other)
since(other, options)
```

### Parameters

- `other`
    A string, an object, or a `Temporal.PlainDateTime` instance representing a date-time to subtract from this date-time. It is converted to a `Temporal.PlainDateTime` object using the same algorithm as `Temporal.PlainDateTime.from()`. It must have the same calendar as `this`.
- `options` (optional)
    An object containing the options for `Temporal.Duration.prototype.round()`, which includes `largestUnit`, `roundingIncrement`, `roundingMode`, and `smallestUnit`. `largestUnit` and `smallestUnit` accept all possible units. For `largestUnit`, the default value `"auto"` means `"days"` or `smallestUnit`, whichever is greater. For `smallestUnit`, the default value is `"nanoseconds"`. The current date is used as the `relativeTo` option. Note that using units larger than `"days"` may make the duration not portable to other calendars or dates.

### Return value

A new `Temporal.Duration` object representing the duration _since_ `other` to this date-time. The duration is positive if `other` is before this date-time, and negative if after.

### Exceptions

- `RangeError`
    Thrown in one of the following cases:
    - `other` has a different calendar than `this`.
    - Any of the options is invalid.

## Examples

### Using since()

```js
let lastBilling = Temporal.PlainDateTime.from({
  year: Temporal.Now.plainDateISO().year,
  month: 4,
  day: 1,
});
const now = Temporal.Now.plainDateTimeISO().round("second");
if (Temporal.PlainDateTime.compare(lastBilling, now) > 0) {
  lastBilling = lastBilling.subtract({ years: 1 });
}
const duration = now.since(lastBilling);
console.log(`${duration.toLocaleString("en-US")} since last billing`);
// Expected output: "[number] days, [number] hr, [number] min, [number] sec since last billing"

const duration2 = now.since(lastBilling, { smallestUnit: "days" });
console.log(`${duration2.toLocaleString("en-US")} since last billing`);
// Expected output: "[number] days since last billing"

const duration3 = now.since(lastBilling, {
  largestUnit: "years",
  smallestUnit: "days",
});
console.log(`${duration3.toLocaleString("en-US")} since last billing`);
// Expected output: "[number] months, [number] days since last billing"
```

### Rounding the result

By default the fractional part of the `smallestUnit` is truncated. You can round it up using the `roundingIncrement` and `roundingMode` options.

```js
const dt1 = Temporal.PlainDateTime.from("2022-01-01T00:00:00");
const dt2 = Temporal.PlainDateTime.from("2022-01-28T12:34:56");
const duration = dt2.since(dt1, {
  smallestUnit: "days",
  roundingIncrement: 5,
  roundingMode: "ceil",
});
console.log(duration.toString()); // "P30D"
```

## See also

- `Temporal.PlainDateTime`
- `Temporal.Duration`
- `Temporal.PlainDateTime.prototype.add()`
- `Temporal.PlainDateTime.prototype.subtract()`
- `Temporal.PlainDateTime.prototype.until()`
