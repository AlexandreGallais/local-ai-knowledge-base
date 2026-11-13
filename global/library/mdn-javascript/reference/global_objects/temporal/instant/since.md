---
title: "Temporal.Instant.prototype.since()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/since/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.prototype.since()

The **`since()`** method of `Temporal.Instant` instances returns a new `Temporal.Duration` object representing the duration from another instant (in a form convertible by `Temporal.Instant.from()`) to this instant. The duration is positive if the other instant is before this instant, and negative if after.

This method does `this - other`. To do `other - this`, use the `until()` method.

## Syntax

```js
since(other)
since(other, options)
```

### Parameters

- `other`
    A string or a `Temporal.Instant` instance representing an instant to subtract from this instant. It is converted to a `Temporal.Instant` object using the same algorithm as `Temporal.Instant.from()`.
- `options` (optional)
    An object containing the options for `Temporal.Duration.prototype.round()`, which includes `largestUnit`, `roundingIncrement`, `roundingMode`, and `smallestUnit`. `largestUnit` and `smallestUnit` only accept the units: `"hours"`, `"minutes"`, `"seconds"`, `"milliseconds"`, `"microseconds"`, `"nanoseconds"`, or their singular forms. For `largestUnit`, the default value `"auto"` means `"seconds"` or `smallestUnit`, whichever is greater. For `smallestUnit`, the default value is `"nanoseconds"`.

### Return value

A new `Temporal.Duration` object representing the duration _since_ `other` to this instant. The duration is positive if `other` is before this instant, and negative if after.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.

## Examples

### Using since()

```js
const lastUpdated = Temporal.Instant.fromEpochMilliseconds(1735235418000);
const now = Temporal.Now.instant();
const duration = now.since(lastUpdated, { smallestUnit: "minute" });
console.log(`Last updated ${duration.toLocaleString("en-US")} ago`);
```

### Balancing the resulting duration

Because an instant does not carry calendar information, the resulting duration avoids calendar durations, which are ambiguous without a calendar and time reference. Therefore, the result is unbalanced because `hours` may be greater than `24`. To balance the duration, round the resulting duration again with the desired `largestUnit`, passing a `relativeTo` that carries the calendar information.

```js
const lastUpdated = Temporal.Instant.fromEpochMilliseconds(1735235418000);
const now = Temporal.Now.instant();
const duration = now.since(lastUpdated, { smallestUnit: "minutes" });
const roundedDuration = duration.round({
  largestUnit: "years",
  // Use the ISO calendar; you can convert to another calendar using
  // withCalendar()
  relativeTo: now.toZonedDateTimeISO("UTC"),
});
console.log(`Last updated ${roundedDuration.toLocaleString("en-US")} ago`);
```

## See also

- `Temporal.Instant`
- `Temporal.Duration`
- `Temporal.Instant.prototype.add()`
- `Temporal.Instant.prototype.subtract()`
- `Temporal.Instant.prototype.until()`
