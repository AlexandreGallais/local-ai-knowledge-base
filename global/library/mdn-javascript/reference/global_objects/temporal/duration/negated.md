---
title: "Temporal.Duration.prototype.negated()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/duration/negated/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Duration.prototype.negated()

The **`negated()`** method of `Temporal.Duration` instances returns a new `Temporal.Duration` object with the negated value of this duration (all fields keep the same magnitude, but sign becomes reversed).

## Syntax

```js
negated()
```

### Parameters

None.

### Return value

A new `Temporal.Duration` object, where all fields have the same magnitude as this duration, but the sign is reversed (positive fields become negative, and vice versa).

## Examples

### Using negated()

```js
const d1 = Temporal.Duration.from({ hours: 1, minutes: 30 });
const d2 = Temporal.Duration.from({ hours: -1, minutes: -30 });

console.log(d1.negated().toString()); // "-PT1H30M"
console.log(d2.negated().toString()); // "PT1H30M"
```

## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.abs()`
- `Temporal.Duration.prototype.sign`
