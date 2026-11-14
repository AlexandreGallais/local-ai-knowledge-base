---
title: "Math"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math

The **`Math`** namespace object contains static properties and methods for mathematical constants and functions.

`Math` works with the `Number` type. It doesn't work with `BigInt`.

## Description

Unlike most global objects, `Math` is not a constructor. You cannot use it with the `new` operator or invoke the `Math` object as a function. All properties and methods of `Math` are static.

> **Note:**
> Many `Math` functions have a precision that's _implementation-dependent_.
>
> This means that different browsers can give a different result. Even the same JavaScript engine on a different OS or architecture can give different results!

## Static properties

- `Math.E`
    Euler's number and the base of natural logarithms; approximately `2.718`.
- `Math.LN10`
    Natural logarithm of `10`; approximately `2.303`.
- `Math.LN2`
    Natural logarithm of `2`; approximately `0.693`.
- `Math.LOG10E`
    Base-10 logarithm of `E`; approximately `0.434`.
- `Math.LOG2E`
    Base-2 logarithm of `E`; approximately `1.443`.
- `Math.PI`
    Ratio of a circle's circumference to its diameter; approximately `3.14159`.
- `Math.SQRT1_2`
    Square root of ½; approximately `0.707`.
- `Math.SQRT2`
    Square root of `2`; approximately `1.414`.
- `Math[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Math"`. This property is used in `Object.prototype.toString()`.

## Static methods

- `Math.abs()`
    Returns the absolute value of the input.
- `Math.acos()`
    Returns the arccosine of the input.
- `Math.acosh()`
    Returns the hyperbolic arccosine of the input.
- `Math.asin()`
    Returns the arcsine of the input.
- `Math.asinh()`
    Returns the hyperbolic arcsine of a number.
- `Math.atan()`
    Returns the arctangent of the input.
- `Math.atan2()`
    Returns the arctangent of the quotient of its arguments.
- `Math.atanh()`
    Returns the hyperbolic arctangent of the input.
- `Math.cbrt()`
    Returns the cube root of the input.
- `Math.ceil()`
    Returns the smallest integer greater than or equal to the input.
- `Math.clz32()`
    Returns the number of leading zero bits of the 32-bit integer input.
- `Math.cos()`
    Returns the cosine of the input.
- `Math.cosh()`
    Returns the hyperbolic cosine of the input.
- `Math.exp()`
    Returns ex, where x is the argument, and e is Euler's number (`2.718`…, the base of the natural logarithm).
- `Math.expm1()`
    Returns subtracting `1` from `exp(x)`.
- `Math.floor()`
    Returns the largest integer less than or equal to the input.
- `Math.f16round()`
    Returns the nearest half precision float representation of the input.
- `Math.fround()`
    Returns the nearest single precision float representation of the input.
- `Math.hypot()`
    Returns the square root of the sum of squares of its arguments.
- `Math.imul()`
    Returns the result of the 32-bit integer multiplication of the inputs.
- `Math.log()`
    Returns the natural logarithm (㏒e; also, ㏑) of the input.
- `Math.log10()`
    Returns the base-10 logarithm of the input.
- `Math.log1p()`
    Returns the natural logarithm (㏒e; also ㏑) of `1 + x` for the number `x`.
- `Math.log2()`
    Returns the base-2 logarithm of the input.
- `Math.max()`
    Returns the largest of zero or more numbers.
- `Math.min()`
    Returns the smallest of zero or more numbers.
- `Math.pow()`
    Returns base `x` to the exponent power `y` (that is, `x``y`).
- `Math.random()`
    Returns a pseudo-random number between `0` and `1`.
- `Math.round()`
    Returns the value of the input rounded to the nearest integer.
- `Math.sign()`
    Returns the sign of the input, indicating whether it is positive, negative, or zero.
- `Math.sin()`
    Returns the sine of the input.
- `Math.sinh()`
    Returns the hyperbolic sine of the input.
- `Math.sqrt()`
    Returns the positive square root of the input.
- `Math.sumPrecise()`
    Returns the sum of a passed iterable of numbers, avoiding floating point precision loss in intermediate results.
- `Math.tan()`
    Returns the tangent of the input.
- `Math.tanh()`
    Returns the hyperbolic tangent of the input.
- `Math.trunc()`
    Returns the integer portion of the input, removing any fractional digits.

## Examples

### Converting between degrees and radians

The trigonometric functions `sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`, and `atan2()` expect (and return) angles in _radians_.

Since humans tend to think in degrees, and some functions (such as CSS transforms) can accept degrees, it is a good idea to keep functions handy that convert between the two:

```js
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function radToDeg(rad) {
  return rad / (Math.PI / 180);
}
```

### Calculating the height of an equilateral triangle

If we want to calculate the height of an equilateral triangle, and we know its side length is 100, we can use the formulae _length of the adjacent multiplied by the tangent of the angle is equal to the opposite._

In JavaScript, we can do this with the following:

```js
50 * Math.tan(degToRad(60));
```

We use our `degToRad()` function to convert 60 degrees to radians, as `Math.tan()` expects an input value in radians.

### Returning a random integer between two bounds

This can be achieved with a combination of `Math.random()` and `Math.floor()`:

```js
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

random(1, 10);
```

## See also

- `Number`
