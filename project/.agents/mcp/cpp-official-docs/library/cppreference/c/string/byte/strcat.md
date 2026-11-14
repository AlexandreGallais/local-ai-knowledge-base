# strcat, strcat_s

| Defined in header `<string.h>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `char *strcat( char *dest, const char *src );` |  | (until C99) |
| `char *strcat( char *restrict dest, const char *restrict src );` |  | (since C99) |
| `errno_t strcat_s(char *restrict dest, rsize_t destsz, const char *restrict src);` | (2) | (since C11) |

1) Appends a copy of the null-terminated byte string pointed to by `src` to the end of the null-terminated byte string pointed to by `dest`. The character `src[0]` replaces the null terminator at the end of `dest`. The resulting byte string is null-terminated.

The behavior is undefined if the destination array is not large enough for the contents of both `src` and `dest` and the terminating null character. The behavior is undefined if the strings overlap. The behavior is undefined if either `dest` or `src` is not a pointer to a null-terminated byte string.

2) Same as (1), except that it may clobber the rest of the destination array (from the last character written to `destsz`) with unspecified values and that the following errors are detected at runtime and call the currently installed constraint handler function:

- `src` or `dest` is a null pointer
- `destsz` is zero or greater than `RSIZE_MAX`
- there is no null terminator in the first `destsz` bytes of `dest`
- truncation would occur (the available space at the end of `dest` would not fit every character, including the null terminator, of `src`)
- overlap would occur between the source and the destination strings

The behavior is undefined if the size of the character array pointed to by `dest` < `strlen(dest)+strlen(src)+1` <= `destsz`; in other words, an erroneous value of `destsz` does not expose the impending buffer overflow.

As with all bounds-checked functions, `strcat_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<string.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the null-terminated byte string to append to |
| src | - | pointer to the null-terminated byte string to copy from |
| destsz | - | maximum number of characters to write, typically the size of the destination buffer |

### Return value

1) returns a copy of `dest`

2) returns zero on success, returns non-zero on error. Also, on error, writes zero to `dest[0]` (unless `dest` is a null pointer or `destsz` is zero or greater than `RSIZE_MAX`).

### Notes

Because `strcat` needs to seek to the end of `dest` on each call, it is inefficient to concatenate many strings into one using `strcat`.

`strcat_s` is allowed to clobber the destination array from the last character written up to `destsz` in order to improve efficiency: it may copy in multibyte blocks and then check for null bytes.

The function `strcat_s` is similar to the BSD function `strlcat`, except that

- `strlcat` truncates the source string to fit in the destination
- `strlcat` does not perform all the runtime checks that `strcat_s` does
- `strlcat` does not make failures obvious by setting the destination to a null string or calling a handler if the call fails.

Although `strcat_s` prohibits truncation due to potential security risks, it's possible to truncate a string using bounds-checked `strncat_s` instead.

### Example

```c
#define __STDC_WANT_LIB_EXT1__ 1
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    char str[50] = "Hello ";
    char str2[50] = "World!";
    strcat(str, str2);
    strcat(str, " ...");
    strcat(str, " Goodbye World!");
    puts(str);

#ifdef __STDC_LIB_EXT1__
    set_constraint_handler_s(ignore_handler_s);
    int r = strcat_s(str, sizeof str, " ... ");
    printf("str = \"%s\", r = %d\n", str, r);
    r = strcat_s(str, sizeof str, " and this is too much");
    printf("str = \"%s\", r = %d\n", str, r);
#endif
}
```

Possible output:

```text
Hello World! ... Goodbye World!
str = "Hello World! ... Goodbye World! ... ", r = 0
str = "", r = 22
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.24.3.1 The strcat function (p: 364)

- K.3.7.2.1 The strcat_s function (p: 617-618)

- C99 standard (ISO/IEC 9899:1999):

- 7.21.3.1 The strcat function (p: 327)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.11.3.1 The strcat function

### See also

|  |  |
| --- | --- |
| strncat, strncat_s (C11) | concatenates a certain amount of characters of two strings (function) |
| strcpy, strcpy_s (C11) | copies one string to another (function) |
| memccpy (C23) | copies one buffer to another, stopping after the specified delimiter (function) |
| C++ documentation for strcat |  |
