# erf, erff, erfl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float erff( float arg );` | (1) | (since C99) |
| `double erf( double arg );` | (2) | (since C99) |
| `long double erfl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define erf( arg )` | (4) | (since C99) |

1-3) Computes the error function of `arg`.

4) Type-generic macro: If `arg` has type `long double`, `erfl` is called. Otherwise, if `arg` has integer type or the type `double`, `erf` is called. Otherwise, `erff` is called.

### Parameters

arg - floating-point value

### Return value

If no errors occur, value of the error function of `arg`, that is \(\frac{2}{\sqrt{\pi} }\int_{0}^{arg}{e^{-{t^2} }\mathsf{d}t}\) 2 √π ∫arg 0*e*-t2 d*t*, is returned. If a range error occurs due to underflow, the correct result (after rounding), that is \(\frac{2\cdot arg}{\sqrt{\pi} }\) 2*arg √π , is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is ±0, ±0 is returned
- If the argument is ±∞, ±1 is returned
- If the argument is NaN, NaN is returned

### Notes

Underflow is guaranteed if `|arg| < DBL_MIN*(sqrt(π)/2)`.

\(\operatorname{erf}(\frac{x}{\sigma \sqrt{2} })\)erf( x σ√2 ) is the probability that a measurement whose errors are subject to a normal distribution with standard deviation \(\sigma\)σ is less than \(x\)x away from the mean value.

### Example

```c
#include <math.h>
#include <stdio.h>

double phi(double x1, double x2)
{
    return (erf(x2 / sqrt(2)) - erf(x1 / sqrt(2))) / 2;
}

int main(void)
{
    puts("normal variate probabilities:");
    for (int n = -4; n < 4; ++n)
        printf("[%2d:%2d]: %5.2f%%\n", n, n + 1, 100 * phi(n, n + 1));

    puts("special values:");
    printf("erf(-0) = %f\n", erf(-0.0));
    printf("erf(Inf) = %f\n", erf(INFINITY));
}
```

Output:

```text
normal variate probabilities:
[-4:-3]:  0.13%
[-3:-2]:  2.14%
[-2:-1]: 13.59%
[-1: 0]: 34.13%
[ 0: 1]: 34.13%
[ 1: 2]: 13.59%
[ 2: 3]:  2.14%
[ 3: 4]:  0.13%
special values:
erf(-0) = -0.000000
erf(Inf) = 1.000000
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.12.8.1 The erf functions (p: 249)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.5.1 The erf functions (p: 525)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.8.1 The erf functions (p: 230)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.5.1 The erf functions (p: 462)

### See also

|  |  |
| --- | --- |
| erfc, erfcf, erfcl (C99), (C99), (C99) | computes complementary error function (function) |
| C++ documentation for erf |  |

### External links

Weisstein, Eric W. "Erf." From MathWorld — A Wolfram Web Resource.
