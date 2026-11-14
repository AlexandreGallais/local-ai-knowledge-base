# atoi, atol, atoll

| Defined in header `<stdlib.h>` |  |  |
| --- | --- | --- |
| `int atoi ( const char* str );` | (1) |  |
| `long atol ( const char* str );` | (2) |  |
| `long long atoll( const char* str );` | (3) | (since C99) |

Interprets an integer value in a byte string pointed to by `str`. The implied radix is always 10.

Discards any whitespace characters until the first non-whitespace character is found, then takes as many characters as possible to form a valid integer number representation and converts them to an integer value. The valid integer value consists of the following parts:

- (optional) plus or minus sign
- numeric digits

If the value of the result cannot be represented, i.e. the converted value falls out of range of the corresponding return type, the behavior is undefined.

### Parameters

str - pointer to the null-terminated byte string to be interpreted

### Return value

Integer value corresponding to the contents of `str` on success.

If no conversion can be performed, `​0​` is returned.

### Notes

The name stands for "ASCII to integer".

### Example

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    printf("%i\n", atoi(" -123junk"));
    printf("%i\n", atoi(" +321dust"));
    printf("%i\n", atoi("0"));
    printf("%i\n", atoi("0042")); // treated as a decimal number with leading zeros
    printf("%i\n", atoi("0x2A")); // only leading zero is converted discarding "x2A"
    printf("%i\n", atoi("junk")); // no conversion can be performed
    printf("%i\n", atoi("2147483648")); // UB: out of range of int
}
```

Possible output:

```text
-123
321
0
42
0
0
-2147483648
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.22.1.2 The atoi, atol, and atoll functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.22.1.2 The atoi, atol, and atoll functions (p: 249)

- C11 standard (ISO/IEC 9899:2011):

- 7.22.1.2 The atoi, atol, and atoll functions (p: 341)

- C99 standard (ISO/IEC 9899:1999):

- 7.20.1.2 The atoi, atol, and atoll functions (p: 307)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.10.1.2 The atoi function

- 4.10.1.3 The atol function

### See also

|  |  |
| --- | --- |
| strtol, strtoll (C99) | converts a byte string to an integer value (function) |
| strtoul, strtoull (C99) | converts a byte string to an unsigned integer value (function) |
| wcstol, wcstoll (C95), (C99) | converts a wide string to an integer value (function) |
| wcstoul, wcstoull (C95), (C99) | converts a wide string to an unsigned integer value (function) |
| C++ documentation for atoi, atol, atoll |  |
