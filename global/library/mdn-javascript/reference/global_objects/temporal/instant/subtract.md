---
title: "Temporal.Instant.prototype.subtract()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/subtract/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.prototype.subtract()

The **`subtract()`** method of `Temporal.Instant` instances returns a new `Temporal.Instant` object representing this instant moved backward by a given duration (in a form convertible by `Temporal.Duration.from()`).

If you want to subtract two instants and get a duration, use `since()` or `until()` instead.

## Syntax

```js
subtract(duration)
```

### Parameters

- `duration`
    A string, an object, or a `Temporal.Duration` instance representing a duration to subtract from this instant. It is converted to a `Temporal.Duration` object using the same algorithm as `Temporal.Duration.from()`.

### Return value

A new `Temporal.Instant` object representing subtracting `duration` from this instant. If `duration` is positive, then the returned instant is earlier than this instant; if `duration` is negative, then the returned instant is later than this instant.

### Exceptions

- `RangeError`
    Thrown in one of the following cases:
    - `duration` is a calendar duration (it has a non-zero `years`, `months`, or `weeks`), or has a non-zero `days`, because calendar durations are ambiguous without a calendar and time reference.
    - The result is not in the representable range, which is ±108 days, or about ±273,972.6 years, from the Unix epoch.

## Description

Subtracting a duration is equivalent to adding its negation, so all the same considerations apply.

## Examples

### Subtracting a Temporal.Duration

```js
const instant = Temporal.Instant.fromEpochMilliseconds(1000);
const duration = Temporal.Duration.from("PT1S"); // One-second duration
const newInstant = instant.subtract(duration);
console.log(newInstant.epochMilliseconds); // 0
```

For more examples, see `add()`.

## See also

- `Temporal.Instant`
- `Temporal.Duration`
- `Temporal.Instant.prototype.add()`
- `Temporal.Instant.prototype.since()`
- `Temporal.Instant.prototype.until()`
