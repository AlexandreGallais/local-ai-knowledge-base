# wmemchr

| Defined in header `<wchar.h>` |  |  |
| --- | --- | --- |
| `wchar_t *wmemchr( const wchar_t *ptr, wchar_t ch, size_t count );` | (1) | (since C95) |
| `/*QWchar_t*/ *wmemchr( /*Qwchar_t*/ *ptr, wchar_t ch, size_t count );` | (2) | (since C23) |

1) Locates the first occurrence of wide character `ch` in the initial `count` wide characters of the wide character array or integer array of compatible type, pointed to by `ptr`.

2) Type-generic function equivalent to (1). Let `T` be an unqualified wide character object type.

- If `ptr` is of type `const T*`, the return type is `const wchar_t*`.
- Otherwise, if `ptr` is of type `T*`, the return type is `wchar_t*`.
- Otherwise, the behavior is undefined.

If a macro definition of each of these generic functions is suppressed to access an actual function (e.g. if `(wmemchr)` or a function pointer is used), the actual function declaration (1) becomes visible.

If `count` is zero, the function returns a null pointer.

### Parameters

|  |  |  |
| --- | --- | --- |
| ptr | - | pointer to the wide character array to be examined |
| ch | - | wide character to search for |
| count | - | number of wide characters to examine |

### Return value

Pointer to the location of the wide character, or a null pointer if no such character is found.

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <wchar.h>

int main(void)
{
    wchar_t str[] = L"诺不轻信，故人不负我\0诺不轻许，故我不负人。";
    size_t sz = sizeof str / sizeof *str;

    wchar_t target = L'许';
    wchar_t* result = wmemchr(str, target, sz);

    if (result)
    {
        setlocale(LC_ALL, "en_US.utf8");
        printf("Found '%lc' at position %td\n",target, result - str);
    }
}
```

Possible output:

```text
Found '许' at position 14
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.29.4.5.8 The wmemchr function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.29.4.5.8 The wmemchr function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.5.8 The wmemchr function (p: 438)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.5.8 The wmemchr function (p: 384)

### See also

|  |  |
| --- | --- |
| memchr | searches an array for the first occurrence of a character (function) |
| wcschr (C95) | finds the first occurrence of a wide character in a wide string (function) |
| C++ documentation for wmemchr |  |
