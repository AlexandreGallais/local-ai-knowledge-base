---
title: "parseInt()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/parseint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# parseInt()

The **`parseInt()`** function parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems).

```js
console.log(parseInt("123"));
// 123 (default base-10)
console.log(parseInt("123", 10));
// 123 (explicitly specify base-10)
console.log(parseInt("   123 "));
// 123 (whitespace is ignored)
console.log(parseInt("077"));
// 77 (leading zeros are ignored)
console.log(parseInt("1.9"));
// 1 (decimal part is truncated)
console.log(parseInt("ff", 16));
// 255 (lower-case hexadecimal)
console.log(parseInt("0xFF", 16));
// 255 (upper-case hexadecimal with "0x" prefix)
console.log(parseInt("xyz"));
// NaN (input can't be converted to an integer)
```

## Syntax

```js
parseInt(string)
parseInt(string, radix)
```

### Parameters

- `string`
    A string starting with an integer. Leading whitespace in this argument is ignored.
- `radix` (optional)
    An integer between `2` and `36` that represents the _radix_ (the base in mathematical numeral systems) of the `string`. It is converted to a 32-bit integer; if it's nonzero and outside the range of \[2, 36] after conversion, the function will always return `NaN`. If `0` or not provided, the radix will be inferred based on `string`'s value. Be careful — this does _not_ always default to `10`! The description below explains in more detail what happens when `radix` is not provided.

### Return value

An integer parsed from the given `string`, or `NaN` when

- the `radix` as a 32-bit integer is smaller than `2` or bigger than `36`, or
- the first non-whitespace character cannot be converted to a number.

> **Note:**
> JavaScript does not have the distinction of "floating point numbers" and "integers" on the language level. `parseInt()` and `parseFloat()` only differ in their parsing behavior, but not necessarily their return values. For example, `parseInt("42")` and `parseFloat("42")` would return the same value: a `Number` 42.

## Description

The `parseInt` function converts its first argument to a string, parses that string, then returns an integer or `NaN`.

If not `NaN`, the return value will be the integer that is the first argument taken as a number in the specified `radix`. (For example, a `radix` of `10` converts from a decimal number, `8` converts from octal, `16` from hexadecimal, and so on.)

The `radix` argument is converted to a number. If it's unprovided, or if the value becomes 0, `NaN` or `Infinity` (`undefined` is coerced to `NaN`), JavaScript assumes the following:

1. If the input `string`, with leading whitespace and possible `+`/`-` signs removed, begins with `0x` or `0X` (a zero, followed by lowercase or uppercase X), `radix` is assumed to be `16` and the rest of the string is parsed as a hexadecimal number.
2. If the input `string` begins with any other value, the radix is `10` (decimal).

> **Note:**
> Other prefixes like `0b`, which are valid in number literals, are treated as normal digits by `parseInt()`. `parseInt()` does _not_ treat strings beginning with a `0` character as octal values either. The only prefix that `parseInt()` recognizes is `0x` or `0X` for hexadecimal values — everything else is parsed as a decimal value if `radix` is missing. `Number()` or `BigInt()` can be used instead to parse these prefixes.

If the radix is `16`, `parseInt()` allows the string to be optionally prefixed by `0x` or `0X` after the optional sign character (`+`/`-`).

If the radix value (coerced if necessary) is not in range \[2, 36] (inclusive) `parseInt` returns `NaN`.

For radices above `10`, letters of the English alphabet indicate numerals greater than `9`. For example, for hexadecimal numbers (base `16`), `A` through `F` are used. The letters are case-insensitive.

`parseInt` understands exactly two signs: `+` for positive, and `-` for negative. It is done as an initial step in the parsing after whitespace is removed. If no signs are found, the algorithm moves to the following step; otherwise, it removes the sign and runs the number-parsing on the rest of the string.

If `parseInt` encounters a character in the input string that is not a valid numeral in the specified `radix`, it ignores it and all succeeding characters and returns the integer value parsed up to that point. For example, `parseInt("2", 2)` returns `NaN` because `2` is not a valid numeral in the binary number system. Likewise, although `1e3` technically encodes an integer (and will be correctly parsed to the integer `1000` by `parseFloat()`), `parseInt("1e3", 10)` returns `1`, because `e` is not a valid numeral in base 10. Because `.` is not a numeral either, the return value will always be an integer.

