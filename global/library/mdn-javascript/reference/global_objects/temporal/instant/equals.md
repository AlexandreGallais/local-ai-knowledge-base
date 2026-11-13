---
title: "Temporal.Instant.prototype.equals()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/equals/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.prototype.equals()

The **`equals()`** method of `Temporal.Instant` instances returns `true` if this instant is equivalent in value to another instant (in a form convertible by `Temporal.Instant.from()`), and `false` otherwise. They are compared by their `epochNanoseconds`. It is equivalent to `Temporal.Instant.compare(this, other) === 0`.

## Syntax

```js
equals(other)
```

### Parameters

- `other`
    A string or a `Temporal.Instant` instance representing the other instant to compare. It is converted to a `Temporal.Instant` object using the same algorithm as `Temporal.Instant.from()`.

### Return value

`true` if this instant is equal to `other` by nanoseconds, `false` otherwise.

## Examples

### Using equals()

```js
const instant1 = Temporal.Instant.from("2021-08-01T12:34:56Z");
const instant2 = Temporal.Instant.fromEpochMilliseconds(1627821296000);
console.log(instant1.equals(instant2)); // true
```

## See also

- `Temporal.Instant`
- `Temporal.Instant.compare()`
