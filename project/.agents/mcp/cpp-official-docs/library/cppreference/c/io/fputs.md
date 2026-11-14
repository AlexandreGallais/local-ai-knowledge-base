# fputs

| Defined in header `<stdio.h>` |  |
| --- | --- |
| `int fputs( const char* str, FILE* stream );` | (until C99) |
| `int fputs( const char* restrict str, FILE* restrict stream );` | (since C99) |

Writes every character from the null-terminated string `str` to the output stream `stream`, as if by repeatedly executing `fputc`.

The terminating null character from `str` is not written.

### Parameters

|  |  |  |
| --- | --- | --- |
| str | - | null-terminated character string to be written |
| stream | - | output stream |

### Return value

On success, returns a non-negative value.

On failure, returns `EOF` and sets the *error* indicator (see `ferror()`) on `stream`.

### Notes

The related function `puts` appends a newline character to the output, while `fputs` writes the string unmodified.

Different implementations return different non-negative numbers: some return the last character written, some return the number of characters written (or `INT_MAX` if the string was longer than that), some simply return a non-negative constant such as zero.

### Example

```c
#include <stdio.h>

int main(void)
{
    int rc = fputs("Hello World", stdout);

    if (rc == EOF)
       perror("fputs()"); // POSIX requires that errno is set
}
```

Output:

```text
Hello World
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.21.7.4 The fputs function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.21.7.4 The fputs function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.7.4 The fputs function (p: 331-332)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.7.4 The fputs function (p: 297)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.7.4 The fputs function

### See also

|  |  |
| --- | --- |
| printf, fprintf, sprintf, snprintf, printf_s, fprintf_s, sprintf_s, snprintf_s (C99), (C11), (C11), (C11), (C11) | prints formatted output to `stdout`, a file stream or a buffer (function) |
| puts | writes a character string to `stdout` (function) |
| fgets | gets a character string from a file stream (function) |
| C++ documentation for fputs |  |
