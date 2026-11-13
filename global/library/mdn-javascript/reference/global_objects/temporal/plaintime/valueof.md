---
title: "Temporal.PlainTime.prototype.valueOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/valueof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime.prototype.valueOf()

The **`valueOf()`** method of `Temporal.PlainTime` instances throws a `TypeError`, which prevents `Temporal.PlainTime` instances from being implicitly converted to primitives when used in arithmetic or comparison operations.

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

Because both primitive conversion and number conversion call `valueOf()` before `toString()`, if `valueOf()` is absent, then an expression like `time1 > time2` would implicitly compare them as strings, which may have unexpected results. By throwing a `TypeError`, `Temporal.PlainTime` instances prevent such implicit conversions. You need to explicitly convert them to strings using `Temporal.PlainTime.prototype.toString()`, or use the `Temporal.PlainTime.compare()` static method to compare them.

## Examples

### Arithmetic and comparison operations on Temporal.PlainTime

All arithmetic and comparison operations on `Temporal.PlainTime` instances should use the dedicated methods or convert them to primitives explicitly.

```js
const time1 = Temporal.PlainTime.from("00:00:00");
const time2 = Temporal.PlainTime.from("12:00:00");
time1 > time2; // TypeError: can't convert PlainTime to primitive type
Temporal.PlainTime.compare(time1, time2); // -1

time2 - time1; // TypeError: can't convert PlainTime to primitive type
time2.since(time1).toString(); // "PT12H"
```

## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.prototype.toString()`
- `Temporal.PlainTime.prototype.toJSON()`
- `Temporal.PlainTime.prototype.toLocaleString()`
