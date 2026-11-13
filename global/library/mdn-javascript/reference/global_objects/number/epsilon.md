---
title: "Number.EPSILON"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/number/epsilon/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Number.EPSILON

The **`Number.EPSILON`** static data property represents the difference between 1 and the smallest floating point number greater than 1.

```js
const result = Math.abs(0.2 - 0.3 + 0.1);

console.log(result);
// Expected output: 2.7755575615628914e-17

console.log(result < Number.EPSILON);
// Expected output: true
```

## Value

2-52, or approximately `2.2204460492503130808472633361816E-16`.

## Description

`Number.EPSILON` is the difference between 1 and the next greater number representable in the Number format, because double precision floating point format only has 52 bits to represent the mantissa, and the lowest bit has a significance of 2-52.

Note that the absolute accuracy of floating numbers decreases as the number gets larger, because the exponent grows while the mantissa's accuracy stays the same. `Number.MIN_VALUE` is the smallest representable positive number, which is much smaller than `Number.EPSILON`.

Because `EPSILON` is a static property of `Number`, you always use it as `Number.EPSILON`, rather than as a property of a number value.

## Examples

### Testing equality

Any number encoding system occupying a finite number of bits, of whatever base you choose (e.g., decimal or binary), will _necessarily_ be unable to represent all numbers exactly, because you are trying to represent an infinite number of points on the number line using a finite amount of memory. For example, a base-10 (decimal) system cannot represent 1/3 exactly, and a base-2 (binary) system cannot represent `0.1` exactly. Thus, for example, `0.1 + 0.2` is not exactly equal to `0.3`:

```js
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
```

For this reason, it is often advised that **floating point numbers should never be compared with `===`**. Instead, we can deem two numbers as equal if they are _close enough_ to each other. The `Number.EPSILON` constant is usually a reasonable threshold for errors if the arithmetic is around the magnitude of `1`, because `EPSILON`, in essence, specifies how accurate the number "1" is.

```js
function equal(x, y) {
  return Math.abs(x - y) < Number.EPSILON;
}

const x = 0.2;
const y = 0.3;
const z = 0.1;
console.log(equal(x + z, y)); // true
```

However, `Number.EPSILON` is inappropriate for any arithmetic operating on a larger magnitude. If your data is on the 103 order of magnitude, the decimal part will have a much smaller accuracy than `Number.EPSILON`:

```js
function equal(x, y) {
  return Math.abs(x - y) < Number.EPSILON;
}

const x = 1000.1;
const y = 1000.2;
const z = 2000.3;
console.log(x + y); // 2000.3000000000002; error of 10^-13 instead of 10^-16
console.log(equal(x + y, z)); // false
```

In this case, a larger tolerance is required. As the numbers compared have a magnitude of approximately `2000`, a multiplier such as `2000 * Number.EPSILON` creates enough tolerance for this instance.

```js
function equal(x, y, tolerance = Number.EPSILON) {
  return Math.abs(x - y) < tolerance;
}

const x = 1000.1;
const y = 1000.2;
const z = 2000.3;
console.log(equal(x + y, z, 2000 * Number.EPSILON)); // true
```

In addition to magnitude, it is important to consider the _accuracy_ of your input. For example, if the numbers are collected from a form input and the input value can only be adjusted by steps of `0.1` (i.e., ``), it usually makes sense to allow a much larger tolerance, such as `0.01`, since the data only has a precision of `0.1`.

> **Note:**
> Important takeaway: do not simply use `Number.EPSILON` as a threshold for equality testing. Use a threshold that is appropriate for the magnitude and accuracy of the numbers you are comparing.

## See also

- Polyfill of `Number.EPSILON` in `core-js`
- es-shims polyfill of `Number.EPSILON`
- `Number`
