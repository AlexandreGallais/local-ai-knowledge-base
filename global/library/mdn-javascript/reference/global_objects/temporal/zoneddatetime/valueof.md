---
title: "Temporal.ZonedDateTime.prototype.valueOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/valueof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.valueOf()

The **`valueOf()`** method of `Temporal.ZonedDateTime` instances throws a `TypeError`, which prevents `Temporal.ZonedDateTime` instances from being implicitly converted to primitives when used in arithmetic or comparison operations.

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

Because both primitive conversion and number conversion call `valueOf()` before `toString()`, if `valueOf()` is absent, then an expression like `yearMonth1 > yearMonth2` would implicitly compare them as strings, which may have unexpected results. By throwing a `TypeError`, `Temporal.ZonedDateTime` instances prevent such implicit conversions. You need to explicitly convert them to numbers using `Temporal.ZonedDateTime.prototype.epochNanoseconds`, or use the `Temporal.ZonedDateTime.compare()` static method to compare them.

## Examples

### Arithmetic and comparison operations on Temporal.ZonedDateTime

All arithmetic and comparison operations on `Temporal.ZonedDateTime` instances should use the dedicated methods or convert them to primitives explicitly.

```js
const zdt1 = Temporal.ZonedDateTime.from(
  "2022-01-01T00:00:00[America/New_York]",
);
const zdt2 = Temporal.ZonedDateTime.from(
  "2022-07-01T00:00:00[America/New_York]",
);
zdt1 > zdt2; // TypeError: can't convert ZonedDateTime to primitive type
Temporal.ZonedDateTime.compare(zdt1, zdt2); // -1

zdt2 - zdt1; // TypeError: can't convert ZonedDateTime to primitive type
zdt2.since(zdt1).toString(); // "PT4343H"
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.toString()`
- `Temporal.ZonedDateTime.prototype.toJSON()`
- `Temporal.ZonedDateTime.prototype.toLocaleString()`
