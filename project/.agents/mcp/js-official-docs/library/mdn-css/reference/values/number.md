---
title: "`<number>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/number/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<number>` CSS type

The **`<number>`** CSS data type represents a number, being either an integer, a number with a fractional component, or a base-ten exponent in scientific notation.

## Syntax

The syntax of `<number>` extends the syntax of `<integer>`. A fractional value is represented by a `.` followed by one or more decimal digits, and may be appended to an integer. A `<number>` can also end with the letter `e` or `E` followed by an integer, which indicates a base-ten exponent in scientific notation. There is no unit associated with numbers.

As with integers, the first character of the number can be immediately preceded by - or + to indicate the number's sign: whether the number is positive or negative.

## Interpolation

When animated, values of the `<number>` CSS data type are interpolated as real, floating-point numbers. The speed of the interpolation is determined by the easing function associated with the animation.

## Examples

### Valid numbers

```plain
12          A raw <integer> is also a <number>.
4.01        Positive fraction
-456.8      Negative fraction
0.0         Zero
+0.0        Zero, with a leading +
-0.0        Zero, with a leading -
.60         Fractional number without a leading zero
10e3        Scientific notation
-3.4e-2     Complicated scientific notation
```

### Invalid numbers

```plain
12.         Decimal points must be followed by at least one digit.
+-12.2      Only one leading +/- is allowed.
12.1.1      Only one decimal point is allowed.
```

## See also

- `integer`
- `ratio`
- CSS values and units module
