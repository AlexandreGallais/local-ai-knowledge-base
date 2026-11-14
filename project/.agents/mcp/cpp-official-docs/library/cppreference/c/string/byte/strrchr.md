# strrchr

| Defined in header `<string.h>` |  |  |
| --- | --- | --- |
| `char* strrchr( const char* str, int ch );` | (1) |  |
| `/*QChar*/* strrchr( /*QChar*/* str, int ch );` | (2) | (since C23) |

1) Finds the last occurrence of `ch` (after conversion to `char` as if by `(char)ch`) in the null-terminated byte string pointed to by `str` (each character interpreted as `unsigned char`). The terminating null character is considered to be a part of the string and can be found if searching for `'\0'`.

2) Type-generic function equivalent to (1). Let `T` be an unqualified character object type.

- If `str` is of type `const T*`, the return type is `const char*`.
- Otherwise, if `str` is of type `T*`, the return type is `char*`.
- Otherwise, the behavior is undefined.

If a macro definition of each of these generic functions is suppressed to access an actual function (e.g. if `(strrchr)` or a function pointer is used), the actual function declaration (1) becomes visible.

The behavior is undefined if `str` is not a pointer to a null-terminated byte string.

### Parameters

|  |  |  |
| --- | --- | --- |
| str | - | pointer to the null-terminated byte string to be analyzed |
| ch | - | character to search for |

### Return value

Pointer to the found character in `str`, or null pointer if no such character is found.

### Example

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char szSomeFileName[] = "foo/bar/foobar.txt";
    char* pLastSlash = strrchr(szSomeFileName, '/');
    char* pszBaseName = pLastSlash ? pLastSlash + 1 : szSomeFileName;
    printf("Base Name: %s", pszBaseName);
}
```

Output:

```text
Base Name: foobar.txt
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.24.5.5 The strrchr function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.24.5.5 The strrchr function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.24.5.5 The strrchr function (p: 368-369)

- C99 standard (ISO/IEC 9899:1999):

- 7.21.5.5 The strrchr function (p: 331)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.11.5.5 The strrchr function

### See also

|  |  |
| --- | --- |
| strchr | finds the first occurrence of a character (function) |
| strpbrk | finds the first location of any character in one string, in another string (function) |
| C++ documentation for strrchr |  |
