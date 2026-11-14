---
title: "Temporal.PlainTime.prototype.subtract()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/subtract/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime.prototype.subtract()

The **`subtract()`** method of `Temporal.PlainTime` instances returns a new `Temporal.PlainTime` object representing this time moved backward by a given duration (in a form convertible by `Temporal.Duration.from()`), wrapping around the clock if necessary.

If you want to subtract two times and get a duration, use `since()` or `until()` instead.

## Syntax

```js
subtract(duration)
```

### Parameters

- `duration`
    A string, an object, or a `Temporal.Duration` instance representing a duration to subtract from this time. It is converted to a `Temporal.Duration` object using the same algorithm as `Temporal.Duration.from()`.

### Return value

A new `Temporal.PlainTime` object representing the time specified by the original `PlainTime`, minus the duration.

Subtracting a duration is equivalent to adding its negation, so all the same considerations apply.

## Examples

### Subtracting a duration

```js
const start = Temporal.PlainTime.from("12:34:56");
const end = start.subtract({ hours: 1, minutes: 30 });
console.log(end.toString()); // 11:04:56
```

For more examples, see `add()`.

## See also

- `Temporal.PlainTime`
- `Temporal.Duration`
- `Temporal.PlainTime.prototype.add()`
- `Temporal.PlainTime.prototype.since()`
- `Temporal.PlainTime.prototype.until()`
