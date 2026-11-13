---
title: "Temporal.ZonedDateTime.prototype.toPlainDateTime()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/toplaindatetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.toPlainDateTime()

The **`toPlainDateTime()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.PlainDateTime` object representing the date and time portions of this date-time. Only the time zone information is removed.

> **Warning:**
> After a `Temporal.ZonedDateTime` is converted to `Temporal.PlainDateTime`, it's no longer time-zone-aware. Subsequent operations like arithmetic or `with()` operations will not adjust for DST and may not yield the same results as equivalent operations with the original `Temporal.ZonedDateTime`. However, unless you perform those operations across a time zone offset transition, it's impossible to notice the difference. Therefore, be very careful when performing this conversion because subsequent results may be correct most of the time, but only turn out incorrect when moving across offset transitions like when DST starts or ends.

## Syntax

```js
toPlainDateTime()
```

### Parameters

None.

### Return value

A new `Temporal.PlainDateTime` object representing the date and time portions of this date-time.

## Examples

### Using toPlainDateTime()

```js
const zdt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56.987654321-04:00[America/New_York]",
);
const plainDateTime = zdt.toPlainDateTime();
console.log(plainDateTime.toString()); // 2021-07-01T12:34:56.987654321
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.PlainDateTime`
- `Temporal.ZonedDateTime.prototype.toPlainDate()`
- `Temporal.ZonedDateTime.prototype.toPlainTime()`
- `Temporal.ZonedDateTime.prototype.toInstant()`
- `Temporal.PlainDateTime.prototype.toZonedDateTime()`
