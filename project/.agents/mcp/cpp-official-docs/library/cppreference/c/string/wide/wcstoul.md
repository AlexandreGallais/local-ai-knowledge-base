# wcstoul, wcstoull

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `unsigned long wcstoul( const wchar_t* str, wchar_t** str_end, int base );` | (since C95) (until C99) |
| `unsigned long wcstoul( const wchar_t * restrict str, wchar_t ** restrict str_end, int base );` | (since C99) |
| `unsigned long long wcstoull( const wchar_t * restrict str, wchar_t ** restrict str_end, int base );` | (since C99) |

Interprets an unsigned integer value in a wide string pointed to by `str`.

Discards any whitespace characters (as identified by calling `iswspace`) until the first non-whitespace character is found, then takes as many characters as possible to form a valid *base-n* (where n=`base`) unsigned integer number representation and converts them to an integer value. The valid unsigned integer value consists of the following parts:

- (optional) plus or minus sign
- (optional) prefix (`0`) indicating octal base (applies only when the base is `8` or `​0​`)
- (optional) prefix (`0x` or `0X`) indicating hexadecimal base (applies only when the base is `16` or `​0​`)
- a sequence of digits

The set of valid values for base is `{0, 2, 3, ..., 36}`. The set of valid digits for base-`2` integers is `{0, 1}`, for base-`3` integers is `{0, 1, 2}`, and so on. For bases larger than `10`, valid digits include alphabetic characters, starting from `Aa` for base-`11` integer, to `Zz` for base-`36` integer. The case of the characters is ignored.

Additional numeric formats may be accepted by the currently installed C locale.

If the value of `base` is `​0​`, the numeric base is auto-detected: if the prefix is `0`, the base is octal, if the prefix is `0x` or `0X`, the base is hexadecimal, otherwise the base is decimal.

If the minus sign was part of the input sequence, the numeric value calculated from the sequence of digits is negated as if by unary minus in the result type, which applies unsigned integer wraparound rules.

The functions sets the pointer pointed to by `str_end` to point to the wide character past the last character interpreted. If `str_end` is a null pointer, it is ignored.

### Parameters

|  |  |  |
| --- | --- | --- |
| str | - | pointer to the null-terminated wide string to be interpreted |
| str_end | - | pointer to a pointer to a wide character. |
| base | - | *base* of the interpreted integer value |

### Return value

Integer value corresponding to the contents of `str` on success. If the converted value falls out of range of corresponding return type, range error occurs and `ULONG_MAX` or `ULLONG_MAX` is returned. If no conversion can be performed, `​0​` is returned.

### Example

```c
#include <stdio.h>
#include <errno.h>
#include <wchar.h>

int main(void)
{
    const wchar_t *p = L"10 200000000000000000000000000000 30 40";
    printf("Parsing L'%ls':\n", p);
    wchar_t *end;
    for (unsigned long i = wcstoul(p, &end, 10);
         p != end;
         i = wcstoul(p, &end, 10))
    {
        printf("'%.*ls' -> ", (int)(end-p), p);
        p = end;
        if (errno == ERANGE){
            printf("range error, got ");
            errno = 0;
        }
        printf("%lu\n", i);
    }
}
```

Output:

```text
Parsing '10 200000000000000000000000000000 30 40':
'10' -> 10
' 200000000000000000000000000000' -> range error, got 18446744073709551615
' 30' -> 30
' 40' -> 40
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.1.2 The wcstol, wcstoll, wcstoul, and wcstoull functions (p: 429-430)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.1.2 The wcstol, wcstoll, wcstoul, and wcstoull functions (p: 375-376)

### See also

|  |  |
| --- | --- |
| strtoul, strtoull (C99) | converts a byte string to an unsigned integer value (function) |
| wcstol, wcstoll (C95), (C99) | converts a wide string to an integer value (function) |
| C++ documentation for wcstoul, wcstoull |  |
