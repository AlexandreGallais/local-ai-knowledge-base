# fdim, fdimf, fdiml

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float fdimf( float x, float y );` | (1) | (since C99) |
| `double fdim( double x, double y );` | (2) | (since C99) |
| `long double fdiml( long double x, long double y );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define fdim( x, y )` | (4) | (since C99) |

1-3) Returns the positive difference between `x` and `y`, that is, if `x>y`, returns `x-y`, otherwise (if `x≤y`), returns +0.

4) Type-generic macro: If any argument has type `long double`, `fdiml` is called. Otherwise, if any argument has integer type or has type `double`, `fdim` is called. Otherwise, `fdimf` is called.

### Parameters

x, y - floating-point value

### Return value

If successful, returns the positive difference between `x` and `y`.

If a range error due to overflow occurs, `+HUGE_VAL`, `+HUGE_VALF`, or `+HUGE_VALL` is returned.

If a range error due to underflow occurs, the correct value (after rounding) is returned.

### Error handling

Errors are reported as specified in Template:rllpt.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If either argument is NaN, NaN is returned.

### Notes

Equivalent to `fmax(x-y, 0)` except for the NaN handling requirements.

### Example

```c
#include <errno.h>
#include <fenv.h>
#include <math.h>
#include <stdio.h>
// #pragma STDC FENV_ACCESS ON

int main(void)
{
    printf("fdim(4, 1) = %f, fdim(1, 4)=%f\n", fdim(4,1), fdim(1,4));
    printf("fdim(4,-1) = %f, fdim(1,-4)=%f\n", fdim(4,-1), fdim(1,-4));
    //error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("fdim(1e308, -1e308) = %f\n", fdim(1e308, -1e308));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_OVERFLOW))
        puts("    FE_OVERFLOW raised");
}
```

Possible output:

```text
fdim(4, 1) = 3.000000, fdim(1, 4)=0.000000
fdim(4,-1) = 5.000000, fdim(1,-4)=5.000000
fdim(1e308, -1e308) = inf
    errno == ERANGE: Numerical result out of range
    FE_OVERFLOW raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.12.1 The fdim functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.9.1 The fdim functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.12.1 The fdim functions (p: 187-188)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.9.1 The fdim functions (p: 386)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.12.1 The fdim functions (p: 257)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.9.1 The fdim functions (p: 530)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.12.1 The fdim functions (p: 238)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.9.1 The fdim functions (p: 466)

### See also

|  |  |
| --- | --- |
| abs, labs, llabs (C99) | computes absolute value of an integral value (\(\small{\|x\|}\)\|x\|) (function) |
| fmax, fmaxf, fmaxl (C99), (C99), (C99) | determines larger of two floating-point values (function) |
| C++ documentation for fdim |  |
