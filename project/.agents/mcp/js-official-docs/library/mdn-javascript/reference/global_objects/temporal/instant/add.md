---
title: "Temporal.Instant.prototype.add()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.prototype.add()

The **`add()`** method of `Temporal.Instant` instances returns a new `Temporal.Instant` object representing this instant moved forward by a given duration (in a form convertible by `Temporal.Duration.from()`).

## Syntax

```js
add(duration)
```

### Parameters

- `duration`
    A string, an object, or a `Temporal.Duration` instance representing a duration to add to this instant. It is converted to a `Temporal.Duration` object using the same algorithm as `Temporal.Duration.from()`.

### Return value

A new `Temporal.Instant` object representing adding `duration` to this instant. If `duration` is positive, then the returned instant is later than this instant; if `duration` is negative, then the returned instant is earlier than this instant.

### Exceptions

- `RangeError`
    Thrown in one of the following cases:
    - `duration` is a calendar duration (it has a non-zero `years`, `months`, or `weeks`), or has a non-zero `days`, because calendar durations are ambiguous without a calendar and time reference.
    - The result is not in the representable range, which is ±108 days, or about ±273,972.6 years, from the Unix epoch.

## Description

In essence, the `add()` method first gets the number of nanoseconds represented by `duration`, adds it to this instant's `epochNanoseconds`, and then creates a new `Temporal.Instant` object from the result. Therefore, the duration must unambiguously represent a fixed amount of time.

If you want to add a calendar duration, the addition must be performed in the context of a calendar and a time zone to account for the variable lengths of months, years, and days (because of daylight saving time). In this case, convert the instant to a `Temporal.ZonedDateTime` object, add the duration, and then convert the result back to an instant.

Adding a duration is equivalent to subtracting its negation.

## Examples

### Adding a Temporal.Duration

```js
const instant = Temporal.Instant.fromEpochMilliseconds(0);
const duration = Temporal.Duration.from("PT1S");
const newInstant = instant.add(duration);
console.log(newInstant.epochMilliseconds); // 1000
```

### Adding an object or a string

```js
const instant = Temporal.Instant.fromEpochMilliseconds(0);
const newInstant = instant.add({ seconds: 1 });
console.log(newInstant.epochMilliseconds); // 1000

const newInstant2 = instant.add("PT1S");
console.log(newInstant2.epochMilliseconds); // 1000
```

### Adding a calendar duration

```js
const instant = Temporal.Instant.fromEpochMilliseconds(1730610000000);
const duration = Temporal.Duration.from({ days: 1 });

// This instant is 2024-11-03T01:00:00-04:00[America/New_York],
// which is a DST transition day in the US.
const instant2 = instant
  .toZonedDateTimeISO("America/New_York")
  .add(duration)
  .toInstant();
console.log(instant2.epochMilliseconds); // 1730700000000

// The same instant is not a DST transition day in Paris.
const instant3 = instant
  .toZonedDateTimeISO("Europe/Paris")
  .add(duration)
  .toInstant();
console.log(instant3.epochMilliseconds); // 1730696400000
```

## See also

- `Temporal.Instant`
- `Temporal.Duration`
- `Temporal.Instant.prototype.subtract()`
