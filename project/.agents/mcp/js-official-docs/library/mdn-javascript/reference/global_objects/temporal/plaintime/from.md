---
title: "Temporal.PlainTime.from()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/from/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime.from()

The **`Temporal.PlainTime.from()`** static method creates a new `Temporal.PlainTime` object from another `Temporal.PlainTime` object, an object with time properties, or an RFC 9557 string.

## Syntax

```js
Temporal.PlainTime.from(info)
Temporal.PlainTime.from(info, options)
```

### Parameters

- `info`
    One of the following:
    - A `Temporal.PlainTime` instance, which creates a copy of the instance.
    - A `Temporal.PlainDateTime` instance, which provides the time in the same fashion as `Temporal.PlainDateTime.prototype.toPlainTime()`.
    - A `Temporal.ZonedDateTime` instance, which provides the time in the same fashion as `Temporal.ZonedDateTime.prototype.toPlainTime()`.
    - An RFC 9557 string containing a time.
    - An object containing at least one of the following properties (in the order they are retrieved and validated):
      - `hour`
      - `microsecond`
      - `millisecond`
      - `minute`
      - `nanosecond`
      - `second`

      They are truncated to be integers. Out-of-range values are handled by the `overflow` option.

- `options` (optional)
    An object containing the following property:
    - `overflow` (optional)
        A string specifying the behavior when a time component is out of range (when using the object `info`). Possible values are:
        - `"constrain"` (default)
            The time component is clamped to the valid range.
        - `"reject"`
            A `RangeError` is thrown if the time component is out of range.

### Return value

A new `Temporal.PlainTime` object, representing the time specified by `info`.

### Exceptions

- `TypeError`
    Thrown in one of the following cases:
    - `info` is not an object with at least one recognized property or a string.
    - `options` is not an object or `undefined`.
- `RangeError`
    Thrown if the provided numerical properties are out of range, and `options.overflow` is set to `"reject"`.

## Examples

### Creating a PlainTime from an object

```js
const t1 = Temporal.PlainTime.from({ hour: 0 });
console.log(t1.toString()); // "00:00:00"

const t2 = Temporal.PlainTime.from({ hour: 12, minute: 34, second: 56 });
console.log(t2.toString()); // "12:34:56"

const t3 = Temporal.PlainTime.from({
  hour: 12,
  minute: 34,
  second: 56,
  millisecond: 123,
  microsecond: 456,
  nanosecond: 789,
});
console.log(t3.toString()); // "12:34:56.123456789"
```

### Controlling overflow behavior

By default, out-of-range values are clamped to the valid range:

```js
const t1 = Temporal.PlainTime.from({ hour: 25 });
console.log(t1.toString()); // "23:00:00"

const t2 = Temporal.PlainTime.from({ hour: 25, minute: 60 });
console.log(t2.toString()); // "23:59:00"
```

You can change this behavior to throw an error instead:

```js
Temporal.PlainTime.from({ hour: 25 }, { overflow: "reject" });
// RangeError: time value "hour" not in 0..23: 25
```

### Creating a PlainTime from a string

```js
const t1 = Temporal.PlainTime.from("12:34:56.123456789");
console.log(t1.toLocaleString("en-US", { timeStyle: "full" }));
// 12:34:56 PM
```

### Creating a PlainTime from another Temporal instance

```js
const dt = Temporal.PlainDateTime.from("2021-07-01T12:00");
const t = Temporal.PlainTime.from(dt);
console.log(t.toString()); // "12:00:00"

const zdt = Temporal.ZonedDateTime.from(
  "2021-07-01T00:00+08:00[Asia/Shanghai]",
);
const t2 = Temporal.PlainTime.from(zdt);
console.log(t2.toString()); // "00:00:00"

const t3 = Temporal.PlainTime.from(t);
console.log(t3.toString()); // "12:00:00"
```

## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime()`
- `Temporal.PlainTime.prototype.with()`
