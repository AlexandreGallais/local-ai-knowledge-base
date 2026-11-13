---
title: "Temporal.ZonedDateTime.prototype.toPlainDate()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/toplaindate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.toPlainDate()

The **`toPlainDate()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.PlainDate` object representing the date portion of this date-time.

## Syntax

```js
toPlainDate()
```

### Parameters

None.

### Return value

A new `Temporal.PlainDate` object representing the date portion of this date-time.

## Examples

### Using toPlainDate()

```js
const zdt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56.987654321-04:00[America/New_York]",
);
const plainDate = zdt.toPlainDate();
console.log(plainDate.toString()); // 2021-07-01
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.PlainDate`
- `Temporal.ZonedDateTime.prototype.toPlainTime()`
- `Temporal.ZonedDateTime.prototype.toPlainDateTime()`
- `Temporal.ZonedDateTime.prototype.toInstant()`
- `Temporal.PlainDate.prototype.toZonedDateTime()`
