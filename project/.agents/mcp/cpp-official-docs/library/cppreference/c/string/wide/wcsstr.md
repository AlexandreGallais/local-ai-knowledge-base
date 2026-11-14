# wcsstr

| Defined in header `<wchar.h>` |  |  |
| --- | --- | --- |
| `wchar_t *wcsstr( const wchar_t *dest, const wchar_t *src );` | (1) | (since C95) |
| `/*QWchar_t*/ *wcsstr( /*QWchar_t*/ *dest, const wchar_t *src );` | (2) | (since C23) |

1) Finds the first occurrence of the wide string `src` in the wide string pointed to by `dest`. The terminating null characters are not compared.

2) Type-generic function equivalent to (1). Let `T` be an unqualified wide character object type.

- If `dest` is of type `const T*`, the return type is `const wchar_t*`.
- Otherwise, if `dest` is of type `T*`, the return type is `wchar_t*`.
- Otherwise, the behavior is undefined.

If a macro definition of each of these generic functions is suppressed to access an actual function (e.g. if `(wcsstr)` or a function pointer is used), the actual function declaration (1) becomes visible.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the null-terminated wide string to examine |
| src | - | pointer to the null-terminated wide string to search for |

### Return value

Pointer to the first character of the found substring in `dest`, or a null pointer if no such substring is found. If `src` points to an empty string, `dest` is returned.

### Example

```c
#include <stdio.h>
#include <locale.h>
#include <wchar.h>

int main(void)
{
    setlocale(LC_ALL, "ru_RU.UTF-8");

    wchar_t str[5][64] = {
        L"Строка, где есть подстрока 'но'.",
        L"Строка, где такой подстроки нет.",
        L"Он здесь.",
        L"Здесь он.",
        L"Его нет."
    };

    for (size_t i = 0; i < 5; ++i) {
        if (wcsstr(str[i], L"но")) {
            wprintf(L"%ls\n", str[i]);
        }
    }
}
```

Output:

```text
Строка, где есть подстрока 'но'.
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.5.6 The wcsstr function (p: 437)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.5.6 The wcsstr function (p: 383)

### See also

|  |  |
| --- | --- |
| wcschr (C95) | finds the first occurrence of a wide character in a wide string (function) |
| wcsrchr (C95) | finds the last occurrence of a wide character in a wide string (function) |
| C++ documentation for wcsstr |  |
