---
title: "Temporal.ZonedDateTime.prototype.toInstant()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/toinstant/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.toInstant()

The **`toInstant()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.Instant` object representing the instant of this date-time.

## Syntax

```js
toInstant()
```

### Parameters

None.

### Return value

A new `Temporal.Instant` object representing the instant of this date-time.

## Examples

### Using toInstant()

```js
const zdt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56.987654321-04:00[America/New_York]",
);
const instant = zdt.toInstant();
console.log(instant.toString()); // 2021-07-01T16:34:56.987654321Z
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.Instant`
- `Temporal.ZonedDateTime.prototype.toPlainDate()`
- `Temporal.ZonedDateTime.prototype.toPlainTime()`
- `Temporal.ZonedDateTime.prototype.toPlainDateTime()`
- `Temporal.Instant.prototype.toZonedDateTimeISO()`
