---
title: "Temporal.ZonedDateTime.prototype.epochNanoseconds"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/epochnanoseconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.epochNanoseconds

The **`epochNanoseconds`** accessor property of `Temporal.ZonedDateTime` instances returns a `BigInt` representing the number of nanoseconds elapsed since the Unix epoch (midnight at the beginning of January 1, 1970, UTC) to this instant.

The set accessor of `epochNanoseconds` is `undefined`. You cannot change this property directly. To create a new `Temporal.ZonedDateTime` object with the desired new `epochNanoseconds` value, use the `new Temporal.ZonedDateTime()` constructor instead.

An instant can only represent ±108 days (about ±273,972.6 years) around the epoch, which is ±8.64e21 nanoseconds. Attempting to set `epochNanoseconds` beyond this boundary throws a `RangeError`.

## Examples

### Using epochNanoseconds

```js
const zdt = Temporal.ZonedDateTime.from("2021-08-01T12:34:56.789Z[UTC]");
console.log(zdt.epochNanoseconds); // 1627821296789000000n

const zdt2 = Temporal.ZonedDateTime.from("1969-08-01T12:34:56.789Z[UTC]");
console.log(zdt2.epochNanoseconds); // -13173903211000000n
```

### Creating a ZonedDateTime object from an epochNanoseconds value

You can create a `Temporal.ZonedDateTime` object from an `epochNanoseconds` value using the `Temporal.ZonedDateTime()` constructor.

```js
const epochNanoseconds = 1627821296789000000n;
const zdt = new Temporal.ZonedDateTime(epochNanoseconds, "UTC");
console.log(zdt.toString()); // 2021-08-01T12:34:56.789+00:00[UTC]
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.epochMilliseconds`
