# strerror, strerror_s, strerrorlen_s

| Defined in header `<string.h>` |  |  |
| --- | --- | --- |
| `char* strerror( int errnum );` | (1) |  |
| `errno_t strerror_s( char *buf, rsize_t bufsz, errno_t errnum );` | (2) | (since C11) |
| `size_t strerrorlen_s( errno_t errnum );` | (3) | (since C11) |

1) Returns a pointer to the textual description of the system error code `errnum`, identical to the description that would be printed by `perror()`.

`errnum` is usually acquired from the `errno` variable, however the function accepts any value of type `int`. The contents of the string are locale-specific.

The returned string must not be modified by the program, but may be overwritten by a subsequent call to the `strerror` function. `strerror` is not required to be thread-safe. Implementations may be returning different pointers to static read-only string literals or may be returning the same pointer over and over, pointing at a static buffer in which strerror places the string.

2) Same as (1), except that the message is copied into user-provided storage `buf`. No more than `bufsz-1` bytes are written, the buffer is always null-terminated. If the message had to be truncated to fit the buffer and `bufsz` is greater than 3, then only `bufsz-4` bytes are written, and the characters `"..."` are appended before the null terminator. In addition, the following errors are detected at runtime and call the currently installed constraint handler function:

- `buf` is a null pointer
- `bufsz` is zero or greater than `RSIZE_MAX`

The behavior is undefined if writing to `buf` occurs past the end of the array, which can happen when the size of the buffer pointed to by `buf` is less than the number of characters in the error message which in turn is less than `bufsz`.

3) Computes the length of the untruncated locale-specific error message that `strerror_s` would write if it were called with `errnum`. The length does not include the null terminator.

As with all bounds-checked functions, `strerror_s` and `strerrorlen_s` are only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<string.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| errnum | - | integral value referring to an error code |
| buf | - | pointer to a user-provided buffer |
| bufsz | - | size of the user-provided buffer |

### Return value

1) Pointer to a null-terminated byte string corresponding to the `errno` error code `errnum`.

2) Zero if the entire message was successfully stored in `buf`, non-zero otherwise.

3) Length (not including the null terminator) of the message that `strerror_s` would return

### Notes

POSIX allows subsequent calls to `strerror` to invalidate the pointer value returned by an earlier call. It also specifies that it is the `LC_MESSAGES` locale facet that controls the contents of these messages.

`strerror_s` is the only bounds-checked function that allows truncation, because providing as much information as possible about a failure was deemed to be more desirable. POSIX also defines `strerror_r` for similar purposes.

### Example

```c
#define __STDC_WANT_LIB_EXT1__ 1
#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <locale.h>

int main(void)
{
    FILE *fp = fopen(tmpnam((char[L_tmpnam]){0}), "r");
    if(fp==NULL) {
        printf("File opening error: %s\n", strerror(errno));
        setlocale(LC_MESSAGES, "de_DE.utf8");
        printf("Now in German: %s\n", strerror(errno));
#ifdef __STDC_LIB_EXT1__
        setlocale(LC_ALL, "ja_JP.utf8"); // printf needs CTYPE for multibyte output
        size_t errmsglen = strerrorlen_s(errno) + 1;
        char errmsg[errmsglen];
        strerror_s(errmsg, errmsglen, errno);
        printf("Now in Japanese: %s\n", errmsg);
#endif
    }
}
```

Possible output:

```text
File opening error: No such file or directory
Now in German: Datei oder Verzeichnis nicht gefunden
Now in Japanese: そのようなファイル、又はディレクトリはありません
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.24.6.2 The strerror function (p: 371)

- K.3.7.4.2 The strerror_s function (p: 622)

- K.3.7.4.3 The strerrorlen_s function (p: 623)

- C99 standard (ISO/IEC 9899:1999):

- 7.21.6.2 The strerror function (p: 334)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.11.6.2 The strerror function

### See also

|  |  |
| --- | --- |
| perror | displays a character string corresponding of the current error to `stderr` (function) |
| errno | macro which expands to POSIX-compatible thread-local error number variable (macro variable) |
| C++ documentation for strerror |  |
