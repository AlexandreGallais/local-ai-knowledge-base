---
title: "Temporal.ZonedDateTime.prototype.withPlainTime()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/withplaintime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.withPlainTime()

The **`withPlainTime()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.ZonedDateTime` object representing this date-time with the time part entirely replaced by the new time (in a form convertible by `Temporal.PlainTime.from()`)

This method will replace all time properties, defaulting to `0` where properties are unspecified. If you only want to replace some of the time properties, use the `with()` method instead.

## Syntax

```js
withPlainTime()
withPlainTime(plainTime)
```

### Parameters

- `plainTime` (optional)
    A string, an object, or a `Temporal.PlainTime` instance representing the new time. It is converted to a `Temporal.PlainTime` object using the same algorithm as `Temporal.PlainTime.from()`. If not specified, the time part is set to the start of the day (which is usually `00:00:00` unless it doesn't exist due to offset transitions). Disambiguation always happens in the `"compatible"` mode; if you want to use a different mode, use the `with()` method instead.

### Return value

A new `Temporal.ZonedDateTime` object, with the date part and the time zone copied from the original date-time and the time part replaced by the new time.

## Examples

### Using withPlainTime()

```js
const zdt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56[America/New_York]",
);

// You can pass a string
const newZDT = zdt.withPlainTime("13:45:00");
console.log(newZDT.toString()); // "2021-07-01T13:45:00-04:00[America/New_York]"

// You can only specify some time properties, and the rest default to 0;
// for the with() method, they would be copied from the original date-time
const newZDT2 = zdt.withPlainTime({ hour: 13 });
console.log(newZDT2.toString()); // "2021-07-01T13:00:00-04:00[America/New_York]"

// You can pass <example-value> to set the time to midnight
const newZDT3 = zdt.withPlainTime();
console.log(newZDT3.toString()); // "2021-07-01T00:00:00-04:00[America/New_York]"

// But, if midnight doesn't exist, it may be a different time
const zdt2 = Temporal.ZonedDateTime.from(
  "2015-10-18T12:00-02:00[America/Sao_Paulo]",
);
console.log(zdt2.withPlainTime().toString()); // "2015-10-18T01:00:00-02:00[America/Sao_Paulo]"
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.withCalendar()`
- `Temporal.ZonedDateTime.prototype.withTimeZone()`
- `Temporal.ZonedDateTime.prototype.toPlainTime()`
- `Temporal.ZonedDateTime.from()`
