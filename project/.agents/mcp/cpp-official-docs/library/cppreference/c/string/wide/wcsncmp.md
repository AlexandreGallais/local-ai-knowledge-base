# wcsncmp

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `int wcsncmp( const wchar_t* lhs, const wchar_t* rhs, size_t count );` | (since C95) |

Compares at most `count` wide characters of two null-terminated wide strings. The comparison is done lexicographically.

The sign of the result is the sign of the difference between the values of the first pair of wide characters that differ in the strings being compared.

The behavior is undefined if `lhs` or `rhs` are not pointers to null-terminated strings.

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs, rhs | - | pointers to the null-terminated wide strings to compare |
| count | - | maximum number of characters to compare |

### Return value

Negative value if `lhs` appears before `rhs` in lexicographical order.

Zero if `lhs` and `rhs` compare equal.

Positive value if `lhs` appears after `rhs` in lexicographical order.

### Notes

This function is not locale-sensitive, unlike `wcscoll` and `wcsxfrm`.

### Example

```c
#include <stdio.h>
#include <wchar.h>
#include <locale.h>

void demo(const wchar_t *lhs, const wchar_t *rhs, int sz)
{
    int rc = wcsncmp(lhs, rhs, sz);
    if(rc == 0)
        printf("First %d characters of [%ls] equal [%ls]\n", sz, lhs, rhs);
    else if(rc < 0)
        printf("First %d characters of [%ls] precede [%ls]\n", sz, lhs, rhs);
    else if(rc > 0)
        printf("First %d characters of [%ls] follow [%ls]\n", sz, lhs, rhs);
}

int main(void)
{
    const wchar_t *str1 = L"안녕하세요";
    const wchar_t *str2 = L"안녕히 가십시오";

    setlocale(LC_ALL, "en_US.utf8");
    demo(str1, str2, 5);
    demo(str2, str1, 8);
    demo(str1, str2, 2);
}
```

Output:

```text
First 5 characters of [안녕하세요] precede [안녕히 가십시오]
First 8 characters of [안녕히 가십시오] follow [안녕하세요]
First 2 characters of [안녕하세요] equal [안녕히 가십시오]
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.4.3 The wcsncmp function (p: 434)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.4.3 The wcsncmp function (p: 380)

### See also

|  |  |
| --- | --- |
| wcscmp (C95) | compares two wide strings (function) |
| wmemcmp (C95) | compares a certain amount of wide characters from two arrays (function) |
| wcscoll (C95) | compares two wide strings in accordance to the current locale (function) |
| C++ documentation for wcsncmp |  |
