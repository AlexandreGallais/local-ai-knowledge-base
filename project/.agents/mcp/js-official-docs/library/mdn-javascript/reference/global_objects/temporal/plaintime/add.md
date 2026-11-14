---
title: "Temporal.PlainTime.prototype.add()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime.prototype.add()

The **`add()`** method of `Temporal.PlainTime` instances returns a new `Temporal.PlainTime` object representing this time moved forward by a given duration (in a form convertible by `Temporal.Duration.from()`), wrapping around the clock if necessary.

## Syntax

```js
add(duration)
```

### Parameters

- `duration`
    A string, an object, or a `Temporal.Duration` instance representing a duration to add to this time. It is converted to a `Temporal.Duration` object using the same algorithm as `Temporal.Duration.from()`.

### Return value

A new `Temporal.PlainTime` object representing the time specified by the original `PlainTime`, plus the duration. Any units above `hours` are ignored, and if the time goes past midnight, it wraps around to the next day.

Adding a duration is equivalent to subtracting its negation.

## Examples

### Adding a duration

```js
const start = Temporal.PlainTime.from("12:34:56");
const end = start.add({ hours: 1, minutes: 30 });
console.log(end.toString()); // 14:04:56

const end2 = start.add({ hours: -1, minutes: -30 });
console.log(end2.toString()); // 11:04:56

const distance = Temporal.PlainTime.from("00:00:00").until("01:23:45"); // 1h 23m 45s
const end3 = start.add(distance);
console.log(end3.toString()); // 13:58:41
```

### Time wrapping

If the time goes past midnight, it wraps around to the next day:

```js
const start = Temporal.PlainTime.from("12:34:56");
const end = start.add({ hours: 12 });
console.log(end.toString()); // 00:34:56
```

## See also

- `Temporal.PlainTime`
- `Temporal.Duration`
- `Temporal.PlainTime.prototype.subtract()`
