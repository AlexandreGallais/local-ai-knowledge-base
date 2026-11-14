# perror

Defined in header `<stdio.h>`

`void perror( const char *s );`

Prints a textual description of the error code currently stored in the system variable `errno` to `stderr`.

The description is formed by concatenating the following components:

- the contents of the null-terminated byte string pointed to by `s`, followed by `": "` (unless `s` is a null pointer or the character pointed to by `s` is the null character)
- implementation-defined error message string describing the error code stored in `errno`, followed by `'\n'`. The error message string is identical to the result of `strerror(errno)`.

### Parameters

s - pointer to a null-terminated string with explanatory message

### Return value

(none)

### Example

```c
#include <stdio.h>

int main(void)
{
    FILE *f = fopen("non_existent", "r");
    if (f == NULL) {
        perror("fopen() failed");
    } else {
        fclose(f);
    }
}
```

Possible output:

```text
fopen() failed: No such file or directory
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.21.10.4 The perror function (p: 339)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.10.4 The perror function (p: 305)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.10.4 The perror function

### See also

|  |  |
| --- | --- |
| strerror, strerror_s, strerrorlen_s (C11), (C11) | returns a text version of a given error code (function) |
| C++ documentation for perror |  |
