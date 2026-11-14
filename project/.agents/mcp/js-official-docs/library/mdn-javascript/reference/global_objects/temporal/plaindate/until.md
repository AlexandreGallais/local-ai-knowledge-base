---
title: "Temporal.PlainDate.prototype.until()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/until/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.until()

The **`until()`** method of `Temporal.PlainDate` instances returns a new `Temporal.Duration` object representing the duration from this date to another date (in a form convertible by `Temporal.PlainDate.from()`). The duration is positive if the other date is after this date, and negative if before.

This method does `other - this`. To do `this - other`, use the `since()` method.

## Syntax

```js
until(other)
until(other, options)
```

### Parameters

- `other`
    A string, an object, or a `Temporal.PlainDate` instance representing a date to subtract this date from. It is converted to a `Temporal.PlainDate` object using the same algorithm as `Temporal.PlainDate.from()`. It must have the same calendar as `this`.
- `options` (optional)
    The same options as `since()`.

### Return value

A new `Temporal.Duration` object representing the duration from this date _until_ `other`. The duration is positive if `other` is after this date, and negative if before.

### Exceptions

- `RangeError`
    Thrown in one of the following cases:
    - `other` has a different calendar than `this`.
    - Any of the options is invalid.

## Examples

### Using until()

```js
const launch = Temporal.PlainDate.from("2035-01-01");
const now = Temporal.Now.plainDateISO();
const duration = now.until(launch);
console.log(`It will be ${duration.toLocaleString("en-US")} until the launch`);
```

For more examples, see `since()`.

## See also

- `Temporal.PlainDate`
- `Temporal.Duration`
- `Temporal.PlainDate.prototype.add()`
- `Temporal.PlainDate.prototype.subtract()`
- `Temporal.PlainDate.prototype.since()`
