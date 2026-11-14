---
title: "Temporal.Duration.prototype.valueOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/duration/valueof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Duration.prototype.valueOf()

The **`valueOf()`** method of `Temporal.Duration` instances throws a `TypeError`, which prevents `Temporal.Duration` instances from being implicitly converted to primitives when used in arithmetic or comparison operations.

## Syntax

```js
valueOf()
```

### Parameters

None.

### Return value

None.

### Exceptions

- `TypeError`
    Always thrown.

## Description

Because both primitive conversion and number conversion call `valueOf()` before `toString()`, if `valueOf()` is absent, then an expression like `duration1 > duration2` would implicitly compare them as strings, which may have unexpected results such as `"PT3S" > "PT1M"`. By throwing a `TypeError`, `Temporal.Duration` instances prevent such implicit conversions. You need to explicitly convert them to numbers using `Temporal.Duration.prototype.total()`, or use the `Temporal.Duration.compare()` static method to compare them.

## Examples

### Arithmetic and comparison operations on Temporal.Duration

All arithmetic and comparison operations on `Temporal.Duration` instances should use the dedicated methods or convert them to primitives explicitly.

```js
const duration1 = Temporal.Duration.from({ seconds: 3 });
const duration2 = Temporal.Duration.from({ minutes: 1 });
duration1 > duration2; // TypeError: can't convert Duration to primitive type
duration1.total("seconds") > duration2.total("seconds"); // false
Temporal.Duration.compare(duration1, duration2); // -1

duration1 + duration2; // TypeError: can't convert Duration to primitive type
duration1.total("seconds") + duration2.total("seconds"); // 63
duration1.add(duration2).toString(); // "PT1M3S"
```

## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.toString()`
- `Temporal.Duration.prototype.toJSON()`
- `Temporal.Duration.prototype.toLocaleString()`
