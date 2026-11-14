---
title: "Temporal.Instant.fromEpochNanoseconds()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/fromepochnanoseconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.fromEpochNanoseconds()

The **`Temporal.Instant.fromEpochNanoseconds()`** static method creates a new `Temporal.Instant` object from the number of nanoseconds since the Unix epoch (midnight at the beginning of January 1, 1970, UTC).

To convert a `Date` object to a `Temporal.Instant` object, use `Date.prototype.toTemporalInstant()` instead.

## Syntax

```js
Temporal.Instant.fromEpochNanoseconds(epochNanoseconds)
```

### Parameters

- `epochNanoseconds`
    A BigInt representing the number of nanoseconds since the Unix epoch.

### Return value

A new `Temporal.Instant` object representing the instant in time specified by `epochNanoseconds`.

### Exceptions

- `RangeError`
    Thrown if `epochNanoseconds` is not in the representable range, which is ±108 days, or about ±273,972.6 years, from the Unix epoch.

## Examples

### Using Temporal.Instant.fromEpochNanoseconds()

```js
const instant = Temporal.Instant.fromEpochNanoseconds(0n);
console.log(instant.toString()); // 1970-01-01T00:00:00Z
const vostok1Liftoff =
  Temporal.Instant.fromEpochNanoseconds(-275248380000000000n);
console.log(vostok1Liftoff.toString()); // 1961-04-12T06:07:00Z
const sts1Liftoff = Temporal.Instant.fromEpochNanoseconds(355924804000000000n);
console.log(sts1Liftoff.toString()); // 1981-04-12T12:00:04Z
```

## See also

- `Temporal.Instant`
- `Temporal.Instant.prototype.epochNanoseconds`
- `Temporal.Instant.from()`
- `Temporal.Instant.fromEpochMilliseconds()`
- `Date.prototype.toTemporalInstant()`
