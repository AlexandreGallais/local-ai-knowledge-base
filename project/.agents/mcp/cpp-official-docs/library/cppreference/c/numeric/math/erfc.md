# erfc, erfcf, erfcl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float erfcf( float arg );` | (1) | (since C99) |
| `double erfc( double arg );` | (2) | (since C99) |
| `long double erfcl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define erfc( arg )` | (4) | (since C99) |

1-3) Computes the complementary error function of `arg`, that is `1.0 - erf(arg)`, but without loss of precision for large `arg`.

4) Type-generic macro: If `arg` has type `long double`, `erfcl` is called. Otherwise, if `arg` has integer type or the type `double`, `erfc` is called. Otherwise, `erfcf` is called.

### Parameters

arg - floating-point value

### Return value

If no errors occur, value of the complementary error function of `arg`, that is \(\frac{2}{\sqrt{\pi} }\int_{arg}^{\infty}{e^{-{t^2} }\mathsf{d}t}\) 2 √π ∫∞ arg*e*-t2 d*t* or \({\small 1-\operatorname{erf}(arg)}\)1-erf(arg), is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is +∞, +0 is returned.
- If the argument is -∞, 2 is returned.
- If the argument is NaN, NaN is returned.

### Notes

For the IEEE-compatible type `double`, underflow is guaranteed if `arg` > `26.55`.

### Example

```c
#include <math.h>
#include <stdio.h>

double normalCDF(double x) // Phi(-∞, x) aka N(x)
{
    return erfc(-x / sqrt(2)) / 2;
}

int main(void)
{
    puts("normal cumulative distribution function:");
    for (double n = 0; n < 1; n += 0.1)
        printf("normalCDF(%.2f) %5.2f%%\n", n, 100 * normalCDF(n));

    printf("special values:\n"
           "erfc(-Inf) = %f\n"
           "erfc(Inf) = %f\n",
           erfc(-INFINITY),
           erfc(INFINITY));
}
```

Output:

```text
normal cumulative distribution function:
normalCDF(0.00) 50.00%
normalCDF(0.10) 53.98%
normalCDF(0.20) 57.93%
normalCDF(0.30) 61.79%
normalCDF(0.40) 65.54%
normalCDF(0.50) 69.15%
normalCDF(0.60) 72.57%
normalCDF(0.70) 75.80%
normalCDF(0.80) 78.81%
normalCDF(0.90) 81.59%
normalCDF(1.00) 84.13%
special values:
erfc(-Inf) = 2.000000
erfc(Inf) = 0.000000
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.8.2 The erfc functions (p: 249-250)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.5.2 The erfc functions (p: 525)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.8.2 The erfc functions (p: 249-250)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.5.2 The erfc functions (p: 525)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.8.2 The erfc functions (p: 249-250)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.5.2 The erfc functions (p: 525)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.8.2 The erfc functions (p: 230)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.5.2 The erfc functions (p: 462)

### See also

|  |  |
| --- | --- |
| erf, erff, erfl (C99), (C99), (C99) | computes error function (function) |
| C++ documentation for erfc |  |

### External links

Weisstein, Eric W. "Erfc." From MathWorld — A Wolfram Web Resource.
