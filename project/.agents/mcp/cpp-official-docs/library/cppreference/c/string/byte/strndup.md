# strndup

| Defined in header `<string.h>` |  |
| --- | --- |
| `char *strndup( const char *src, size_t size );` | (since C23) |

Returns a pointer to a null-terminated byte string, which contains copies of at most `size` bytes from the string pointed to by `src`. The space for the new string is obtained as if `malloc` was called. If the null terminator is not encountered in the first `size` bytes, it is appended to the duplicated string.

The returned pointer must be passed to `free` to avoid a memory leak.

If an error occurs, a null pointer is returned and `errno` might be set.

### Parameters

|  |  |  |
| --- | --- | --- |
| src | - | pointer to the null-terminated byte string to duplicate |
| size | - | max number of bytes to copy from `src` |

### Return value

A pointer to the newly allocated string, or a null pointer if an error occurred.

### Notes

The function is identical to the POSIX strndup except that it is allowed, but not required to set `errno` on error.

### Example

```c
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    const size_t n = 3;

    const char *src = "Replica";
    char *dup = strndup(src, n);
    printf("strndup(\"%s\", %lu) == \"%s\"\n", src, n, dup);
    free(dup);

    src = "Hi";
    dup = strndup(src, n);
    printf("strndup(\"%s\", %lu) == \"%s\"\n", src, n, dup);
    free(dup);

    const char arr[] = {'A','B','C','D'}; // NB: no trailing '\0'
    dup = strndup(arr, n);
    printf("strndup({'A','B','C','D'}, %lu) == \"%s\"\n", n, dup);
    free(dup);
}
```

Output:

```text
strndup("Replica", 3) == "Rep"
strndup("Hi", 3) == "Hi"
strndup({'A','B','C','D'}, 3) == "ABC"
```

### See also

|  |  |
| --- | --- |
| strdup (C23) | allocates a copy of a string (function) |
| strcpy, strcpy_s (C11) | copies one string to another (function) |
| malloc | allocates memory (function) |
| free | deallocates previously allocated memory (function) |
