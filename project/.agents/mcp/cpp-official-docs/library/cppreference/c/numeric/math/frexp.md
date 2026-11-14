# frexp, frexpf, frexpl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float frexpf( float arg, int* exp );` | (1) | (since C99) |
| `double frexp( double arg, int* exp );` | (2) |  |
| `long double frexpl( long double arg, int* exp );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define frexp( arg, exp )` | (4) | (since C99) |

1-3) Decomposes given floating-point value `x` into a normalized fraction and an integral power of two.

4) Type-generic macro: If `arg` has type `long double`, `frexpl` is called. Otherwise, if `arg` has integer type or the type `double`, `frexp` is called. Otherwise, `frexpf` is called, respectively.

### Parameters

|  |  |  |
| --- | --- | --- |
| arg | - | floating-point value |
| exp | - | pointer to integer value to store the exponent to |

### Return value

If `arg` is zero, returns zero and stores zero in `*exp`.

Otherwise (if `arg` is not zero), if no errors occur, returns the value `x` in the range `(-1;-0.5], [0.5; 1)` and stores an integer value in `*exp` such that x×2(*exp) =arg.

If the value to be stored in `*exp` is outside the range of `int`, the behavior is unspecified.

If `arg` is not a floating-point number, the behavior is unspecified.

### Error handling

This function is not subject to any errors specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If `arg` is ±0, it is returned, unmodified, and `0` is stored in `*exp`.
- If `arg` is ±∞, it is returned, and an unspecified value is stored in `*exp`.
- If `arg` is NaN, NaN is returned, and an unspecified value is stored in `*exp`.
- No floating-point exceptions are raised.
- If `FLT_RADIX` is `2` (or a power of 2), the returned value is exact, the current rounding mode is ignored.

### Notes

On a binary system (where `FLT_RADIX` is `2`), `frexp` may be implemented as

```c
{
    *exp = (value == 0) ? 0 : (int)(1 + logb(value));
    return scalbn(value, -(*exp));
}
```

The function `frexp`, together with its dual, `ldexp`, can be used to manipulate the representation of a floating-point number without direct bit manipulations.

### Example

```c
#include <float.h>
#include <math.h>
#include <stdio.h>

int main(void)
{
    double f = 123.45;
    printf("Given the number %.2f or %a in hex,\n", f, f);

    double f3;
    double f2 = modf(f, &f3);
    printf("modf() makes %.0f + %.2f\n", f3, f2);

    int i;
    f2 = frexp(f, &i);
    printf("frexp() makes %f * 2^%d\n", f2, i);

    i = ilogb(f);
    printf("logb()/ilogb() make %f * %d^%d\n", f/scalbn(1.0, i), FLT_RADIX, i);
}
```

Possible output:

```text
Given the number 123.45 or 0x1.edccccccccccdp+6 in hex,
modf() makes 123 + 0.45
frexp() makes 0.964453 * 2^7
logb()/ilogb() make 1.92891 * 2^6
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.6.4 The frexp functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.4 The frexp functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.4 The frexp functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.4 The frexp functions (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.4 The frexp functions (p: 243)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.4 The frexp functions (p: 521)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.4 The frexp functions (p: 224)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.4 The frexp functions (p: 458)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.4.2 The frexp function

### See also

|  |  |
| --- | --- |
| ldexp, ldexpf, ldexpl (C99), (C99) | multiplies a number by 2 raised to a power (function) |
| logb, logbf, logbl (C99), (C99), (C99) | extracts exponent of the given number (function) |
| ilogb, ilogbf, ilogbl (C99), (C99), (C99) | extracts exponent of the given number (function) |
| modf, modff, modfl (C99), (C99) | breaks a number into integer and fractional parts (function) |
| C++ documentation for frexp |  |
