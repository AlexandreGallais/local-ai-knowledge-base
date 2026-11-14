---
title: "Temporal.ZonedDateTime.prototype.getTimeZoneTransition()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/gettimezonetransition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.getTimeZoneTransition()

The **`getTimeZoneTransition()`** method of `Temporal.ZonedDateTime` instances returns a `Temporal.ZonedDateTime` object representing the closest instant after or before this instant at which the time zone's UTC offset changes (the returned instant is the first instant after the change), or `null` if there is no such transition. This is useful for finding out the offset rules of a time zone, such as its daylight saving time pattern.

Note that instants returned about the future may be unreliable, for example due to changes to the time zone definitions.

## Syntax

```js
getTimeZoneTransition(direction)
getTimeZoneTransition(options)
```

### Parameters

- `direction`
    A string representing the `direction` option. This is a convenience overload, so `getTimeZoneTransition(direction)` is equivalent to `getTimeZoneTransition({ direction })`, where `direction` is a string.
- `options`
    An object containing the following property:
    - `direction`
        Whether to search before or after the current instant. Must be one of `"next"` or `"previous"`.

### Return value

A `Temporal.ZonedDateTime` object with instant `t`, such that:

- The time zone offset at `t` is different from the offset one nanosecond before `t`.
- `t < this.epochNanoseconds` if `direction` is `"previous"`, or `t > this.epochNanoseconds` if `direction` is `"next"`.
- For all instants between `this.epochNanoseconds` and `t`, exclusive, the offset is constant.

If there is no such transition, `null` is returned.

## Examples

### Finding the next time zone transition

```js
const dt = Temporal.ZonedDateTime.from("2024-01-01T00-05:00[America/New_York]");
const transition = dt.getTimeZoneTransition("next");
console.log(transition.toString()); // "2024-03-10T03:00:00-04:00[America/New_York]"

const transition2 = transition.getTimeZoneTransition("next");
console.log(transition2.toString()); // "2024-11-03T01:00:00-05:00[America/New_York]"

const transition3 = dt.getTimeZoneTransition("previous");
console.log(transition3.toString()); // "2023-11-05T01:00:00-05:00[America/New_York]"

const dt2 = Temporal.ZonedDateTime.from("2024-01-01T00Z[UTC]");
console.log(dt2.getTimeZoneTransition("next")); // null
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.subtract()`
- `Temporal.ZonedDateTime.prototype.timeZoneId`
- `Temporal.ZonedDateTime.prototype.offset`
