# nan, nanf, nanl, nand32, nand64, nand128

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float nanf( const char* arg );` | (1) | (since C99) |
| `double nan( const char* arg );` | (2) | (since C99) |
| `long double nanl( const char* arg );` | (3) | (since C99) |
| `_Decimal32 nand32( const char* arg );` | (4) | (since C23) |
| `_Decimal64 nand64( const char* arg );` | (5) | (since C23) |
| `_Decimal128 nand128( const char* arg );` | (6) | (since C23) |

Converts the implementation-defined character string `arg` into the corresponding quiet NaN value, as if by calling the appropriate parsing function `strtoX`, as follows:

- The call `nan("n-char-sequence")`, where n-char-sequence is a sequence of digits, Latin letters, and underscores, is equivalent to the call `/*strtoX*/("NAN(n-char-sequence)", (char**)NULL);`.
- The call `nan("")` is equivalent to the call `/*strtoX*/("NAN()", (char**)NULL);`.
- The call `nan("string")`, where `string` is neither an n-char-sequence nor an empty string, is equivalent to the call `/*strtoX*/("NAN", (char**)NULL);`.

1) The parsing function is `strtof`.

2) The parsing function is `strtod`.

3) The parsing function is `strtold`.

4) The parsing function is `strtod32`.

5) The parsing function is `strtod64`.

6) The parsing function is `strtod128`.

The functions returning decimal floating point values are declared if and only the implementation predefines `__STDC_IEC_60559_DFP__` (i.e. the implementation supports decimal floating point numbers). (since C23)

### Parameters

arg - narrow character string identifying the contents of a NaN

### Return value

The quiet NaN value that corresponds to the identifying string `arg` or zero if the implementation does not support quiet NaNs.

If the implementation supports IEEE floating-point arithmetic (IEC 60559), it also supports quiet NaNs.

### Error handling

This function is not subject to any of the error conditions specified in `math_errhandling`.

### Example

```c
#include <stdio.h>
#include <math.h>
#include <stdint.h>
#include <inttypes.h>
#include <string.h>

int main(void)
{
    double f1 = nan("1");
    uint64_t f1n; memcpy(&f1n, &f1, sizeof f1);
    printf("nan(\"1\")   = %f (%" PRIx64 ")\n", f1, f1n);

    double f2 = nan("2");
    uint64_t f2n; memcpy(&f2n, &f2, sizeof f2);
    printf("nan(\"2\")   = %f (%" PRIx64 ")\n", f2, f2n);

    double f3 = nan("0xF");
    uint64_t f3n; memcpy(&f3n, &f3, sizeof f3);
    printf("nan(\"0xF\") = %f (%" PRIx64 ")\n", f3, f3n);
}
```

Possible output:

```text
nan("1")   = nan (7ff8000000000001)
nan("2")   = nan (7ff8000000000002)
nan("0xF") = nan (7ff800000000000f)
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.12.11.2 The nan functions (p: 186-187)

- F.10.8.2 The nan functions (p: 386)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.11.2 The nan functions (p: 256)

- F.10.8.2 The nan functions (p: 529)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.11.2 The nan functions (p: 237)

- F.9.8.2 The fabs functions (p: 465)

### See also

|  |  |
| --- | --- |
| isnan (C99) | checks if the given number is NaN (function macro) |
| NAN (C99) | evaluates to a quiet NaN of type `float` (macro constant) |
| C++ documentation for nanf, nan, nanl |  |
