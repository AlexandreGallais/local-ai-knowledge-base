# strdup

| Defined in header `<string.h>` |  |
| --- | --- |
| `char * strdup( const char *str1 );` | (dynamic memory TR) |

Returns a pointer to a null-terminated byte string, which is a duplicate of the string pointed to by `str1`. The returned pointer must be passed to `free` to avoid a memory leak.

If an error occurs, a null pointer is returned and `errno` may be set.

As all functions from Dynamic Memory TR, `strdup` is only guaranteed to be available if `__STDC_ALLOC_LIB__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT2__` to the integer constant `1` before including `string.h`.

### Parameters

str1 - pointer to the null-terminated byte string to duplicate

### Return value

A pointer to the newly allocated string, or a null pointer if an error occurred.

### Notes

The function is identical to the POSIX strdup.

### Example

```c
#ifdef __STDC_ALLOC_LIB__
#define __STDC_WANT_LIB_EXT2__ 1
#else
#define _POSIX_C_SOURCE 200809L
#endif

#include <string.h>
#include <assert.h>
#include <stdlib.h>

int main(void)
{
    const char *s1 = "String";
    char *s2 = strdup(s1);
    assert(strcmp(s1, s2) == 0);
    free(s2);
}
```

### See also

|  |  |
| --- | --- |
| strndup (dynamic memory TR) | allocate a copy of a string up to specified size (function) |
| strcpy, strcpy_s (C11) | copies one string to another (function) |
| malloc | allocates memory (function) |
