---
title: "Temporal.Duration.prototype.seconds"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/duration/seconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Duration.prototype.seconds

The **`seconds`** accessor property of `Temporal.Duration` instances returns an integer representing the number of seconds in the duration.

Unless the duration is balanced, you cannot assume the range of this value, but you can know its sign by checking the duration's `sign` property. If it is balanced to a unit above seconds, the `seconds` absolute value will be between 0 and 59, inclusive.

The set accessor of `seconds` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.Duration` object with the desired new value.

## Examples

### Using seconds

```js
const d1 = Temporal.Duration.from({ minutes: 1, seconds: 30 });
const d2 = Temporal.Duration.from({ minutes: -1, seconds: -30 });
const d3 = Temporal.Duration.from({ minutes: 1 });
const d4 = Temporal.Duration.from({ seconds: 60 });

console.log(d1.seconds); // 30
console.log(d2.seconds); // -30
console.log(d3.seconds); // 0
console.log(d4.seconds); // 60

// Balance d4
const d4Balanced = d4.round({ largestUnit: "minutes" });
console.log(d4Balanced.seconds); // 0
console.log(d4Balanced.minutes); // 1
```

## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.years`
- `Temporal.Duration.prototype.months`
- `Temporal.Duration.prototype.weeks`
- `Temporal.Duration.prototype.days`
- `Temporal.Duration.prototype.hours`
- `Temporal.Duration.prototype.minutes`
- `Temporal.Duration.prototype.milliseconds`
- `Temporal.Duration.prototype.microseconds`
- `Temporal.Duration.prototype.nanoseconds`
