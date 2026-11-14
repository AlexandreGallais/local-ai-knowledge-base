---
title: "Temporal.PlainYearMonth.prototype.valueOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainyearmonth/valueof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainYearMonth.prototype.valueOf()

The **`valueOf()`** method of `Temporal.PlainYearMonth` instances throws a `TypeError`, which prevents `Temporal.PlainYearMonth` instances from being implicitly converted to primitives when used in arithmetic or comparison operations.

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

Because both primitive conversion and number conversion call `valueOf()` before `toString()`, if `valueOf()` is absent, then an expression like `yearMonth1 > yearMonth2` would implicitly compare them as strings, which may have unexpected results. By throwing a `TypeError`, `Temporal.PlainYearMonth` instances prevent such implicit conversions. You need to explicitly convert them to strings using `Temporal.PlainYearMonth.prototype.toString()`, or use the `Temporal.PlainYearMonth.compare()` static method to compare them.

## Examples

### Arithmetic and comparison operations on Temporal.PlainYearMonth

All arithmetic and comparison operations on `Temporal.PlainYearMonth` instances should use the dedicated methods or convert them to primitives explicitly.

```js
const ym1 = Temporal.PlainYearMonth.from("2021-01");
const ym2 = Temporal.PlainYearMonth.from("2021-07");
ym1 > ym2; // TypeError: can't convert PlainYearMonth to primitive type
Temporal.PlainYearMonth.compare(ym1, ym2); // -1

ym2 - ym1; // TypeError: can't convert PlainYearMonth to primitive type
ym2.since(ym1).toString(); // "P6M"
```

## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainYearMonth.prototype.toString()`
- `Temporal.PlainYearMonth.prototype.toJSON()`
- `Temporal.PlainYearMonth.prototype.toLocaleString()`
