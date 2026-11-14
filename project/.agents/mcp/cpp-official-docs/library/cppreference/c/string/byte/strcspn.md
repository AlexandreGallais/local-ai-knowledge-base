# strcspn

Defined in header `<string.h>`

`size_t strcspn( const char *dest, const char *src );`

Returns the length of the maximum initial segment of the null-terminated byte string pointed to by `dest`, that consists of only the characters *not* found in the null-terminated byte string pointed to by `src`.

The behavior is undefined if either `dest` or `src` is not a pointer to a null-terminated byte string.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the null-terminated byte string to be analyzed |
| src | - | pointer to the null-terminated byte string that contains the characters to search for |

### Return value

The length of the maximum initial segment that contains only characters not found in the null-terminated byte string pointed to by `src`

### Notes

The function name stands for "complementary span" because the function searches for characters not found in `src`, that is the complement of `src`.

### Example

```c
#include <string.h>
#include <stdio.h>

int main(void)
{
    const char *string = "abcde312$#@";
    const char *invalid = "*$#";

    size_t valid_len = strcspn(string, invalid);
    if(valid_len != strlen(string))
       printf("'%s' contains invalid chars starting at position %zu\n",
               string, valid_len);
}
```

Output:

```text
'abcde312$#@' contains invalid chars starting at position 8
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.24.5.3 The strcspn function (p: 368)

- C99 standard (ISO/IEC 9899:1999):

- 7.21.5.3 The strcspn function (p: 331)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.11.5.3 The strcspn function

### See also

|  |  |
| --- | --- |
| strspn | returns the length of the maximum initial segment that consists of only the characters found in another byte string (function) |
| wcscspn (C95) | returns the length of the maximum initial segment that consists of only the wide chars *not* found in another wide string (function) |
| strpbrk | finds the first location of any character in one string, in another string (function) |
| C++ documentation for strcspn |  |
