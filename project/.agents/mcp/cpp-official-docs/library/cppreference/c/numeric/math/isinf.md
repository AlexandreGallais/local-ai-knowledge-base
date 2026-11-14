# isinf

| Defined in header `<math.h>` |  |
| --- | --- |
| `#define isinf(arg) /* implementation defined */` | (since C99) |

Determines if the given floating-point number `arg` is positive or negative infinity. The macro returns an integral value.

`FLT_EVAL_METHOD` is ignored: even if the argument is evaluated with more range and precision than its type, it is first converted to its semantic type, and the classification is based on that.

### Parameters

arg - floating-point value

### Return value

Nonzero integral value if `arg` has an infinite value, `​0​` otherwise.

### Example

```c
#include <stdio.h>
#include <math.h>
#include <float.h>

int main(void)
{
    printf("isinf(NAN)         = %d\n", isinf(NAN));
    printf("isinf(INFINITY)    = %d\n", isinf(INFINITY));
    printf("isinf(0.0)         = %d\n", isinf(0.0));
    printf("isinf(DBL_MIN/2.0) = %d\n", isinf(DBL_MIN/2.0));
    printf("isinf(1.0)         = %d\n", isinf(1.0));
    printf("isinf(exp(800))    = %d\n", isinf(exp(800)));
}
```

Possible output:

```text
isinf(NAN)         = 0
isinf(INFINITY)    = 1
isinf(0.0)         = 0
isinf(DBL_MIN/2.0) = 0
isinf(1.0)         = 0
isinf(exp(800))    = 1
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.12.3.3 The isinf macro (p: 172)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.3.3 The isinf macro (p: 236)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.3.3 The isinf macro (p: 217)

### See also

|  |  |
| --- | --- |
| fpclassify (C99) | classifies the given floating-point value (function macro) |
| isfinite (C99) | checks if the given number has finite value (function macro) |
| isnan (C99) | checks if the given number is NaN (function macro) |
| isnormal (C99) | checks if the given number is normal (function macro) |
| C++ documentation for isinf |  |
