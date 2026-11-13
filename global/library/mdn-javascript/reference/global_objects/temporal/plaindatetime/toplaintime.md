---
title: "Temporal.PlainDateTime.prototype.toPlainTime()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindatetime/toplaintime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDateTime.prototype.toPlainTime()

The **`toPlainTime()`** method of `Temporal.PlainDateTime` instances returns a new `Temporal.PlainTime` object representing the time part (hour, minute, second, and subsecond components) of this date-time.

## Syntax

```js
toPlainTime()
```

### Parameters

None.

### Return value

A new `Temporal.PlainTime` object representing the time part (hour, minute, second, and subsecond components) of this date-time.

## Examples

### Using toPlainTime()

```js
const dt = Temporal.PlainDateTime.from("2021-07-01T12:34:56");
const time = dt.toPlainTime();
console.log(time.toString()); // '12:34:56'
```

## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainTime`
- `Temporal.PlainDateTime.prototype.toPlainDate()`
- `Temporal.PlainDateTime.prototype.toZonedDateTime()`
