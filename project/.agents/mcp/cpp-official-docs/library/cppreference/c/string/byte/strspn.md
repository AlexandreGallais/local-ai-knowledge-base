# strspn

Defined in header `<string.h>`

`size_t strspn( const char* dest, const char* src );`

Returns the length of the maximum initial segment (span) of the null-terminated byte string pointed to by `dest`, that consists of only the characters found in the null-terminated byte string pointed to by `src`.

The behavior is undefined if either `dest` or `src` is not a pointer to a null-terminated byte string.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the null-terminated byte string to be analyzed |
| src | - | pointer to the null-terminated byte string that contains the characters to search for |

### Return value

The length of the maximum initial segment that contains only characters from the null-terminated byte string pointed to by `src`.

### Example

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    const char* string = "abcde312$#@";
    const char* low_alpha = "qwertyuiopasdfghjklzxcvbnm";

    size_t spnsz = strspn(string, low_alpha);
    printf("After skipping initial lowercase letters from '%s'\n"
           "The remainder is '%s'\n", string, string + spnsz);
}
```

Output:

```text
After skipping initial lowercase letters from 'abcde312$#@'
The remainder is '312$#@'
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.24.5.6 The strspn function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.24.5.6 The strspn function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.24.5.6 The strspn function (p: 369)

- C99 standard (ISO/IEC 9899:1999):

- 7.21.5.6 The strspn function (p: 332)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.11.5.6 The strspn function

### See also

|  |  |
| --- | --- |
| strcspn | returns the length of the maximum initial segment that consists of only the characters not found in another byte string (function) |
| wcsspn (C95) | returns the length of the maximum initial segment that consists of only the wide characters found in another wide string (function) |
| strpbrk | finds the first location of any character in one string, in another string (function) |
| C++ documentation for strspn |  |
