---
title: "Temporal.Duration.prototype.with()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/duration/with/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Duration.prototype.with()

The **`with()`** method of `Temporal.Duration` instances returns a new `Temporal.Duration` object representing this duration with some fields replaced by new values. Because all `Temporal` objects are designed to be immutable, this method essentially functions as the setter for the duration's fields.

## Syntax

```js
with(info)
```

### Parameters

- `info`
    An object containing at least one of the properties recognized by `Temporal.Duration.from()`: `years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`, `microseconds`, `nanoseconds`. Unspecified properties use the values from the original duration.

### Return value

A new `Temporal.Duration` object, where the fields specified in `info` that are not `undefined` are replaced by the corresponding values, and the rest of the fields are copied from the original duration.

### Exceptions

- `RangeError`
    Thrown in one of the following cases:
    - Any of the recognized properties in the `info` object is not an integer (including non-finite values).
    - A calendar unit (years, months, weeks) has an absolute value ≥ 232.
    - The non-calendar part of the duration (days and below), when expressed in seconds, has an absolute value ≥ 253.
- `TypeError`
    Thrown in one of the following cases:
    - The `info` object is not an object.
    - All of the recognized properties in the `info` object are `undefined`.

## Examples

### Using with()

You can use `with()` to achieve fine-grained control over the fields of a `Temporal.Duration` object. For example, you can manually balance a duration only on one unit, which `round()` does not offer:

```js
function balanceMinutes(duration) {
  const { hours, minutes } = duration;
  const totalMinutes = hours * 60 + minutes;
  const balancedMinutes = totalMinutes % 60;
  const balancedHours = (totalMinutes - balancedMinutes) / 60;
  return duration.with({ hours: balancedHours, minutes: balancedMinutes });
}

const d1 = Temporal.Duration.from({ hours: 100, minutes: 100, seconds: 100 });
const d2 = balanceMinutes(d1);
console.log(d2.hours); // 101
console.log(d2.minutes); // 40
console.log(d2.seconds); // 100; remains unbalanced
```

## See also

- `Temporal.Duration`
- `Temporal.Duration.from()`
- `Temporal.Duration.prototype.add()`
- `Temporal.Duration.prototype.subtract()`
- `Temporal.Duration.prototype.round()`
