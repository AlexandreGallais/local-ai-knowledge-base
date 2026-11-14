---
title: "Temporal.PlainTime.compare()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/compare/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime.compare()

The **`Temporal.PlainTime.compare()`** static method returns a number (-1, 0, or 1) indicating whether the first time comes before, is the same as, or comes after the second time. It is equivalent to comparing the hour, minute, second, millisecond, microsecond, and nanosecond fields one by one.

## Syntax

```js
Temporal.PlainTime.compare(time1, time2)
```

### Parameters

- `time1`
    A string, an object, or a `Temporal.PlainTime` instance representing the first time to compare. It is converted to a `Temporal.PlainTime` object using the same algorithm as `Temporal.PlainTime.from()`.
- `time2`
    The second time to compare, converted to a `Temporal.PlainTime` object using the same algorithm as `time1`.

### Return value

Returns `-1` if `time1` comes before `time2`, `0` if they are the same, and `1` if `time1` comes after `time2`.

## Examples

### Using Temporal.PlainTime.compare()

```js
const time1 = Temporal.PlainTime.from("12:34:56");
const time2 = Temporal.PlainTime.from("12:34:57");
console.log(Temporal.PlainTime.compare(time1, time2)); // -1

const time3 = Temporal.PlainTime.from("11:34:56");
console.log(Temporal.PlainTime.compare(time1, time3)); // 1
```

### Sorting an array of times

The purpose of this `compare()` function is to act as a comparator to be passed to `Array.prototype.sort()` and related functions.

```js
const times = ["12:34:56", "11:34:56", "12:34:57"];

times.sort(Temporal.PlainTime.compare);
console.log(times);
// [ "11:34:56", "12:34:56", "12:34:57" ]
```

## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.prototype.equals()`
