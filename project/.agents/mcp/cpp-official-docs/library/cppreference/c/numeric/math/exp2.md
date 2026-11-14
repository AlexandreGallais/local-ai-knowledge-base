# exp2, exp2f, exp2l

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float exp2f( float n );` | (1) | (since C99) |
| `double exp2( double n );` | (2) | (since C99) |
| `long double exp2l( long double n );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define exp2( n )` | (4) | (since C99) |

1-3) Computes 2 raised to the given power `n`.

4) Type-generic macro: If `n` has type `long double`, `exp2l` is called. Otherwise, if `n` has integer type or the type `double`, `exp2` is called. Otherwise, `exp2f` is called.

### Parameters

n - floating-point value

### Return value

If no errors occur, the base-*2* exponential of `n` (2n ) is returned.

If a range error due to overflow occurs, `+HUGE_VAL`, `+HUGE_VALF`, or `+HUGE_VALL` is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is ±0, 1 is returned
- If the argument is -∞, +0 is returned
- If the argument is +∞, +∞ is returned
- If the argument is NaN, NaN is returned

### Example

```c
#include <errno.h>
#include <fenv.h>
#include <float.h>
#include <math.h>
#include <stdio.h>
// #pragma STDC FENV_ACCESS ON

int main(void)
{
    printf("exp2(5) = %f\n", exp2(5));
    printf("exp2(0.5) = %f\n", exp2(0.5));
    printf("exp2(-4) = %f\n", exp2(-4));
    // special values
    printf("exp2(-0.9) = %f\n", exp2(-0.9));
    printf("exp2(-Inf) = %f\n", exp2(-INFINITY));
    //error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("exp2(1024) = %f\n", exp2(1024));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_OVERFLOW))
        puts("    FE_OVERFLOW raised");
}
```

Possible output:

```text
exp2(5) = 32.000000
exp2(0.5) = 1.414214
exp2(-4) = 0.062500
exp2(-0.9) = 0.535887
exp2(-Inf) = 0.000000
exp2(1024) = Inf
    errno == ERANGE: Result too large
    FE_OVERFLOW raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.6.2 The exp2 functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.2 The exp2 functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.2 The exp2 functions (p: 177)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.3.2 The exp2 functions (p: 379)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.2 The exp2 functions (p: 242-243)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.2 The exp2 functions (p: 521)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.2 The exp2 functions (p: 223)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.2 The exp2 functions (p: 458)

### See also

|  |  |
| --- | --- |
| exp, expf, expl (C99), (C99) | computes *e* raised to the given power (\({\small e^x}\)ex) (function) |
| expm1, expm1f, expm1l (C99), (C99), (C99) | computes *e* raised to the given power, minus one (\({\small e^x-1}\)ex-1) (function) |
| log2, log2f, log2l (C99), (C99), (C99) | computes base-2 logarithm (\({\small \log_{2}{x} }\)log2(x)) (function) |
| C++ documentation for exp2 |  |
