---
title: "Temporal.PlainDateTime.prototype.toPlainDate()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindatetime/toplaindate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDateTime.prototype.toPlainDate()

The **`toPlainDate()`** method of `Temporal.PlainDateTime` instances returns a new `Temporal.PlainDate` object representing the date part (year, month, day) of this date-time in the same calendar system.

## Syntax

```js
toPlainDate()
```

### Parameters

None.

### Return value

A new `Temporal.PlainDate` object representing the date part (year, month, day) of this date-time in the same calendar system.

## Examples

### Using toPlainDate()

```js
const dt = Temporal.PlainDateTime.from("2021-07-01T12:34:56");
const date = dt.toPlainDate();
console.log(date.toString()); // '2021-07-01'
```

## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDate`
- `Temporal.PlainDateTime.prototype.toPlainTime()`
- `Temporal.PlainDate.prototype.toZonedDateTime()`
- `Temporal.PlainDate.prototype.toPlainDateTime()`
