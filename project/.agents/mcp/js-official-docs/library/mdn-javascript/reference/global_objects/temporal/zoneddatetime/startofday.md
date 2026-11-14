---
title: "Temporal.ZonedDateTime.prototype.startOfDay()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/startofday/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.startOfDay()

The **`startOfDay()`** method of `Temporal.ZonedDateTime` instances returns a `Temporal.ZonedDateTime` object representing the first instant of this date in the time zone. It usually has a time of `00:00:00`, but may be different if the midnight doesn't exist due to offset changes, in which case the first time that exists is returned.

It is equivalent to calling `withPlainTime()` with no arguments.

## Syntax

```js
startOfDay()
```

### Parameters

None.

### Return value

A `Temporal.ZonedDateTime` object with instant `t`, such that:

- The date at `t` is different from the date one nanosecond before `t`.
- The date at `t` is the same as the date of `this`.

## Examples

### Using startOfDay()

```js
// In the US, DST transitions happen at 2am, so the midnight exists
const dt = Temporal.ZonedDateTime.from(
  "2024-03-10T12:00:00-04:00[America/New_York]",
);
console.log(dt.startOfDay().toString()); // "2024-03-10T00:00:00-05:00[America/New_York]"

// In Brazil, DST transitions happened at midnight, so the midnight didn't exist
const dt2 = Temporal.ZonedDateTime.from(
  "2015-10-18T12:00-02:00[America/Sao_Paulo]",
);
console.log(dt2.startOfDay().toString()); // "2015-10-18T01:00:00-02:00[America/Sao_Paulo]"
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.subtract()`
- `Temporal.ZonedDateTime.prototype.hour`
- `Temporal.ZonedDateTime.prototype.hoursInDay`
- `Temporal.ZonedDateTime.prototype.timeZoneId`
- `Temporal.ZonedDateTime.prototype.getTimeZoneTransition()`
