# memset, memset_explicit, memset_s

| Defined in header `<string.h>` |  |  |
| --- | --- | --- |
| `void *memset( void *dest, int ch, size_t count );` | (1) |  |
| `void *memset_explicit( void *dest, int ch, size_t count );` | (2) | (since C23) |
| `errno_t memset_s( void *dest, rsize_t destsz, int ch, rsize_t count );` | (3) | (since C11) |

1) Copies the value `(unsigned char)ch` into each of the first `count` characters of the object pointed to by `dest`.

The behavior is undefined if access occurs beyond the end of the dest array. The behavior is undefined if `dest` is a null pointer.

2) Same as (1), except that is safe for sensitive information.

3) Same as (1), except that the following errors are detected at runtime and call the currently installed constraint handler function after storing `ch` in every location of the destination range `[dest, dest+destsz)` if `dest` and `destsz` are themselves valid:

- `dest` is a null pointer
- `destsz` or `count` is greater than `RSIZE_MAX`
- `count` is greater than `destsz` (buffer overflow would occur)

The behavior is undefined if the size of the character array pointed to by `dest` < `count` <= `destsz`; in other words, an erroneous value of `destsz` does not expose the impending buffer overflow.

As with all bounds-checked functions, `memset_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<string.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the object to fill |
| ch | - | fill byte |
| count | - | number of bytes to fill |
| destsz | - | size of the destination array |

### Return value

1,2) A copy of `dest`

3) zero on success, non-zero on error. Also on error, if `dest` is not a null pointer and `destsz` is valid, writes `destsz` fill bytes `ch` to the destination array.

### Notes

`memset` may be optimized away (under the as-if rules) if the object modified by this function is not accessed again for the rest of its lifetime (e.g., gcc bug 8537). For that reason, this function cannot be used to scrub memory (e.g., to fill an array that stored a password with zeroes).

This optimization is prohibited for `memset_explicit` and `memset_s`: they are guaranteed to perform the memory write.

Third-party solutions for that include FreeBSD `explicit_bzero` or Microsoft `SecureZeroMemory`.

### Example

```c
#define __STDC_WANT_LIB_EXT1__ 1
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void)
{
    char str[] = "ghghghghghghghghghghgh";
    puts(str);
    memset(str,'a',5);
    puts(str);

#ifdef __STDC_LIB_EXT1__
    set_constraint_handler_s(ignore_handler_s);
    int r = memset_s(str, sizeof str, 'b', 5);
    printf("str = \"%s\", r = %d\n", str, r);
    r = memset_s(str, 5, 'c', 10);   // count is greater than destsz
    printf("str = \"%s\", r = %d\n", str, r);
#endif
}
```

Possible output:

```text
ghghghghghghghghghghgh
aaaaahghghghghghghghgh
str = "bbbbbhghghghghghghghgh", r = 0
str = "ccccchghghghghghghghgh", r = 22
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.24.6.1 The memset function (p: 270)

- K.3.7.4.1 The memset_s function (p: 451)

- C11 standard (ISO/IEC 9899:2011):

- 7.24.6.1 The memset function (p: 371)

- K.3.7.4.1 The memset_s function (p: 621-622)

- C99 standard (ISO/IEC 9899:1999):

- 7.21.6.1 The memset function (p: 333)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.11.6.1 The memset function

### See also

|  |  |
| --- | --- |
| memcpy, memcpy_s (C11) | copies one buffer to another (function) |
| wmemset (C95) | copies the given wide character to every position in a wide character array (function) |
| C++ documentation for memset |  |
