# isnormal

| Defined in header `<math.h>` |  |
| --- | --- |
| `#define isnormal(arg) /* implementation defined */` | (since C99) |

Determines if the given floating-point number `arg` is normal, i.e. is neither zero, subnormal, infinite, nor `NaN`. The macro returns an integral value.

`FLT_EVAL_METHOD` is ignored: even if the argument is evaluated with more range and precision than its type, it is first converted to its semantic type, and the classification is based on that.

### Parameters

arg - floating-point value

### Return value

Nonzero integral value if `arg` is normal, `​0​` otherwise.

### Example

```c
#include <float.h>
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("isnormal(NAN)         = %d\n", isnormal(NAN));
    printf("isnormal(INFINITY)    = %d\n", isnormal(INFINITY));
    printf("isnormal(0.0)         = %d\n", isnormal(0.0));
    printf("isnormal(DBL_MIN/2.0) = %d\n", isnormal(DBL_MIN / 2.0));
    printf("isnormal(1.0)         = %d\n", isnormal(1.0));
}
```

Output:

```text
isnormal(NAN)         = 0
isnormal(INFINITY)    = 0
isnormal(0.0)         = 0
isnormal(DBL_MIN/2.0) = 0
isnormal(1.0)         = 1
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.3.5 The isnormal macro (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.3.5 The isnormal macro (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.3.5 The isnormal macro (p: 237)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.3.5 The isnormal macro (p: 217-218)

### See also

|  |  |
| --- | --- |
| fpclassify (C99) | classifies the given floating-point value (function macro) |
| isfinite (C99) | checks if the given number has finite value (function macro) |
| isinf (C99) | checks if the given number is infinite (function macro) |
| isnan (C99) | checks if the given number is NaN (function macro) |
| C++ documentation for isnormal |  |
