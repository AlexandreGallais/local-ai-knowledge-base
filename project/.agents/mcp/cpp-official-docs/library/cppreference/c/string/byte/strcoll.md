# strcoll

Defined in header `<string.h>`

`int strcoll( const char* lhs, const char* rhs );`

Compares two null-terminated byte strings according to the current locale as defined by the `LC_COLLATE` category.

### Parameters

lhs, rhs - pointers to the null-terminated byte strings to compare

### Return value

- Negative value if `lhs` is *less than* (precedes) `rhs`.
- `​0​` if `lhs` is *equal to* `rhs`.
- Positive value if `lhs` is *greater than* (follows) `rhs`.

### Notes

Collation order is the dictionary order: the position of the letter in the national alphabet (its *equivalence class*) has higher priority than its case or variant. Within an equivalence class, lowercase characters collate before their uppercase equivalents and locale-specific order may apply to the characters with diacritics. In some locales, groups of characters compare as single *collation units*. For example, `"ch"` in Czech follows `"h"` and precedes `"i"`, and `"dzs"` in Hungarian follows `"dz"` and precedes `"g"`.

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    setlocale(LC_COLLATE, "cs_CZ.utf8");
    // Alternatively, ISO-8859-2 (a.k.a. Latin-2)
    // may also work on some OS:
    // setlocale(LC_COLLATE, "cs_CZ.iso88592");

    const char* s1 = "hrnec";
    const char* s2 = "chrt";

    printf("In the Czech locale: ");
    if (strcoll(s1, s2) < 0)
        printf("%s before %s\n", s1, s2);
    else
        printf("%s before %s\n", s2, s1);

    printf("In lexicographical comparison: ");
    if (strcmp(s1, s2) < 0)
        printf("%s before %s\n", s1, s2);
    else
        printf("%s before %s\n", s2, s1);
}
```

Output:

```text
In the Czech locale: hrnec before chrt
In lexicographical comparison: chrt before hrnec
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.24.4.3 The strcoll function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.24.4.3 The strcoll function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.24.4.3 The strcoll function (p: 366)

- C99 standard (ISO/IEC 9899:1999):

- 7.21.4.3 The strcoll function (p: 329)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.11.4.3 The strcoll function

### See also

|  |  |
| --- | --- |
| wcscoll (C95) | compares two wide strings in accordance to the current locale (function) |
| strxfrm | transform a string so that strcmp would produce the same result as strcoll (function) |
| wcsxfrm (C95) | transform a wide string so that wcscmp would produce the same result as wcscoll (function) |
| strcmp | compares two strings (function) |
| C++ documentation for strcoll |  |
