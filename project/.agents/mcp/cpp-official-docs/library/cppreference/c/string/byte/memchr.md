# memchr

| Defined in header `<string.h>` |  |  |
| --- | --- | --- |
| `void* memchr( const void* ptr, int ch, size_t count );` | (1) |  |
| `/*QVoid*/ *memchr( /*QVoid*/ *ptr, int ch, size_t count );` | (2) | (since C23) |

1) Finds the first occurrence of `(unsigned char)ch` in the initial `count` bytes (each interpreted as `unsigned char`) of the object pointed to by `ptr`.

2) Type-generic function equivalent to (1). Let `T` be an unqualified object type (including `void`).

- If `ptr` is of type `const T*`, the return type is `const void*`.
- Otherwise, if `ptr` is of type `T*`, the return type is `void*`.
- Otherwise, the behavior is undefined.

If a macro definition of each of these generic functions is suppressed to access an actual function (e.g. if `(memchr)` or a function pointer is used), the actual function declaration (1) becomes visible.

The behavior is undefined if access occurs beyond the end of the array searched. The behavior is undefined if `ptr` is a null pointer.

This function behaves as if it reads the bytes sequentially and stops as soon as a matching bytes is found: if the array pointed to by `ptr` is smaller than `count`, but the match is found within the array, the behavior is well-defined. (since C11)

### Parameters

|  |  |  |
| --- | --- | --- |
| ptr | - | pointer to the object to be examined |
| ch | - | bytes to search for |
| count | - | max number of bytes to examine |

### Return value

Pointer to the location of the byte, or a null pointer if no such byte is found.

### Example

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    const char str[] = "ABCDEFG";
    const int chars[] = {'D', 'd'};
    for (size_t i = 0; i < sizeof chars / (sizeof chars[0]); ++i)
    {
        const int c = chars[i];
        const char *ps = memchr(str, c, strlen(str));
        ps ? printf ("character '%c'(%i) found: %s\n", c, c, ps)
           : printf ("character '%c'(%i) not found\n", c, c);
    }
    return 0;
}
```

Possible output:

```text
character 'D'(68) found: DEFG
character 'd'(100) not found
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.24.5.1 The memchr function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.24.5.1 The memchr function (p: 267-268)

- C11 standard (ISO/IEC 9899:2011):

- 7.24.5.1 The memchr function (p: 367)

- C99 standard (ISO/IEC 9899:1999):

- 7.21.5.1 The memchr function (p: 330)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.11.5.1 The memchr function

### See also

|  |  |
| --- | --- |
| strchr | finds the first occurrence of a character (function) |
| C++ documentation for memchr |  |
