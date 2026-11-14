---
title: "Temporal.Instant.prototype.until()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/until/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.prototype.until()

The **`until()`** method of `Temporal.Instant` instances returns a new `Temporal.Duration` object representing the duration from this instant to another instant (in a form convertible by `Temporal.Instant.from()`). The duration is positive if the other instant is after this instant, and negative if before.

This method does `other - this`. To do `this - other`, use the `since()` method.

## Syntax

```js
until(other)
until(other, options)
```

### Parameters

- `other`
    A string or a `Temporal.Instant` instance representing an instant to subtract this instant from. It is converted to a `Temporal.Instant` object using the same algorithm as `Temporal.Instant.from()`.
- `options` (optional)
    The same options as `since()`.

### Return value

A new `Temporal.Duration` object representing the duration from this instant _until_ `other`. The duration is positive if `other` is after this instant, and negative if before.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.

## Examples

### Using until()

```js
const launch = Temporal.Instant.fromEpochMilliseconds(2051222400000);
const now = Temporal.Now.instant();
const duration = now.until(launch, { smallestUnit: "minutes" });
console.log(`It will be ${duration.toLocaleString("en-US")} until the launch`);
```

For more examples, see `since()`.

## See also

- `Temporal.Instant`
- `Temporal.Duration`
- `Temporal.Instant.prototype.add()`
- `Temporal.Instant.prototype.subtract()`
- `Temporal.Instant.prototype.since()`
