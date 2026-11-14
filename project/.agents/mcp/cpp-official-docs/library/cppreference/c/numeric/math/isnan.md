# isnan

| Defined in header `<math.h>` |  |
| --- | --- |
| `#define isnan(arg) /* implementation defined */` | (since C99) |

Determines if the given floating-point number `arg` is a not-a-number (NaN) value. The macro returns an integral value.

`FLT_EVAL_METHOD` is ignored: even if the argument is evaluated with more range and precision than its type, it is first converted to its semantic type, and the classification is based on that (this matters if the evaluation type supports NaNs, while the semantic type does not).

### Parameters

arg - floating-point value

### Return value

Nonzero integral value if `arg` is a NaN, `​0​` otherwise.

### Notes

There are many different NaN values with different sign bits and payloads, see `nan`.

NaN values never compare equal to themselves or to other NaN values. Copying a NaN may change its bit pattern.

Another way to test if a floating-point value is NaN is to compare it with itself: `bool is_nan(double x) { return x != x; }`

### Example

```c
#include <float.h>
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("isnan(NAN)         = %d\n", isnan(NAN));
    printf("isnan(INFINITY)    = %d\n", isnan(INFINITY));
    printf("isnan(0.0)         = %d\n", isnan(0.0));
    printf("isnan(DBL_MIN/2.0) = %d\n", isnan(DBL_MIN / 2.0));
    printf("isnan(0.0 / 0.0)   = %d\n", isnan(0.0 / 0.0));
    printf("isnan(Inf - Inf)   = %d\n", isnan(INFINITY - INFINITY));
}
```

Possible output:

```text
isnan(NAN)         = 1
isnan(INFINITY)    = 0
isnan(0.0)         = 0
isnan(DBL_MIN/2.0) = 0
isnan(0.0 / 0.0)   = 1
isnan(Inf - Inf)   = 1
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.3.4 The isnan macro (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.3.4 The isnan macro (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.3.4 The isnan macro (p: 236-237)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.3.4 The isnan macro (p: 217)

### See also

|  |  |
| --- | --- |
| nan, nanf, nanl (C99), (C99), (C99) | returns a NaN (not-a-number) (function) |
| fpclassify (C99) | classifies the given floating-point value (function macro) |
| isfinite (C99) | checks if the given number has finite value (function macro) |
| isinf (C99) | checks if the given number is infinite (function macro) |
| isnormal (C99) | checks if the given number is normal (function macro) |
| isunordered (C99) | checks if two floating-point values are unordered (function macro) |
| C++ documentation for isnan |  |
