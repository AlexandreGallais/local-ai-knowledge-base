# freopen, freopen_s

| Defined in header `<stdio.h>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `FILE *freopen( const char *filename, const char *mode, FILE *stream );` |  | (until C99) |
| `FILE *freopen( const char *restrict filename, const char *restrict mode, FILE *restrict stream );` |  | (since C99) |
| `errno_t freopen_s( FILE *restrict *restrict newstreamptr, const char *restrict filename, const char *restrict mode, FILE *restrict stream );` | (2) | (since C11) |

1) First, attempts to close the file associated with `stream`, ignoring any errors. Then, if `filename` is not null, attempts to open the file specified by `filename` using `mode` as if by `fopen`, and associates that file with the file stream pointed to by `stream`. If `filename` is a null pointer, then the function attempts to reopen the file that is already associated with `stream` (it is implementation defined which mode changes are allowed in this case).

2) Same as (1), except that `mode` is treated as in `fopen_s` and that the pointer to the file stream is written to `newstreamptr` and the following errors are detected at runtime and call the currently installed constraint handler function:

- `newstreamptr` is a null pointer
- `stream` is a null pointer
- `mode` is a null pointer

As with all bounds-checked functions, `freopen_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<stdio.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| filename | - | file name to associate the file stream to |
| mode | - | null-terminated character string determining new file access mode |
| stream | - | the file stream to modify |
| newstreamptr | - | pointer to a pointer where the function stores the result (an out-parameter) |

### File access flags

| File access mode string | Meaning | Explanation | Action if file already exists | Action if file does not exist |
| --- | --- | --- | --- | --- |
| `"r"` | read | Open a file for reading | read from start | failure to open |
| `"w"` | write | Create a file for writing | destroy contents | create new |
| `"a"` | append | Append to a file | write to end | create new |
| `"r+"` | read extended | Open a file for read/write | read from start | error |
| `"w+"` | write extended | Create a file for read/write | destroy contents | create new |
| `"a+"` | append extended | Open a file for read/write | write to end | create new |
| File access mode flag `"b"` can optionally be specified to open a file in binary mode. This flag has no effect on POSIX systems, but on Windows it disables special handling of `'\n'` and `'\x1A'`. On the append file access modes, data is written to the end of the file regardless of the current position of the file position indicator. |  |  |  |  |
| The behavior is undefined if the mode is not one of the strings listed above. Some implementations define additional supported modes (e.g. Windows). |  |  |  |  |
| In update mode (`'+'`), both input and output may be performed, but output cannot be followed by input without an intervening call to `fflush`, `fseek`, `fsetpos` or `rewind`, and input cannot be followed by output without an intervening call to `fseek`, `fsetpos` or `rewind`, unless the input operation encountered end of file. In update mode, implementations are permitted to use binary mode even when text mode is specified. |  |  |  |  |
| File access mode flag `"x"` can optionally be appended to `"w"` or `"w+"` specifiers. This flag forces the function to fail if the file exists, instead of overwriting it. (C11) |  |  |  |  |
| When using `fopen_s` or `freopen_s`, file access permissions for any file created with `"w"` or `"a"` prevents other users from accessing it. File access mode flag `"u"` can optionally be prepended to any specifier that begins with `"w"` or `"a"`, to enable the default `fopen` permissions. (C11) |  |  |  |  |

### Return value

1) A copy of the value of `stream` on success, null pointer on failure.

2) zero on success (and a copy of the value of `stream` is written to `*newstreamptr`, non-zero on error (and null pointer is written to `*newstreamptr` unless `newstreamptr` is itself a null pointer).

### Notes

`freopen` is the only way to change the narrow/wide orientation of a stream once it has been established by an I/O operation or by `fwide`.

Microsoft CRT version of `freopen` does not support any mode changes when `filename` is a null pointer and treats this as an error (see documentation). A possible workaround is the non-standard function `_setmode()`.

### Example

The following code redirects `stdout` to a file.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    puts("stdout is printed to console");
    if (freopen("redir.txt", "w", stdout) == NULL)
    {
       perror("freopen() failed");
       return EXIT_FAILURE;
    }
    puts("stdout is redirected to a file"); // this is written to redir.txt
    fclose(stdout);
    return EXIT_SUCCESS;
}
```

Output:

```text
stdout is printed to console
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.21.5.4 The freopen function (p: 224-225)

- K.3.5.2.2 The freopen_s function (p: 429-430)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.5.4 The freopen function (p: 307)

- K.3.5.2.2 The freopen_s function (p: 590)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.5.4 The freopen function (p: 272-273)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.5.4 The freopen function

### See also

|  |  |
| --- | --- |
| fopen, fopen_s (C11) | opens a file (function) |
| fclose | closes a file (function) |
| C++ documentation for freopen |  |