If the first character cannot be converted to a number with the radix in use, `parseInt` returns `NaN`. Leading whitespace is allowed.

For arithmetic purposes, the `NaN` value is not a number in any radix. You can call the `Number.isNaN` function to determine if the result of `parseInt` is `NaN`. If `NaN` is passed on to arithmetic operations, the operation result will also be `NaN`.

Because large numbers use the `e` character in their string representation (e.g., `6.022e23` for 6.022 × 1023), using `parseInt` to truncate numbers will produce unexpected results when used on very large or very small numbers. `parseInt` should _not_ be used as a substitute for `Math.trunc()`.

To convert a number to its string literal in a particular radix, use `thatNumber.toString(radix)`.

Because `parseInt()` returns a number, it may suffer from loss of precision if the integer represented by the string is outside the safe range. The `BigInt()` function supports parsing integers of arbitrary length accurately, by returning a `BigInt`.

## Examples

### Using parseInt()

The following examples all return `15`:

```js
parseInt("0xF", 16);
parseInt("F", 16);
parseInt("17", 8);
parseInt("015", 10);
parseInt("15,123", 10);
parseInt("FXX123", 16);
parseInt("1111", 2);
parseInt("15 * 3", 10);
parseInt("15e2", 10);
parseInt("15px", 10);
parseInt("12", 13);
```

The following examples all return `NaN`:

```js
parseInt("Hello", 8); // Not a number at all
parseInt("546", 2); // Digits other than 0 or 1 are invalid for binary radix
```

The following examples all return `-15`:

```js
parseInt("-F", 16);
parseInt("-0F", 16);
parseInt("-0XF", 16);
parseInt("-17", 8);
parseInt("-15", 10);
parseInt("-1111", 2);
parseInt("-15e1", 10);
parseInt("-12", 13);
```

The following example returns `224`:

```js
parseInt("0e0", 16);
```

`parseInt()` does not handle `BigInt` values. It stops at the `n` character, and treats the preceding string as a normal integer, with possible loss of precision.

```js
parseInt("900719925474099267n");
// 900719925474099300
```

You should pass the string to the `BigInt()` function instead, without the trailing `n` character.

```js
BigInt("900719925474099267");
// 900719925474099267n
```

`parseInt` doesn't work with numeric separators:

```js
parseInt("123_456"); // 123
```

### Using parseInt() on non-strings

`parseInt()` can have interesting results when working on non-strings combined with a high radix; for example, `36` (which makes all alphanumeric characters valid numeric digits).

```js
parseInt(null, 36); // 1112745: The string "null" is 1112745 in base 36
parseInt(undefined, 36); // 86464843759093: The string "undefined" is 86464843759093 in base 36
```

In general, it's a bad idea to use `parseInt()` on non-strings, especially to use it as a substitution for `Math.trunc()`. It may work on small numbers:

```js
parseInt(15.99, 10); // 15
parseInt(-15.1, 10); // -15
```

However, it only happens to work because the string representation of these numbers uses basic <example-value> notation (`"15.99"`, `"-15.1"`), where `parseInt()` stops at the decimal point. Numbers greater than or equal to 1e+21 or less than or equal to 1e-7 use exponential notation (`"1.5e+22"`, `"1.51e-8"`) in their string representation, and `parseInt()` will stop at the `e` character or decimal point, which always comes after the first digit. This means for large and small numbers, `parseInt()` will return a one-digit integer:

```js
parseInt(4.7 * 1e22, 10); // Very large number becomes 4
parseInt(0.00000000000434, 10); // Very small number becomes 4

parseInt(0.0000001, 10); // 1
parseInt(0.000000123, 10); // 1
parseInt(1e-7, 10); // 1
parseInt(1000000000000000000000, 10); // 1
parseInt(123000000000000000000000, 10); // 1
parseInt(1e21, 10); // 1
```

## See also

- `parseFloat()`
- `Number()` constructor
- `Number.parseFloat()`
- `Number.parseInt()`
- `isNaN()`
- `Number.prototype.toString()`
- `Object.prototype.valueOf()`
- `BigInt()` constructor
