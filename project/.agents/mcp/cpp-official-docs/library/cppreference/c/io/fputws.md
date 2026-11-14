# fputws

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `int fputws( const wchar_t *str, FILE *stream );` | (since C95) (until C99) |
| `int fputws( const wchar_t * restrict str, FILE * restrict stream );` | (since C99) |

Writes every character from the null-terminated wide string `str` to the output stream `stream`, as if by repeatedly executing `fputwc`.

The terminating null wide character from `str` is not written.

### Parameters

|  |  |  |
| --- | --- | --- |
| str | - | null-terminated wide string to be written |
| stream | - | output stream |

### Return value

On success, returns a non-negative value

On failure, returns `EOF` and sets the *error* indicator (see `ferror`) on `stream`.

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <wchar.h>

int main(void)
{
    setlocale(LC_ALL, "en_US.utf8");
    int rc = fputws(L"御休みなさい", stdout);

    if (rc == EOF)
       perror("fputws()"); // POSIX requires that errno is set
}
```

Output:

```text
御休みなさい
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.3.4 The fputws function (p: 423)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.3.4 The fputws function (p: 368)

### See also

|  |  |
| --- | --- |
| fputs | writes a character string to a file stream (function) |
| wprintf, fwprintf, swprintf, wprintf_s, fwprintf_s, swprintf_s, snwprintf_s (C95), (C95), (C95), (C11), (C11), (C11), (C11) | prints formatted wide character output to `stdout`, a file stream or a buffer (function) |
| **fputws** (C95) | writes a wide string to a file stream (function) |
| fgetws (C95) | gets a wide string from a file stream (function) |
| C++ documentation for fputws |  |
