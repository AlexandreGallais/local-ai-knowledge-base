# FLT_ROUNDS

Defined in header `<float.h>`

`#define FLT_ROUNDS /* implementation defined */`

Returns the current rounding direction of floating-point arithmetic operations.

| Value | Explanation |
| --- | --- |
| `-1` | the default rounding direction is not known |
| `0` | toward zero; same meaning as `FE_TOWARDZERO` |
| `1` | to nearest; same meaning as `FE_TONEAREST` |
| `2` | towards positive infinity; same meaning as `FE_UPWARD` |
| `3` | towards negative infinity; same meaning as `FE_DOWNWARD` |
| other values | implementation-defined behavior |

### Notes

The rounding mode can be changed with `fesetround` and `FLT_ROUNDS` reflects that change.

### See also

|  |  |
| --- | --- |
| fegetround, fesetround (C99), (C99) | gets or sets rounding direction (function) |
| FE_DOWNWARD, FE_TONEAREST, FE_TOWARDZERO, FE_UPWARD (C99) | floating-point rounding direction (macro constant) |
| C++ documentation for FLT_ROUNDS |  |
