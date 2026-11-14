# wcsrchr

| Defined in header `<wchar.h>` |  |  |
| --- | --- | --- |
| `wchar_t *wcsrchr( const wchar_t *str, wchar_t ch );` | (1) | (since C95) |
| `/*QWchar_t*/ *wcsrchr( /*QWchar_t*/ *str, wchar_t ch );` | (2) | (since C23) |

1) Finds the last occurrence of the wide character `ch` in the wide string pointed to by `str`.

2) Type-generic function equivalent to (1). Let `T` be an unqualified wide character object type.

- If `str` is of type `const T*`, the return type is `const wchar_t*`.
- Otherwise, if `str` is of type `T*`, the return type is `wchar_t*`.
- Otherwise, the behavior is undefined.

If a macro definition of each of these generic functions is suppressed to access an actual function (e.g. if `(wcsrchr)` or a function pointer is used), the actual function declaration (1) becomes visible.

### Parameters

|  |  |  |
| --- | --- | --- |
| str | - | pointer to the null-terminated wide string to be analyzed |
| ch | - | wide character to search for |

### Return value

Pointer to the found character in `str`, or a null pointer if no such character is found.

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <wchar.h>

int main(void)
{
    wchar_t arr[] = L"白猫 黒猫 кошки";
    wchar_t *cat = wcsrchr(arr, L'猫');
    wchar_t *dog = wcsrchr(arr, L'犬');

    setlocale(LC_ALL, "en_US.utf8");

    cat ? printf("The character 猫 found at position %td\n", cat - arr)
        : puts("The character 猫 not found");

    dog ? printf("The character 犬 found at position %td\n", dog - arr)
        : puts("The character 犬 not found");
}
```

Output:

```text
The character 猫 found at position 4
The character 犬 not found
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.31.4.6.4 The wcsrchr function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.29.4.5.4 The wcsrchr function (p: 318)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.5.4 The wcsrchr function (p: 436)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.5.4 The wcsrchr function (p: 382)

### See also

|  |  |
| --- | --- |
| wcschr (C95) | finds the first occurrence of a wide character in a wide string (function) |
| wcspbrk (C95) | finds the first location of any wide character in one wide string, in another wide string (function) |
| C++ documentation for wcsrchr |  |
