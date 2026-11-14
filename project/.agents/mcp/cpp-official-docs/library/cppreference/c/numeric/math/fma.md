# fma, fmaf, fmal

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float fmaf( float x, float y, float z );` | (1) | (since C99) |
| `double fma( double x, double y, double z );` | (2) | (since C99) |
| `long double fmal( long double x, long double y, long double z );` | (3) | (since C99) |
| `#define FP_FAST_FMA /* implementation-defined */` | (4) | (since C99) |
| `#define FP_FAST_FMAF /* implementation-defined */` | (5) | (since C99) |
| `#define FP_FAST_FMAL /* implementation-defined */` | (6) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define fma( x, y, z )` | (7) | (since C99) |

1-3) Computes `(x * y) + z` as if to infinite precision and rounded only once to fit the result type.

4-6) If the macro constants `FP_FAST_FMA`, `FP_FAST_FMAF`, or `FP_FAST_FMAL` are defined, the corresponding function `fma`, `fmaf`, or `fmal` evaluates faster (in addition to being more precise) than the expression `x * y + z` for `double`, `float`, and `long double` arguments, respectively. If defined, these macros evaluate to integer `1`.

7) Type-generic macro: If any argument has type `long double`, `fmal` is called. Otherwise, if any argument has integer type or has type `double`, `fma` is called. Otherwise, `fmaf` is called.

### Parameters

x, y, z - floating-point values

### Return value

If successful, returns the value of `(x * y) + z` as if calculated to infinite precision and rounded once to fit the result type (or, alternatively, calculated as a single ternary floating-point operation).

If a range error due to overflow occurs, `±HUGE_VAL`, `±HUGE_VALF`, or `±HUGE_VALL` is returned.

If a range error due to underflow occurs, the correct value (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If `x` is zero and `y` is infinite or if `x` is infinite and `y` is zero, and
  - if `z` is not a NaN, then NaN is returned and `FE_INVALID` is raised,
  - if `z` is a NaN, then NaN is returned and `FE_INVALID` may be raised.
- If `x * y` is an exact infinity and `z` is an infinity with the opposite sign, NaN is returned and `FE_INVALID` is raised.
- If `x` or `y` are NaN, NaN is returned.
- If `z` is NaN, and `x * y` is not `0 * Inf` or `Inf * 0`, then NaN is returned (without `FE_INVALID`).

### Notes

This operation is commonly implemented in hardware as fused multiply-add CPU instruction. If supported by hardware, the appropriate `FP_FAST_FMA*` macros are expected to be defined, but many implementations make use of the CPU instruction even when the macros are not defined.

POSIX specifies that the situation where the value `x * y` is invalid and `z` is a NaN is a domain error.

Due to its infinite intermediate precision, `fma` is a common building block of other correctly-rounded mathematical operations, such as `sqrt` or even the division (where not provided by the CPU, e.g. Itanium).

As with all floating-point expressions, the expression `(x * y) + z` may be compiled as a fused mutiply-add unless the `#pragma` `STDC FP_CONTRACT` is off.

### Example

```c
#include <fenv.h>
#include <float.h>
#include <math.h>
#include <stdio.h>
// #pragma STDC FENV_ACCESS ON

int main(void)
{
    // demo the difference between fma and built-in operators
    double in = 0.1;
    printf("0.1 double is %.23f (%a)\n", in, in);
    printf("0.1*10 is 1.0000000000000000555112 (0x8.0000000000002p-3),"
           " or 1.0 if rounded to double\n");
    double expr_result = 0.1 * 10 - 1;
    printf("0.1 * 10 - 1 = %g : 1 subtracted after "
           "intermediate rounding to 1.0\n", expr_result);
    double fma_result = fma(0.1, 10, -1);
    printf("fma(0.1, 10, -1) = %g (%a)\n", fma_result, fma_result);

    // fma use in double-double arithmetic
    printf("\nin double-double arithmetic, 0.1 * 10 is representable as ");
    double high = 0.1 * 10;
    double low = fma(0.1, 10, -high);
    printf("%g + %g\n\n", high, low);

    // error handling
    feclearexcept(FE_ALL_EXCEPT);
    printf("fma(+Inf, 10, -Inf) = %f\n", fma(INFINITY, 10, -INFINITY));
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
0.1 double is 0.10000000000000000555112 (0x1.999999999999ap-4)
0.1*10 is 1.0000000000000000555112 (0x8.0000000000002p-3), or 1.0 if rounded to double
0.1 * 10 - 1 = 0 : 1 subtracted after intermediate rounding to 1.0
fma(0.1, 10, -1) = 5.55112e-17 (0x1p-54)

in double-double arithmetic, 0.1 * 10 is representable as 1 + 5.55112e-17

fma(+Inf, 10, -Inf) = -nan
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.13.1 The fma functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.10.1 The fma functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.13.1 The fma functions (p: 188-189)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.10.1 The fma functions (p: 386)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.13.1 The fma functions (p: 258)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.10.1 The fma functions (p: 530)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.13.1 The fma functions (p: 239)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.10.1 The fma functions (p: 466)

### See also

|  |  |
| --- | --- |
| remainder, remainderf, remainderl (C99), (C99), (C99) | computes signed remainder of the floating-point division operation (function) |
| remquo, remquof, remquol (C99), (C99), (C99) | computes signed remainder as well as the three last bits of the division operation (function) |
| C++ documentation for fma |  |
