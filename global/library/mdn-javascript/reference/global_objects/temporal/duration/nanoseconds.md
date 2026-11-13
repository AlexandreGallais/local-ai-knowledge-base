---
title: "Temporal.Duration.prototype.nanoseconds"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/duration/nanoseconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Duration.prototype.nanoseconds

The **`nanoseconds`** accessor property of `Temporal.Duration` instances returns an integer representing the number of nanoseconds in the duration.

Unless the duration is balanced, you cannot assume the range of this value, but you can know its sign by checking the duration's `sign` property. If it is balanced to a unit above nanoseconds, the `nanoseconds` absolute value will be between 0 and 999, inclusive.

The set accessor of `nanoseconds` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.Duration` object with the desired new value.

## Examples

### Using nanoseconds

```js
const d1 = Temporal.Duration.from({ microseconds: 1, nanoseconds: 500 });
const d2 = Temporal.Duration.from({ microseconds: -1, nanoseconds: -500 });
const d3 = Temporal.Duration.from({ microseconds: 1 });
const d4 = Temporal.Duration.from({ nanoseconds: 1000 });

console.log(d1.nanoseconds); // 500
console.log(d2.nanoseconds); // -500
console.log(d3.nanoseconds); // 0
console.log(d4.nanoseconds); // 1000

// Balance d4
const d4Balanced = d4.round({ largestUnit: "microseconds" });
console.log(d4Balanced.nanoseconds); // 0
console.log(d4Balanced.microseconds); // 1
```

## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.years`
- `Temporal.Duration.prototype.months`
- `Temporal.Duration.prototype.weeks`
- `Temporal.Duration.prototype.days`
- `Temporal.Duration.prototype.hours`
- `Temporal.Duration.prototype.minutes`
- `Temporal.Duration.prototype.seconds`
- `Temporal.Duration.prototype.milliseconds`
- `Temporal.Duration.prototype.microseconds`
