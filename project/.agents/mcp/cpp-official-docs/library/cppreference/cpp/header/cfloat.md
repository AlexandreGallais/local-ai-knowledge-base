# Standard library header <cfloat>

This header was originally in the C standard library as `<float.h>`.

This header is part of the type support library, in particular, it is a part of the C numeric limits interface.

### Macros

|  |  |
| --- | --- |
| FLT_RADIX | the radix (integer base) used by the representation of all three floating-point types (macro constant) |
| DECIMAL_DIG (C++11) | conversion from `long double` to decimal with at least `DECIMAL_DIG` digits and back to `long double` is the identity conversion: this is the decimal precision required to serialize/deserialize a `long double` (see also `std::numeric_limits::max_digits10`) (macro constant) |
| FLT_DECIMAL_DIG, DBL_DECIMAL_DIG, LDBL_DECIMAL_DIG (C++17) | conversion from `float`/`double`/`long double` to decimal with at least `FLT_DECIMAL_DIG`/`DBL_DECIMAL_DIG`/`LDBL_DECIMAL_DIG` digits and back is the identity conversion: this is the decimal precision required to serialize/deserialize a floating-point value (see also `std::numeric_limits::max_digits10`). Defined to at least `6`, `10`, and `10` respectively, or `9` for IEEE float and `17` for IEEE double. (macro constant) |
| FLT_MIN, DBL_MIN, LDBL_MIN | minimum normalized positive value of `float`, `double` and `long double` respectively (macro constant) |
| FLT_TRUE_MIN, DBL_TRUE_MIN, LDBL_TRUE_MIN (C++17) | minimum positive value of `float`, `double` and `long double` respectively (macro constant) |
| FLT_MAX, DBL_MAX, LDBL_MAX | maximum finite value of `float`, `double` and `long double` respectively (macro constant) |
| FLT_EPSILON, DBL_EPSILON, LDBL_EPSILON | difference between `1.0` and the next representable value for `float`, `double` and `long double` respectively (macro constant) |
| FLT_DIG, DBL_DIG, LDBL_DIG | number of decimal digits that are guaranteed to be preserved in text → `float`/`double`/`long double` → text roundtrip without change due to rounding or overflow (see `std::numeric_limits::digits10` for explanation) (macro constant) |
| FLT_MANT_DIG, DBL_MANT_DIG, LDBL_MANT_DIG | number of base `FLT_RADIX` digits that can be represented without losing precision for `float`, `double` and `long double` respectively (macro constant) |
| FLT_MIN_EXP, DBL_MIN_EXP, LDBL_MIN_EXP | minimum negative integer such that `FLT_RADIX` raised by power one less than that integer is a normalized `float`, `double` and `long double` respectively (macro constant) |
| FLT_MIN_10_EXP, DBL_MIN_10_EXP, LDBL_MIN_10_EXP | minimum negative integer such that `10` raised to that power is a normalized `float`, `double` and `long double` respectively (macro constant) |
| FLT_MAX_EXP, DBL_MAX_EXP, LDBL_MAX_EXP | maximum positive integer such that `FLT_RADIX` raised by power one less than that integer is a representable finite `float`, `double` and `long double` respectively (macro constant) |
| FLT_MAX_10_EXP, DBL_MAX_10_EXP, LDBL_MAX_10_EXP | maximum positive integer such that `10` raised to that power is a representable finite `float`, `double` and `long double` respectively (macro constant) |
| FLT_ROUNDS | default rounding mode of floating-point arithmetic (macro constant) |
| FLT_EVAL_METHOD (C++11) | specifies in what precision all arithmetic operations are done (macro constant) |
| FLT_HAS_SUBNORM, DBL_HAS_SUBNORM, LDBL_HAS_SUBNORM (C++17) | specifies whether the type supports subnormal (denormal) numbers: `-1` – indeterminable, `​0​` – absent, `1` – present (macro constant) |

### Synopsis

```cpp
#define FLT_ROUNDS           /* see definition */
#define FLT_EVAL_METHOD      /* see definition */
#define FLT_HAS_SUBNORM      /* see definition */
#define DBL_HAS_SUBNORM      /* see definition */
#define LDBL_HAS_SUBNORM     /* see definition */
#define FLT_RADIX            /* see definition */
#define FLT_MANT_DIG         /* see definition */
#define DBL_MANT_DIG         /* see definition */
#define LDBL_MANT_DIG        /* see definition */
#define FLT_DECIMAL_DIG      /* see definition */
#define DBL_DECIMAL_DIG      /* see definition */
#define LDBL_DECIMAL_DIG     /* see definition */
#define DECIMAL_DIG          /* see definition */
#define FLT_DIG              /* see definition */
#define DBL_DIG              /* see definition */
#define LDBL_DIG             /* see definition */
#define FLT_MIN_EXP          /* see definition */
#define DBL_MIN_EXP          /* see definition */
#define LDBL_MIN_EXP         /* see definition */
#define FLT_MIN_10_EXP       /* see definition */
#define DBL_MIN_10_EXP       /* see definition */
#define LDBL_MIN_10_EXP      /* see definition */
#define FLT_MAX_EXP          /* see definition */
#define DBL_MAX_EXP          /* see definition */
#define LDBL_MAX_EXP         /* see definition */
#define FLT_MAX_10_EXP       /* see definition */
#define DBL_MAX_10_EXP       /* see definition */
#define LDBL_MAX_10_EXP      /* see definition */
#define FLT_MAX              /* see definition */
#define DBL_MAX              /* see definition */
#define LDBL_MAX             /* see definition */
#define FLT_EPSILON          /* see definition */
#define DBL_EPSILON          /* see definition */
#define LDBL_EPSILON         /* see definition */
#define FLT_MIN              /* see definition */
#define DBL_MIN              /* see definition */
#define LDBL_MIN             /* see definition */
#define FLT_TRUE_MIN         /* see definition */
#define DBL_TRUE_MIN         /* see definition */
#define LDBL_TRUE_MIN        /* see definition */
```

### See also

C documentation for Limits of floating-point types
