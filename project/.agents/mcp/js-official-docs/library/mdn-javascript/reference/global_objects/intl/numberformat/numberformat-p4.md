---
title: "Intl.NumberFormat() constructor (part 4 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/numberformat/numberformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.NumberFormat() constructor (part 4 of 4)

### Rounding modes

If a value has more fractional digits than allowed by the constructor options, the formatted value will be _rounded_ to the specified number of fractional digits.
The _way_ in which the value is rounded depends on the `roundingMode` property.

Number formatters use `halfExpand` rounding by default, which rounds values "away from zero" at the half-increment (in other words, the _magnitude_ of the value is rounded up).

For a positive number, if the fractional digits to be removed are closer to the next increment (or on the half way point) then the remaining fractional digits will be rounded up, otherwise they are rounded down.
This is shown below: 2.23 rounded to two significant digits is truncated to 2.2 because 2.23 is less than the half increment 2.25, while values of 2.25 and greater are rounded up to 2.3:

```js
// Value below half-increment: round down.
console.log(
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  }).format(2.23),
);
// "2.2"

// Value on or above half-increment: round up.
console.log(
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  }).format(2.25),
);
console.log(
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  }).format(2.28),
);
// "2.3"
// "2.3"
```

A negative number on or below the half-increment point is also rounded away from zero (becomes more negative):

```js
// Value below half-increment: round down.
console.log(
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  }).format(-2.23),
);
// "-2.2"

// Value on or above half-increment: round up.
console.log(
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  }).format(-2.25),
);
console.log(
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  }).format(-2.28),
);
// "-2.3"
// "-2.3"
```

The table below shows the effect of different rounding modes for positive and negative values that are on and around the half-increment.

| rounding mode | 2.23 | 2.25 | 2.28 | -2.23 | -2.25 | -2.28 |
| ------------- | ---- | ---- | ---- | ----- | ----- | ----- |
| `ceil`        | 2.3  | 2.3  | 2.3  | -2.2  | -2.2  | -2.2  |
| `floor`       | 2.2  | 2.2  | 2.2  | -2.3  | -2.3  | -2.3  |
| `expand`      | 2.3  | 2.3  | 2.3  | -2.3  | -2.3  | -2.3  |
| `trunc`       | 2.2  | 2.2  | 2.2  | -2.2  | -2.2  | -2.2  |
| `halfCeil`    | 2.2  | 2.3  | 2.3  | -2.2  | -2.2  | -2.3  |
| `halfFloor`   | 2.2  | 2.2  | 2.3  | -2.2  | -2.3  | -2.3  |
| `halfExpand`  | 2.2  | 2.3  | 2.3  | -2.2  | -2.3  | -2.3  |
| `halfTrunc`   | 2.2  | 2.2  | 2.3  | -2.2  | -2.2  | -2.3  |
| `halfEven`    | 2.2  | 2.2  | 2.3  | -2.2  | -2.2  | -2.3  |

When using `halfEven`, its behavior also depends on the parity (odd or even) of the last digit of the rounded number. For example, the behavior of `halfEven` in the table above is the same as `halfTrunc`, because the magnitudes of all numbers are between a smaller "even" number (2.2) and a larger "odd" number (2.3). If the numbers are between ±2.3 and ±2.4, `halfEven` will behave like `halfExpand` instead. This behavior avoids consistently under- or over-estimating half-increments in a large data sample.

### Using roundingIncrement

Sometimes we want to round the remaining fractional digits to some other increment than the next integer.
For example, currencies for which the smallest coin is 5 cents might want to round the value to increments of 5, reflecting amounts that can actually be paid in cash.

This kind of rounding can be achieved with the `roundingIncrement` property.

For example, if `maximumFractionDigits` is 2 and `roundingIncrement` is 5, then the number is rounded to the nearest 0.05:

```js
const nf = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  roundingIncrement: 5,
});

console.log(nf.format(11.29)); // "$11.30"
console.log(nf.format(11.25)); // "$11.25"
console.log(nf.format(11.22)); // "$11.20"
```

This particular pattern is referred to as "nickel rounding", where nickel is the colloquial name for a USA 5 cent coin.
To round to the nearest 10 cents ("dime rounding"), you could change `roundingIncrement` to `10`.

```js
const nf = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  roundingIncrement: 10,
});

console.log(nf.format(11.29)); // "$11.30"
console.log(nf.format(11.25)); // "$11.30"
console.log(nf.format(11.22)); // "$11.20"
```

You can also use `roundingMode` to change the rounding algorithm.
The example below shows how `halfCeil` rounding can be used to round the value "less positive" below the half-rounding increment and "more positive" if above or on the half-increment.
The incremented digit is "0.05" so the half-increment is at .025 (below, this is shown at 11.225).

```js
const nf = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  roundingIncrement: 5,
  roundingMode: "halfCeil",
});

console.log(nf.format(11.21)); // "$11.20"
console.log(nf.format(11.22)); // "$11.20"
console.log(nf.format(11.224)); // "$11.20"
console.log(nf.format(11.225)); // "$11.25"
console.log(nf.format(11.23)); // "$11.25"
```

If you need to change the number of digits, remember that `minimumFractionDigits` and `maximumFractionDigits` must both be set to the same value, or a `RangeError` is thrown.

`roundingIncrement` cannot be mixed with significant-digits rounding or any setting of `roundingPriority` other than `auto`.

## See also

- `Intl.NumberFormat`
- `Intl.supportedValuesOf()`
- `Intl`
