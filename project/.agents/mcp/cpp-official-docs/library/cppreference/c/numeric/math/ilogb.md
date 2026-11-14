# ilogb, ilogbf, ilogbl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `int ilogbf( float arg );` | (1) | (since C99) |
| `int ilogb( double arg );` | (2) | (since C99) |
| `int ilogbl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define ilogb( arg )` | (4) | (since C99) |
| Defined in header `<math.h>` |  |  |
| `#define FP_ILOGB0 /* implementation-defined */` | (5) | (since C99) |
| `#define FP_ILOGBNAN /* implementation-defined */` | (6) | (since C99) |

1-3) Extracts the value of the unbiased exponent from the floating-point argument `arg`, and returns it as a signed integer value.

4) Type-generic macros: If `arg` has type `long double`, `ilogbl` is called. Otherwise, if `arg` has integer type or the type `double`, `ilogb` is called. Otherwise, `ilogbf` is called.

5) Expands to integer constant expression whose value is either `INT_MIN` or `-INT_MAX`.

6) Expands to integer constant expression whose value is either `INT_MIN` or `+INT_MAX`.

Formally, the unbiased exponent is the integral part of logr|arg| as a signed integral value, for non-zero `arg`, where `r` is `FLT_RADIX`.

### Parameters

arg - floating-point value

### Return value

If no errors occur, the unbiased exponent of `arg` is returned as a signed int value.

If `arg` is zero, `FP_ILOGB0` is returned.

If `arg` is infinite, `INT_MAX` is returned.

If `arg` is a NaN, `FP_ILOGBNAN` is returned.

If the correct result is greater than `INT_MAX` or smaller than `INT_MIN`, the return value is unspecified and a domain error or range error may occur.

### Error handling

Errors are reported as specified in `math_errhandling`.

A domain error or range error may occur if `arg` is zero, infinite, or NaN.

If the correct result is greater than `INT_MAX` or smaller than `INT_MIN`, a domain error or a range error may occur

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the correct result is greater than `INT_MAX` or smaller than `INT_MIN`, `FE_INVALID` is raised.
- If `arg` is ±0, ±∞, or NaN, `FE_INVALID` is raised.
- In all other cases, the result is exact (`FE_INEXACT` is never raised) and the current rounding mode is ignored.

### Notes

If `arg` is not zero, infinite, or NaN, the value returned is exactly equivalent to `(int)logb(arg)`.

POSIX requires that a domain error occurs if `arg` is zero, infinite, NaN, or if the correct result is outside of the range of `int`.

POSIX also requires that, on XSI-conformant systems, the value returned when the correct result is greater than `INT_MAX` is `INT_MAX` and the value returned when the correct result is less than `INT_MIN` is `INT_MIN`.

The correct result can be represented as `int` on all known implementations. For overflow to occur, `INT_MAX` must be less than `LDBL_MAX_EXP * log2(FLT_RADIX)` or `INT_MIN` must be greater than `LDBL_MIN_EXP - LDBL_MANT_DIG) * log2(FLT_RADIX)`.

The value of the exponent returned by `ilogb` is always 1 less than the exponent retuned by `frexp` because of the different normalization requirements: for the exponent `e` returned by `ilogb`, |arg*r-e | is between 1 and `r` (typically between `1` and `2`), but for the exponent `e` returned by `frexp`, |arg*2-e | is between `0.5` and `1`.

### Example

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

    i = ilogb(f);
    printf("logb()/ilogb() make %f * %d^%d\n", f/scalbn(1.0, i), FLT_RADIX, i);

    // error handling
    feclearexcept(FE_ALL_EXCEPT);
    printf("ilogb(0) = %d\n", ilogb(0));
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
Given the number 123.45 or 0x1.edccccccccccdp+6 in hex,
modf() makes 123 + 0.45
frexp() makes 0.964453 * 2^7
logb()/ilogb() make 1.92891 * 2^6
ilogb(0) = -2147483648
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12/8 Mathematics <math.h> (p: TBD)

- 7.12.6.5 The ilogb functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.5 The ilogb functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12/8 Mathematics <math.h> (p: TBD)

- 7.12.6.5 The ilogb functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.5 The ilogb functions (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12/8 Mathematics <math.h> (p: 232)

- 7.12.6.5 The ilogb functions (p: 244)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.5 The ilogb functions (p: 521)

- C99 standard (ISO/IEC 9899:1999):

- 7.12/8 Mathematics <math.h> (p: 213)

- 7.12.6.5 The ilogb functions (p: 224-225)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.5 The ilogb functions (p: 458)

### See also

|  |  |
| --- | --- |
| frexp, frexpf, frexpl (C99), (C99) | breaks a number into significand and a power of 2 (function) |
| logb, logbf, logbl (C99), (C99), (C99) | extracts exponent of the given number (function) |
| scalbn, scalbnf, scalbnl, scalbln, scalblnf, scalblnl (C99), (C99), (C99), (C99), (C99), (C99) | computes efficiently a number times `FLT_RADIX` raised to a power (function) |
| C++ documentation for ilogb |  |
