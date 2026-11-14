# wcscmp

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `int wcscmp( const wchar_t* lhs, const wchar_t* rhs );` | (since C95) |

Compares two null-terminated wide strings lexicographically.

The sign of the result is the sign of the difference between the values of the first pair of wide characters that differ in the strings being compared.

The behavior is undefined if `lhs` or `rhs` are not pointers to null-terminated wide strings.

### Parameters

lhs, rhs - pointers to the null-terminated wide strings to compare

### Return value

Negative value if `lhs` appears before `rhs` in lexicographical order.

Zero if `lhs` and `rhs` compare equal.

Positive value if `lhs` appears after `rhs` in lexicographical order.

### Notes

This function is not locale-sensitive, unlike `wcscoll`, and the order may not be meaningful when characters from different Unicode blocks are used together or when the order of code units does not match any collation order.

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <wchar.h>

void demo(const wchar_t* lhs, const wchar_t* rhs)
{
    int rc = wcscmp(lhs, rhs);
    const char *rel = rc < 0 ? "precedes" : rc > 0 ? "follows" : "equals";

    setlocale(LC_ALL, "en_US.utf8");
    printf("[%ls] %s [%ls]\n", lhs, rel, rhs);
}

int main(void)
{
    const wchar_t* string = L"どうもありがとうございます";
    demo(string, L"どうも");
    demo(string, L"助かった");
    demo(string + 9, L"ありがとうございます" + 6);
}
```

Possible output:

```text
[どうもありがとうございます] follows [どうも]
[どうもありがとうございます] precedes [助かった]
[ざいます] equals [ざいます]
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.29.4.4.1 The wcscmp function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.29.4.4.1 The wcscmp function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.4.1 The wcscmp function (p: 433)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.4.1 The wcscmp function (p: 379)

### See also

|  |  |
| --- | --- |
| wcsncmp (C95) | compares a certain amount of characters from two wide strings (function) |
| wmemcmp (C95) | compares a certain amount of wide characters from two arrays (function) |
| strcmp | compares two strings (function) |
| wcscoll (C95) | compares two wide strings in accordance to the current locale (function) |
| C++ documentation for wcscmp |  |
