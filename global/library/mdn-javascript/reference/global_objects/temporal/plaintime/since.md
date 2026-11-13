---
title: "Temporal.PlainTime.prototype.since()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/since/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime.prototype.since()

The **`since()`** method of `Temporal.PlainTime` instances returns a new `Temporal.Duration` object representing the duration from another time (in a form convertible by `Temporal.PlainTime.from()`) to this time. The duration is positive if the other time is before this time, and negative if after.

This method does `this - other`. To do `other - this`, use the `until()` method.

## Syntax

```js
since(other)
since(other, options)
```

### Parameters

- `other`
    A string, an object, or a `Temporal.PlainTime` instance representing a time to subtract from this time. It is converted to a `Temporal.PlainTime` object using the same algorithm as `Temporal.PlainTime.from()`.
- `options` (optional)
    An object containing the options for `Temporal.Duration.prototype.round()`, which includes `largestUnit`, `roundingIncrement`, `roundingMode`, and `smallestUnit`. `largestUnit` and `smallestUnit` only accept the units: `"hours"`, `"minutes"`, `"seconds"`, `"milliseconds"`, `"microseconds"`, `"nanoseconds"`, or their singular forms. For `largestUnit`, the default value `"auto"` means `"hours"`. For `smallestUnit`, the default value is `"nanoseconds"`.

### Return value

A new `Temporal.Duration` object representing the duration _since_ `other` to this time. The duration is positive if `other` is before this time, and negative if after.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.

## Examples

### Using since()

```js
const lunchTime = Temporal.PlainTime.from("12:30:00");
const now = Temporal.Now.plainTimeISO();
const duration = now.since(lunchTime);
console.log(`You had lunch ${duration.toLocaleString("en-US")} ago`);
// Example output: "You had lunch 3 hr, 42 min, 21 sec, 343 ms, 131 μs, 718 ns ago"

const duration2 = now.since(lunchTime, { smallestUnit: "minutes" });
console.log(`You had lunch ${duration2.toLocaleString("en-US")} ago`);
// Example output: "You had lunch 3 hr, 42 min ago"

const duration3 = now.since(lunchTime, {
  largestUnit: "minutes",
  smallestUnit: "minutes",
});
console.log(`You had lunch ${duration3.toLocaleString("en-US")} ago`);
// Example output: "You had lunch 222 min ago"
```

### Rounding the result

By default the fractional part of the `smallestUnit` is truncated. You can round it up using the `roundingIncrement` and `roundingMode` options.

```js
const time1 = Temporal.PlainTime.from("12:30:00");
const time2 = Temporal.PlainTime.from("12:30:01");
const duration = time2.since(time1, {
  smallestUnit: "seconds",
  roundingIncrement: 15,
  roundingMode: "ceil",
});
console.log(duration.toString()); // "PT15S"
```

## See also

- `Temporal.PlainTime`
- `Temporal.Duration`
- `Temporal.PlainTime.prototype.add()`
- `Temporal.PlainTime.prototype.subtract()`
- `Temporal.PlainTime.prototype.until()`
