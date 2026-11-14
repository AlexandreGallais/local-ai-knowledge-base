# logb, logbf, logbl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float logbf( float arg );` | (1) | (since C99) |
| `double logb( double arg );` | (2) | (since C99) |
| `long double logbl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define logb( arg )` | (4) | (since C99) |

1-3) Extracts the value of the unbiased radix-independent exponent from the floating-point argument `arg`, and returns it as a floating-point value.

4) Type-generic macros: If `arg` has type `long double`, `logbl` is called. Otherwise, if `arg` has integer type or the type `double`, `logb` is called. Otherwise, `logbf` is called.

Formally, the unbiased exponent is the signed integral part of logr|arg| (returned by this function as a floating-point value), for non-zero `arg`, where `r` is `FLT_RADIX`. If `arg` is subnormal, it is treated as though it was normalized.

### Parameters

arg - floating-point value

### Return value

If no errors occur, the unbiased exponent of `arg` is returned as a signed floating-point value.

If a domain error occurs, an implementation-defined value is returned.

If a pole error occurs, `-HUGE_VAL`, `-HUGE_VALF`, or `-HUGE_VALL` is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

Domain or range error may occur if `arg` is zero.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If `arg` is ±0, -∞ is returned and `FE_DIVBYZERO` is raised.
- If `arg` is ±∞, +∞ is returned.
- If `arg` is NaN, NaN is returned.
- In all other cases, the result is exact (`FE_INEXACT` is never raised) and the current rounding mode is ignored.

### Notes

POSIX requires that a pole error occurs if `arg` is ±0.

The value of the exponent returned by `logb` is always `1` less than the exponent returned by `frexp` because of the different normalization requirements: for the exponent `e` returned by `logb`, |arg*r-e | is between `1` and `r` (typically between `1` and `2`), but for the exponent `e` returned by `frexp`, |arg*2-e | is between `0.5` and `1`.

### Example

Compares different floating-point decomposition functions.

```c
#include <fenv.h>
#include <float.h>
#include <math.h>
#include <stdio.h>
// #pragma STDC FENV_ACCESS ON

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

    i = logb(f);
    printf("logb()/logb() make %f * %d^%d\n", f/scalbn(1.0, i), FLT_RADIX, i);

    // error handling
    feclearexcept(FE_ALL_EXCEPT);
    printf("logb(0) = %f\n", logb(0));
    if (fetestexcept(FE_DIVBYZERO))
        puts("    FE_DIVBYZERO raised");
}
```

Possible output:

```text
Given the number 123.45 or 0x1.edccccccccccdp+6 in hex,
modf() makes 123 + 0.45
frexp() makes 0.964453 * 2^7
logb()/logb() make 1.928906 * 2^6
logb(0) = -Inf
    FE_DIVBYZERO raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.6.11 The logb functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.11 The logb functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.11 The logb functions (p: 179-180)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.11 The logb functions (p: 381)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.11 The logb functions (p: 246)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.11 The logb functions (p: 522)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.11 The logb functions (p: 227)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.11 The logb functions (p: 459)

### See also

|  |  |
| --- | --- |
| frexp, frexpf, frexpl (C99), (C99) | breaks a number into significand and a power of 2 (function) |
| ilogb, ilogbf, ilogbl (C99), (C99), (C99) | extracts exponent of the given number (function) |
| scalbn, scalbnf, scalbnl, scalbln, scalblnf, scalblnl (C99), (C99), (C99), (C99), (C99), (C99) | computes efficiently a number times `FLT_RADIX` raised to a power (function) |
| C++ documentation for logb |  |
