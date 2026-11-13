---
title: "Temporal.Instant() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/instant/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant() constructor

The **`Temporal.Instant()`** constructor creates `Temporal.Instant` objects.

This constructor is exactly equivalent to calling `Temporal.Instant.fromEpochNanoseconds()`.

## Syntax

```js
new Temporal.Instant(epochNanoseconds)
```

> **Note:**
> `Temporal.Instant()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `epochNanoseconds`
    A BigInt representing the number of nanoseconds since the Unix epoch.

### Return value

A new `Temporal.Instant` object representing the instant in time specified by `epochNanoseconds`.

### Exceptions

- `RangeError`
    Thrown if `epochNanoseconds` represents an instant outside the range of representable instants, which is ±108 days, or about ±273,972.6 years, from the Unix epoch.

## Examples

### Using Temporal.Instant()

```js
const instant = new Temporal.Instant(0n);
console.log(instant.toString()); // 1970-01-01T00:00:00Z
const vostok1Liftoff = new Temporal.Instant(-275248380000000000n);
console.log(vostok1Liftoff.toString()); // 1961-04-12T06:07:00Z
const sts1Liftoff = new Temporal.Instant(355924804000000000n);
console.log(sts1Liftoff.toString()); // 1981-04-12T12:00:04Z
```

## See also

- `Temporal.Instant`
- `Temporal.Instant.prototype.epochNanoseconds`
- `Temporal.Instant.from()`
- `Temporal.Instant.fromEpochMilliseconds()`
- `Temporal.Instant.fromEpochNanoseconds()`
