---
title: "Temporal.Duration.prototype.microseconds"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/duration/microseconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Duration.prototype.microseconds

The **`microseconds`** accessor property of `Temporal.Duration` instances returns an integer representing the number of microseconds in the duration.

Unless the duration is balanced, you cannot assume the range of this value, but you can know its sign by checking the duration's `sign` property. If it is balanced to a unit above microseconds, the `microseconds` absolute value will be between 0 and 999, inclusive.

The set accessor of `microseconds` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.Duration` object with the desired new value.

## Examples

### Using microseconds

```js
const d1 = Temporal.Duration.from({ milliseconds: 1, microseconds: 500 });
const d2 = Temporal.Duration.from({ milliseconds: -1, microseconds: -500 });
const d3 = Temporal.Duration.from({ milliseconds: 1 });
const d4 = Temporal.Duration.from({ microseconds: 1000 });

console.log(d1.microseconds); // 500
console.log(d2.microseconds); // -500
console.log(d3.microseconds); // 0
console.log(d4.microseconds); // 1000

// Balance d4
const d4Balanced = d4.round({ largestUnit: "milliseconds" });
console.log(d4Balanced.microseconds); // 0
console.log(d4Balanced.milliseconds); // 1
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
- `Temporal.Duration.prototype.nanoseconds`
