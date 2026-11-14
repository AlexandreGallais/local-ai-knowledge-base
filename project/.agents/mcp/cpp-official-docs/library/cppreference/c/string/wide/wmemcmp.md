# wmemcmp

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `int wmemcmp( const wchar_t* lhs, const wchar_t* rhs, size_t count );` | (since C95) |

Compares the first `count` wide characters of the wide character (or compatible integer type) arrays pointed to by `lhs` and `rhs`. The comparison is done lexicographically.

The sign of the result is the sign of the difference between the values of the first pair of wide characters that differ in the arrays being compared.

If `count` is zero, the function does nothing.

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs, rhs | - | pointers to the wide character arrays to compare |
| count | - | number of wide characters to examine |

### Return value

Negative value if the value of the first differing wide character in `lhs` is less than the value of the corresponding wide character in `rhs`: `lhs` precedes `rhs` in lexicographical order.

`​0​` if all `count` wide characters of `lhs` and `rhs` are equal.

Positive value if the value of the first differing wide character in `lhs` is greater than the value of the corresponding wide character in `rhs`: `rhs` precedes `lhs` in lexicographical order.

### Notes

This function is not locale-sensitive and pays no attention to the values of the `wchar_t` objects it examines: nulls as well as invalid wide characters are compared too.

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <wchar.h>

void demo(const wchar_t* lhs, const wchar_t* rhs, size_t sz)
{
    for (size_t n = 0; n < sz; ++n)
        putwchar(lhs[n]);

    int rc = wmemcmp(lhs, rhs, sz);
    if (rc == 0)
        wprintf(L" compares equal to ");
    else if(rc < 0)
        wprintf(L" precedes ");
    else if(rc > 0)
        wprintf(L" follows ");

    for (size_t n = 0; n < sz; ++n)
        putwchar(rhs[n]);
    wprintf(L" in lexicographical order\n");
}

int main(void)
{
    setlocale(LC_ALL, "en_US.utf8");

    wchar_t a1[] = {L'α',L'β',L'γ'};
    wchar_t a2[] = {L'α',L'β',L'δ'};

    size_t sz = sizeof a1 / sizeof *a1;
    demo(a1, a2, sz);
    demo(a2, a1, sz);
    demo(a1, a1, sz);
}
```

Output:

```text
αβγ precedes αβδ in lexicographical order
αβδ follows αβγ in lexicographical order
αβγ compares equal to αβγ in lexicographical order
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.29.4.4.5 The wmemcmp function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.29.4.4.5 The wmemcmp function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.4.5 The wmemcmp function (p: 435)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.4.5 The wmemcmp function (p: 381)

### See also

|  |  |
| --- | --- |
| wcscmp (C95) | compares two wide strings (function) |
| memcmp | compares two buffers (function) |
| wcsncmp (C95) | compares a certain amount of characters from two wide strings (function) |
| C++ documentation for wmemcmp |  |
