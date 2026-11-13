---
title: "Temporal.PlainTime.prototype.with()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/with/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime.prototype.with()

The **`with()`** method of `Temporal.PlainTime` instances returns a new `Temporal.PlainTime` object representing this time with some fields replaced by new values. Because all `Temporal` objects are designed to be immutable, this method essentially functions as the setter for the time's fields.

## Syntax

```js
with(info)
with(info, options)
```

### Parameters

- `info`
    An object containing at least one of the properties recognized by `Temporal.PlainTime.from()`: `hour`, `microsecond`, `millisecond`, `minute`, `nanosecond`, `second`. Unspecified properties use the values from the original time.
- `options` (optional)
    An object containing the following property:
    - `overflow` (optional)
        A string specifying the behavior when a time component is out of range. Possible values are:
        - `"constrain"` (default)
            The time component is clamped to the valid range.
        - `"reject"`
            A `RangeError` is thrown if the time component is out of range.

### Return value

A new `Temporal.PlainTime` object, where the fields specified in `info` that are not `undefined` are replaced by the corresponding values, and the rest of the fields are copied from the original time.

### Exceptions

- `TypeError`
    Thrown in one of the following cases:
    - `info` is not an object with at least one recognized property or a string.
    - `options` is not an object or `undefined`.
- `RangeError`
    Thrown if the provided numerical properties are out of range, and `options.overflow` is set to `"reject"`.

## Examples

### Using with()

```js
const time = Temporal.PlainTime.from("12:34:56.123456789");
const newTime = time.with({ hour: 23 });
console.log(newTime.toString()); // '23:34:56.123456789'
```

For more examples, see the documentation for the individual properties that can be set using `with()`.

## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.from()`
- `Temporal.PlainTime.prototype.add()`
- `Temporal.PlainTime.prototype.subtract()`
