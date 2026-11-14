# towlower

| Defined in header `<wctype.h>` |  |
| --- | --- |
| `wint_t towlower( wint_t wc );` | (since C95) |

Converts the given wide character to lowercase, if possible.

### Parameters

wc - wide character to be converted

### Return value

Lowercase version of `wc` or unmodified `wc` if no lowercase version is listed in the current C locale.

### Notes

Only 1:1 character mapping can be performed by this function, e.g. the Greek uppercase letter `'Σ'` has two lowercase forms, depending on the position in a word: `'σ'` and `'ς'`. A call to `towlower` cannot be used to obtain the correct lowercase form in this case.

ISO 30112 specifies which pairs of Unicode characters are included in this mapping.

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <wchar.h>
#include <wctype.h>

int main(void)
{
    wchar_t wc = L'\u0190'; // Latin capital open E ('Ɛ')
    printf("in the default locale, towlower(%#x) = %#x\n", wc, towlower(wc));
    setlocale(LC_ALL, "en_US.utf8");
    printf("in Unicode locale, towlower(%#x) = %#x\n", wc, towlower(wc));
}
```

Output:

```text
in the default locale, towlower(0x190) = 0x190
in Unicode locale, towlower(0x190) = 0x25b
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.30.3.1.1 The towlower function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.30.3.1.1 The towlower function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.30.3.1.1 The towlower function (p: 453)

- C99 standard (ISO/IEC 9899:1999):

- 7.25.3.1.1 The towlower function (p: 399)

### See also

|  |  |
| --- | --- |
| towupper (C95) | converts a wide character to uppercase (function) |
| tolower | converts a character to lowercase (function) |
| C++ documentation for towlower |  |
