# modf, modff, modfl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float modff( float arg, float* iptr );` | (1) | (since C99) |
| `double modf( double arg, double* iptr );` | (2) |  |
| `long double modfl( long double arg, long double* iptr );` | (3) | (since C99) |

1-3) Decomposes given floating-point value `arg` into integral and fractional parts, each having the same type and sign as `arg`. The integral part (in floating-point format) is stored in the object pointed to by `iptr`.

### Parameters

|  |  |  |
| --- | --- | --- |
| arg | - | floating-point value |
| iptr | - | pointer to floating-point value to store the integral part to |

### Return value

If no errors occur, returns the fractional part of `arg` with the same sign as `arg`. The integral part is put into the value pointed to by `iptr`.

The sum of the returned value and the value stored in `*iptr` gives `arg` (allowing for rounding).

### Error handling

This function is not subject to any errors specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If `arg` is ±0, ±0 is returned, and ±0 is stored in `*iptr`.
- If `arg` is ±∞, ±0 is returned, and ±∞ is stored in `*iptr`.
- If `arg` is NaN, NaN is returned, and NaN is stored in `*iptr`.
- The returned value is exact, the current rounding mode is ignored.

### Notes

This function behaves as if implemented as follows:

```c
double modf(double value, double *iptr)
{
#pragma STDC FENV_ACCESS ON
    int save_round = fegetround();
    fesetround(FE_TOWARDZERO);
    *iptr = std::nearbyint(value);
    fesetround(save_round);
    return copysign(isinf(value) ? 0.0 : value - (*iptr), value);
}
```

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
    printf("modf() makes %.2f + %.2f\n", f3, f2);

    int i;
    f2 = frexp(f, &i);
    printf("frexp() makes %f * 2^%d\n", f2, i);

    i = ilogb(f);
    printf("logb()/ilogb() make %f * %d^%d\n", f / scalbn(1.0, i), FLT_RADIX, i);

    // special values
    f2 = modf(-0.0, &f3);
    printf("modf(-0) makes %.2f + %.2f\n", f3, f2);
    f2 = modf(-INFINITY, &f3);
    printf("modf(-Inf) makes %.2f + %.2f\n", f3, f2);
}
```

Possible output:

```text
Given the number 123.45 or 0x1.edccccccccccdp+6 in hex,
modf() makes 123.00 + 0.45
frexp() makes 0.964453 * 2^7
logb()/ilogb() make 1.92891 * 2^6
modf(-0) makes -0.00 + -0.00
modf(-Inf) makes -INF + -0.00
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.6.12 The modf functions (p: TBD)

- F.10.3.12 The modf functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.12 The modf functions (p: TBD)

- F.10.3.12 The modf functions (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.12 The modf functions (p: 246-247)

- F.10.3.12 The modf functions (p: 523)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.12 The modf functions (p: 227)

- F.9.3.12 The modf functions (p: 460)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.4.6 The modf function

### See also

|  |  |
| --- | --- |
| trunc, truncf, truncl (C99), (C99), (C99) | rounds to nearest integer not greater in magnitude than the given value (function) |
| C++ documentation for modf |  |
