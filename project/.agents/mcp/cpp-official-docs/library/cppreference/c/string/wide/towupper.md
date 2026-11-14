# towupper

| Defined in header `<wctype.h>` |  |
| --- | --- |
| `wint_t towupper( wint_t wc );` | (since C95) |

Converts the given wide character to uppercase, if possible.

### Parameters

wc - wide character to be converted

### Return value

Uppercase version of `wc` or unmodified `wc` if no uppercase version is listed in the current C locale.

### Notes

Only 1:1 character mapping can be performed by this function, e.g. the uppercase form of 'ß' is (with some exceptions) the two-character string "SS", which cannot be obtained by `towupper`.

ISO 30112 specifies which pairs of Unicode characters are included in this mapping.

### Example

```c
#include <stdio.h>
#include <wchar.h>
#include <wctype.h>
#include <locale.h>

int main(void)
{
    wchar_t wc =  L'\u017f'; // Latin small letter Long S ('ſ')
    printf("in the default locale, towupper(%#x) = %#x\n", wc, towupper(wc));
    setlocale(LC_ALL, "en_US.utf8");
    printf("in Unicode locale, towupper(%#x) = %#x\n", wc, towupper(wc));
}
```

Output:

```text
in the default locale, towupper(0x17f) = 0x17f
in Unicode locale, towupper(0x17f) = 0x53
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.30.3.1.2 The towupper function (p: 453)

- C99 standard (ISO/IEC 9899:1999):

- 7.25.3.1.2 The towupper function (p: 399)

### See also

|  |  |
| --- | --- |
| towlower (C95) | converts a wide character to lowercase (function) |
| toupper | converts a character to uppercase (function) |
| C++ documentation for towupper |  |
