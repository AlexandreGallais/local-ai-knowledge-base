# log2, log2f, log2l

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float log2f( float arg );` | (1) | (since C99) |
| `double log2( double arg );` | (2) | (since C99) |
| `long double log2l( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define log2( arg )` | (4) | (since C99) |

1-3) Computes the base `2` logarithm of `arg`.

4) Type-generic macro: If `arg` has type `long double`, `log2l` is called. Otherwise, if `arg` has integer type or the type `double`, `log2` is called. Otherwise, `log2f` is called.

### Parameters

arg - floating point value

### Return value

If no errors occur, the base-*2* logarithm of `arg` (log2(arg) or lb(arg)) is returned.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a pole error occurs, `-HUGE_VAL`, `-HUGE_VALF`, or `-HUGE_VALL` is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

Domain error occurs if `arg` is less than zero.

Pole error may occur if `arg` is zero.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is ±0, -∞ is returned and `FE_DIVBYZERO` is raised.
- If the argument is 1, +0 is returned
- If the argument is negative, NaN is returned and `FE_INVALID` is raised.
- If the argument is +∞, +∞ is returned
- If the argument is NaN, NaN is returned

### Notes

For integer `arg`, the binary logarithm can be interpreted as the zero-based index of the most significant 1 bit in the input.

### Example

```c
#include <stdio.h>
#include <math.h>
#include <float.h>
#include <errno.h>
#include <fenv.h>
// #pragma STDC FENV_ACCESS ON
int main(void)
{
    printf("log2(65536) = %f\n", log2(65536));
    printf("log2(0.125) = %f\n", log2(0.125));
    printf("log2(0x020f) = %f (highest set bit is in position 9)\n", log2(0x020f));
    printf("base-5 logarithm of 125 = %f\n", log2(125)/log2(5));
    // special values
    printf("log2(1) = %f\n", log2(1));
    printf("log2(+Inf) = %f\n", log2(INFINITY));
    //error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("log2(0) = %f\n", log2(0));
    if(errno == ERANGE) perror("    errno == ERANGE");
    if(fetestexcept(FE_DIVBYZERO)) puts("    FE_DIVBYZERO raised");
}
```

Possible output:

```text
log2(65536) = 16.000000
log2(0.125) = -3.000000
log2(0x020f) = 9.041659 (highest set bit is in position 9)
base-5 logarithm of 125 = 3.000000
log2(1) = 0.000000
log2(+Inf) = inf
log2(0) = -inf
    errno == ERANGE: Numerical result out of range
    FE_DIVBYZERO raised
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.10 The log2 functions (p: 179)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.3.10 The log2 functions (p: 381)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.10 The log2 functions (p: 246)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.10 The log2 functions (p: 522)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.10 The log2 functions (p: 226)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.10 The log2 functions (p: 459)

### See also

|  |  |
| --- | --- |
| log, logf, logl (C99), (C99) | computes natural (base-*e*) logarithm (\({\small \ln{x} }\)ln(x)) (function) |
| log10, log10f, log10l (C99), (C99) | computes common (base-*10*) logarithm (\({\small \log_{10}{x} }\)log10(x)) (function) |
| log1p, log1pf, log1pl (C99), (C99), (C99) | computes natural (base-*e*) logarithm of 1 plus the given number (\({\small \ln{(1+x)} }\)ln(1+x)) (function) |
| exp2, exp2f, exp2l (C99), (C99), (C99) | computes *2* raised to the given power (\({\small 2^x}\)2x) (function) |
| C++ documentation for log2 |  |
