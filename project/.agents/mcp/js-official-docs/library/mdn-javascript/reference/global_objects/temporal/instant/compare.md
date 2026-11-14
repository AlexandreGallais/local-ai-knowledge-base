---
title: "Temporal.Instant.compare()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/compare/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.compare()

The **`Temporal.Instant.compare()`** static method returns a number (-1, 0, or 1) indicating whether the first instant comes before, is the same as, or comes after the second instant. It is equivalent to comparing the `epochNanoseconds` of the two instants.

## Syntax

```js
Temporal.Instant.compare(instant1, instant2)
```

### Parameters

- `instant1`
    A string or a `Temporal.Instant` instance representing the first instant to compare. It is converted to a `Temporal.Instant` object using the same algorithm as `Temporal.Instant.from()`.
- `instant2`
    The second instant to compare, converted to a `Temporal.Instant` object using the same algorithm as `instant1`.

### Return value

Returns `-1` if `instant1` comes before `instant2`, `0` if they are the same, and `1` if `instant1` comes after `instant2`.

## Examples

### Using Temporal.Instant.compare()

```js
const instant1 = Temporal.Instant.from("2021-08-01T12:34:56Z");
const instant2 = Temporal.Instant.from("2021-08-01T12:34:56Z");

console.log(Temporal.Instant.compare(instant1, instant2)); // 0

const instant3 = Temporal.Instant.from("2021-08-01T13:34:56Z");
console.log(Temporal.Instant.compare(instant1, instant3)); // -1
```

### Sorting an array of instants

The purpose of this `compare()` function is to act as a comparator to be passed to `Array.prototype.sort()` and related functions.

```js
const instants = [
  Temporal.Instant.from("2021-08-01T12:34:56Z"),
  Temporal.Instant.from("2021-08-01T12:34:56+01:00"),
  Temporal.Instant.from("2021-08-01T12:34:56-01:00"),
];

instants.sort(Temporal.Instant.compare);
console.log(instants.map((instant) => instant.toString()));
// [ '2021-08-01T11:34:56Z', '2021-08-01T12:34:56Z', '2021-08-01T13:34:56Z' ]
```

## See also

- `Temporal.Instant`
- `Temporal.Instant.prototype.equals()`
