# fpclassify

| Defined in header `<math.h>` |  |
| --- | --- |
| `#define fpclassify(arg) /* implementation defined */` | (since C99) |

Categorizes floating-point value `arg` into the following categories: zero, subnormal, normal, infinite, NAN, or implementation-defined category. The macro returns an integral value.

`FLT_EVAL_METHOD` is ignored: even if the argument is evaluated with more range and precision than its type, it is first converted to its semantic type, and the classification is based on that: a normal long double value might become subnormal when converted to double and zero when converted to `float`.

### Parameters

arg - floating-point value

### Return value

One of `FP_INFINITE`, `FP_NAN`, `FP_NORMAL`, `FP_SUBNORMAL`, `FP_ZERO` or implementation-defined type, specifying the category of `arg`.

### Example

```c
#include <float.h>
#include <math.h>
#include <stdio.h>

const char* show_classification(double x)
{
    switch(fpclassify(x))
    {
        case FP_INFINITE:  return "Inf";
        case FP_NAN:       return "NaN";
        case FP_NORMAL:    return "normal";
        case FP_SUBNORMAL: return "subnormal";
        case FP_ZERO:      return "zero";
        default:           return "unknown";
    }
}

int main(void)
{
    printf("1.0/0.0 is %s\n", show_classification(1 / 0.0));
    printf("0.0/0.0 is %s\n", show_classification(0.0 / 0.0));
    printf("DBL_MIN/2 is %s\n", show_classification(DBL_MIN / 2));
    printf("-0.0 is %s\n", show_classification(-0.0));
    printf("1.0 is %s\n", show_classification(1.0));
}
```

Output:

```text
1.0/0.0 is Inf
0.0/0.0 is NaN
DBL_MIN/2 is subnormal
-0.0 is zero
1.0 is normal
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.3.1 The fpclassify macro (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.3.1 The fpclassify macro (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.3.1 The fpclassify macro (p: 235)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.3.1 The fpclassify macro (p: 216)

### See also

|  |  |
| --- | --- |
| isfinite (C99) | checks if the given number has finite value (function macro) |
| isinf (C99) | checks if the given number is infinite (function macro) |
| isnan (C99) | checks if the given number is NaN (function macro) |
| isnormal (C99) | checks if the given number is normal (function macro) |
| C++ documentation for fpclassify |  |
