# atof

Defined in header `<stdlib.h>`

`double atof( const char* str );`

Interprets a floating-point value in a byte string pointed to by `str`.

Function discards any whitespace characters (as determined by `isspace`) until first non-whitespace character is found. Then it takes as many characters as possible to form a valid floating-point representation and converts them to a floating-point value. The valid floating-point value can be one of the following:

- decimal floating-point expression. It consists of the following parts:

- (optional) plus or minus sign
- nonempty sequence of decimal digits optionally containing decimal-point character (as determined by the current C locale) (defines significand)
- (optional) `e` or `E` followed with optional minus or plus sign and nonempty sequence of decimal digits (defines exponent to base 10)

hexadecimal floating-point expression. It consists of the following parts: (optional) plus or minus sign `0x` or `0X` nonempty sequence of hexadecimal digits optionally containing a decimal-point character (as determined by the current C locale) (defines significand) (optional) `p` or `P` followed with optional minus or plus sign and nonempty sequence of decimal digits (defines exponent to base 2) infinity expression. It consists of the following parts: (optional) plus or minus sign `INF` or `INFINITY` ignoring case not-a-number expression. It consists of the following parts: (optional) plus or minus sign `NAN` or `NAN(`*char_sequence*`)` ignoring case of the `NAN` part. *char_sequence* can only contain digits, Latin letters, and underscores. The result is a quiet NaN floating-point value. (since C99)

- any other expression that may be accepted by the currently installed C locale

### Parameters

str - pointer to the null-terminated byte string to be interpreted

### Return value

`double` value corresponding to the contents of `str` on success. If the converted value falls out of range of the return type, the return value is undefined. If no conversion can be performed, `0.0` is returned.

### Notes

The name stands for "ASCII to float".

### Example

```c
#include <stdlib.h>
#include <stdio.h>

int main(void)
{
    printf("%g\n", atof("  -0.0000000123junk"));
    printf("%g\n", atof("0.012"));
    printf("%g\n", atof("15e16"));
    printf("%g\n", atof("-0x1afp-2"));
    printf("%g\n", atof("inF"));
    printf("%g\n", atof("Nan"));
    printf("%g\n", atof("1.0e+309"));   // UB: out of range of double
    printf("%g\n", atof("0.0"));
    printf("%g\n", atof("junk"));       // no conversion can be performed
}
```

Possible output:

```text
-1.23e-08
0.012
1.5e+17
-107.75
inf
nan
inf
0
0
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.22.1.1 The atof function (p: 341)

- C99 standard (ISO/IEC 9899:1999):

- 7.20.1.1 The atof function (p: 307)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.10.1.1 The atof function

### See also

|  |  |
| --- | --- |
| strtof, strtod, strtold (C99), (C99) | converts a byte string to a floating-point value (function) |
| C++ documentation for atof |  |
