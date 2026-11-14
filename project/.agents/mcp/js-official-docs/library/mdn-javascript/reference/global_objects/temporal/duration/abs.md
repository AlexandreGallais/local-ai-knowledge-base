---
title: "Temporal.Duration.prototype.abs()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/duration/abs/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Duration.prototype.abs()

The **`abs()`** method of `Temporal.Duration` instances returns a new `Temporal.Duration` object with the absolute value of this duration (all fields have the same magnitude, but sign becomes positive).

## Syntax

```js
abs()
```

### Parameters

None.

### Return value

A new `Temporal.Duration` object with the absolute value of this duration, which is either the same as this duration if it is already positive, or its negation if it is negative.

## Examples

### Using abs()

```js
const d1 = Temporal.Duration.from({ hours: 1, minutes: 30 });
const d2 = Temporal.Duration.from({ hours: -1, minutes: -30 });

console.log(d1.abs().toString()); // "PT1H30M"
console.log(d2.abs().toString()); // "PT1H30M"
```

## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.negated()`
- `Temporal.Duration.prototype.sign`
