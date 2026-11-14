# fmax, fmaxf, fmaxl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float fmaxf( float x, float y );` | (1) | (since C99) |
| `double fmax( double x, double y );` | (2) | (since C99) |
| `long double fmaxl( long double x, long double y );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define fmax( x, y )` | (4) | (since C99) |

1-3) Returns the larger of two floating-point arguments, treating NaNs as missing data (between a NaN and a numeric value, the numeric value is chosen).

4) Type-generic macro: If any argument has type `long double`, `fmaxl` is called. Otherwise, if any argument has integer type or has type `double`, `fmax` is called. Otherwise, `fmaxf` is called.

### Parameters

x, y - floating-point values

### Return value

If successful, returns the larger of two floating-point values. The value returned is exact and does not depend on any rounding modes.

### Error handling

This function is not subject to any of the error conditions specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If one of the two arguments is NaN, the value of the other argument is returned.
- Only if both arguments are NaN is NaN returned.

### Notes

This function is not required to be sensitive to the sign of zero, although some implementations additionally enforce that if one argument is +0 and the other is -0, then +0 is returned.

### Example

```c
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("fmax(2,1)    = %f\n", fmax(2,1));
    printf("fmax(-Inf,0) = %f\n", fmax(-INFINITY,0));
    printf("fmax(NaN,-1) = %f\n", fmax(NAN,-1));
}
```

Output:

```text
fmax(2,1)    = 2.000000
fmax(-Inf,0) = 0.000000
fmax(NaN,-1) = -1.000000
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.12.2 The fmax functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.9.2 The fmax functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.12.2 The fmax functions (p: 188)

- 7.25 Type-generic math <tgmath.h> (p: 397)

- F.10.9.2 The fmax functions (p: 386)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.12.2 The fmax functions (p: 257-258)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.9.2 The fmax functions (p: 530)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.12.2 The fmax functions (p: 238-239)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.9.2 The fmax functions (p: 466)

### See also

|  |  |
| --- | --- |
| isgreater (C99) | checks if the first floating-point argument is greater than the second (function macro) |
| fmin, fminf, fminl (C99), (C99), (C99) | determines smaller of two floating-point values (function) |
| C++ documentation for fmax |  |
