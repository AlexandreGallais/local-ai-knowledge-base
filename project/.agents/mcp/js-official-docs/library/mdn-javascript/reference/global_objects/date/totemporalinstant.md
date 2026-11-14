---
title: "Date.prototype.toTemporalInstant()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/totemporalinstant/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.toTemporalInstant()

The **`toTemporalInstant()`** method of `Date` instances returns a new `Temporal.Instant` object with the same `epochMilliseconds` value as this date's timestamp.

Use this method to convert legacy `Date` values to the `Temporal` API, then further convert it to other `Temporal` classes as necessary.

## Syntax

```js
toTemporalInstant()
```

### Parameters

None.

### Return value

A new `Temporal.Instant` object with the same `epochMilliseconds` value as this date's timestamp. Its microsecond and nanosecond components are always `0`.

### Exceptions

- `RangeError`
    Thrown if the date is invalid (it has a timestamp of `NaN`).

## Examples

### Using toTemporalInstant()

```js
const legacyDate = new Date("2021-07-01T12:34:56.789Z");
const instant = legacyDate.toTemporalInstant();

// Further convert it to other objects
const zdt = instant.toZonedDateTimeISO("UTC");
const date = zdt.toPlainDate();
console.log(date.toString()); // 2021-07-01
```

## See also

- `Temporal.Instant`
- `Temporal.ZonedDateTime`
- `Temporal.Instant.fromEpochMilliseconds()`
