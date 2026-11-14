# FLT_EVAL_METHOD

| Defined in header `<float.h>` |  |
| --- | --- |
| `#define FLT_EVAL_METHOD /* implementation-defined */` | (since C99) |

Specifies range and precision of floating-point values obtained from floating-point constants and from all operations (operators, implicit conversions of operands) except assignment, cast, and library function call.

| Value | Explanation |
| --- | --- |
| negative values except `-1` | implementation-defined behavior |
| `-1` | the default precision is not known |
| `​0​` | all operations and constants evaluate in the range and precision of the type used. Additionally, `float_t` and `double_t` are equivalent to `float` and `double` respectively |
| `1` | all operations and constants evaluate in the range and precision of `double`. Additionally, both `float_t` and `double_t` are equivalent to `double` |
| `2` | all operations and constants evaluate in the range and precision of `long double`. Additionally, both `float_t` and `double_t` are equivalent to `long double` |

### Notes

Regardless of the value of `FLT_EVAL_METHOD`, any floating-point expression may be *contracted*, that is, calculated as if all intermediate results have infinite range and precision (unless `#pragma` `STDC FP_CONTRACT` is off).

Cast and assignment strip away any extraneous range and precision: this models the action of storing a value from an extended-precision FPU register into a standard-sized memory location.

### See also

|  |  |
| --- | --- |
| float_t (C99) | most efficient floating-point type at least as wide as `float` (typedef) |
| double_t (C99) | most efficient floating-point type at least as wide as `double` (typedef) |
| C++ documentation for FLT_EVAL_METHOD |  |
