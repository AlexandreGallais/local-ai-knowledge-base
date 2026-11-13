---
title: "Temporal.ZonedDateTime.prototype.offset"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/offset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.offset

The **`offset`** accessor property of `Temporal.ZonedDateTime` instances returns a string representing the offset used to interpret the internal instant, in the form `±HH:mm` (or `±HH:mm:ss.sssssssss` with as much subminute precision as necessary). This offset is guaranteed to be valid for the given instant and time zone at construction time.

The set accessor of `offset` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.ZonedDateTime` object with the desired new value (usually also changing the date/time), or use the `withTimeZone()` method to create a new `Temporal.ZonedDateTime` object in another time zone.

## Examples

### Using offset

```js
const dt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:00:00-07:00[America/Los_Angeles]",
);
console.log(dt.offset); // "-07:00"

const dt2 = Temporal.ZonedDateTime.from("2021-07-01T12:00:00-07[-07]");
console.log(dt2.offset); // "-07:00"

const dt3 = Temporal.ZonedDateTime.from(
  "1900-01-01T00:00:00+00:09:21[Europe/Paris]",
);
console.log(dt3.offset); // "+00:09:21"

const dt4 = Temporal.ZonedDateTime.from("2021-07-01T12:00:00Z[Asia/Shanghai]");
console.log(dt4.offset); // "+08:00"
```

### Changing offset

If the local time happens to have two valid offsets, such as within a DST transition, you can change the offset without changing anything else:

```js
const zdt = Temporal.ZonedDateTime.from(
  "2024-11-03T01:05:00-04:00[America/New_York]",
);
const newZDT = zdt.with({ offset: "-05:00" });
console.log(newZDT.toString()); // "2024-11-03T01:05:00-05:00[America/New_York]"
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.withTimeZone()`
- `Temporal.ZonedDateTime.prototype.timeZoneId`
- `Temporal.ZonedDateTime.prototype.offsetNanoseconds`
