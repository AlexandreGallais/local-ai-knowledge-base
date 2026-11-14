# signbit

| Defined in header `<math.h>` |  |
| --- | --- |
| `#define signbit( arg ) /* implementation defined */` | (since C99) |

Determines if the given floating-point number `arg` is negative. The macro returns an integral value.

### Parameters

arg - floating-point value

### Return value

Nonzero integral value if `arg` is negative, `​0​` otherwise.

### Notes

This macro detects the sign bit of zeroes, infinities, and NaNs. Along with `copysign`, this macro is one of the only two portable ways to examine the sign of a NaN.

### Example

```c
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("signbit(+0.0) = %d\n", signbit(+0.0));
    printf("signbit(-0.0) = %d\n", signbit(-0.0));
}
```

Possible output:

```text
signbit(+0.0) = 0
signbit(-0.0) = 128
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.3.6 The signbit macro (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.3.6 The signbit macro (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.3.6 The signbit macro (p: 237)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.3.6 The signbit macro (p: 218)

### See also

|  |  |
| --- | --- |
| fabs, fabsf, fabsl (C99), (C99) | computes absolute value of a floating-point value (\(\small{\|x\|}\)\|x\|) (function) |
| copysign, copysignf, copysignl (C99), (C99), (C99) | produces a value with the magnitude of a given value and the sign of another given value (function) |
| C++ documentation for signbit |  |
