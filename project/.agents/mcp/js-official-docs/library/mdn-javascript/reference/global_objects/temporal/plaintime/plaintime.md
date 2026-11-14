---
title: "Temporal.PlainTime() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/plaintime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime() constructor

The **`Temporal.PlainTime()`** constructor creates `Temporal.PlainTime` objects.

This constructor allows you to create instances by directly supplying the underlying data. Like all other `Temporal` classes, you should usually construct `Temporal.PlainTime` objects using the `Temporal.PlainTime.from()` static method, which can handle a variety of input types.

## Syntax

```js
new Temporal.PlainTime()
new Temporal.PlainTime(hour)
new Temporal.PlainTime(hour, minute)
new Temporal.PlainTime(hour, minute, second)
new Temporal.PlainTime(hour, minute, second, millisecond)
new Temporal.PlainTime(hour, minute, second, millisecond, microsecond)
new Temporal.PlainTime(hour, minute, second, millisecond, microsecond, nanosecond)
```

> **Note:**
> `Temporal.PlainTime()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `hour` (optional)
    A number, truncated to an integer, representing the hour component.
- `minute` (optional)
    A number, truncated to an integer, representing the minute component.
- `second` (optional)
    A number, truncated to an integer, representing the second component.
- `millisecond` (optional)
    A number, truncated to an integer, representing the millisecond component.
- `microsecond` (optional)
    A number, truncated to an integer, representing the microsecond component.
- `nanosecond` (optional)
    A number, truncated to an integer, representing the nanosecond component.

### Return value

A new `Temporal.PlainTime` object, representing the time specified by the parameters.

### Exceptions

- `RangeError`
    Thrown if any of the components is not a finite number, or they don't represent a valid time.

## Examples

### Using Temporal.PlainTime()

```js
const time = new Temporal.PlainTime(12, 34, 56, 123, 456, 789);
console.log(time.toString()); // 12:34:56.123456789
```

## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.from()`
