---
title: "Temporal.ZonedDateTime.prototype.until()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/until/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.until()

The **`until()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.Duration` object representing the duration from this date-time to another date-time (in a form convertible by `Temporal.ZonedDateTime.from()`). The duration is positive if the other date-time is after this date-time, and negative if before.

This method does `other - this`. To do `this - other`, use the `since()` method.

## Syntax

```js
until(other)
until(other, options)
```

### Parameters

- `other`
    A string, an object, or a `Temporal.ZonedDateTime` instance representing a date-time to subtract this date-time from. It is converted to a `Temporal.ZonedDateTime` object using the same algorithm as `Temporal.ZonedDateTime.from()`. It must have the same calendar as `this`.
- `options` (optional)
    The same options as `since()`.

### Return value

A new `Temporal.Duration` object representing the duration from this date-time _until_ `other`. The duration is positive if `other` is after this date-time, and negative if before.

### Exceptions

- `RangeError`
    Thrown in one of the following cases:
    - `other` has a different calendar than `this`.
    - Any of the options is invalid.
    - `other` has a different time zone than `this`, and `largestUnit` is `"days"` or above.

## Examples

### Using until()

```js
const flight = Temporal.ZonedDateTime.from(
  "2024-12-21T13:31:00-05:00[America/New_York]",
);
const now = Temporal.Now.zonedDateTimeISO("America/New_York").round("second");
if (Temporal.ZonedDateTime.compare(flight, now) < 0) {
  console.error(
    "The flight is already in the past. The result may not make sense.",
  );
}
const duration = now.until(flight, { largestUnit: "days" });
console.log(`The flight is in ${duration.toLocaleString("en-US")}`);
```

For more examples, see `since()`.

## See also

- `Temporal.ZonedDateTime`
- `Temporal.Duration`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.subtract()`
- `Temporal.ZonedDateTime.prototype.since()`
