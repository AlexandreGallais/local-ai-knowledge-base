# ungetc

Defined in header `<stdio.h>`

`int ungetc( int ch, FILE* stream );`

If `ch` does not equal `EOF`, pushes the character `ch` (reinterpreted as `unsigned char`) into the input buffer associated with the stream `stream` in such a manner that subsequent read operation from `stream` will retrieve that character. The external device associated with the stream is not modified.

Stream repositioning operations `fseek`, `fsetpos`, and `rewind` discard the effects of `ungetc`.

If `ungetc` is called more than once without an intervening read or repositioning, it may fail (in other words, a pushback buffer of size 1 is guaranteed, but any larger buffer is implementation-defined). If multiple successful `ungetc` were performed, read operations retrieve the pushed-back characters in reverse order of `ungetc`.

If `ch` equals `EOF`, the operation fails and the stream is not affected.

A successful call to `ungetc` clears the end of file status flag `feof`.

A successful call to `ungetc` on a binary stream decrements the stream position indicator by one (the behavior is indeterminate if the stream position indicator was zero).

A successful call to `ungetc` on a text stream modifies the stream position indicator in unspecified manner but guarantees that after all pushed-back characters are retrieved with a read operation, the stream position indicator is equal to its value before `ungetc`.

### Parameters

|  |  |  |
| --- | --- | --- |
| ch | - | character to be pushed into the input stream buffer |
| stream | - | file stream to put the character back to |

### Return value

On success `ch` is returned.

On failure `EOF` is returned and the given stream remains unchanged.

### Notes

The size of the pushback buffer varies in practice from 4k (Linux, MacOS) to as little as 4 (Solaris) or the guaranteed minimum 1 (HPUX, AIX).

The apparent size of the pushback buffer may be larger if the character that is pushed back equals the character existing at that location in the external character sequence (the implementation may simply decrement the read file position indicator and avoid maintaining a pushback buffer).

### Example

Demonstrates the original purpose of `ungetc`: implementation of `scanf`

```c
#include <ctype.h>
#include <stdio.h>

void demo_scanf(const char* fmt, FILE* s)
{
    while (*fmt != '\0')
    {
        if (*fmt == '%')
        {
            int c;
            switch (*++fmt)
            {
                case 'u':
                    while (isspace(c=getc(s))) {}
                    unsigned int num = 0;
                    while (isdigit(c))
                    {
                        num = num*10 + c-'0';
                        c = getc(s);
                    }
                    printf("%%u scanned %u\n", num);
                    ungetc(c, s);
                    break;
                case 'c':
                    c = getc(s);
                    printf("%%c scanned '%c'\n", c);
                    break;
            }
        }
        else
            ++fmt;
    }
}

int main(void)
{
    FILE* f = fopen("input.txt", "w+");
    if (f != NULL)
    {
        fputs("123x", f);
        rewind(f);
        demo_scanf("%u%c", f);
        fclose(f);
    }
    return 0;
}
```

Output:

```text
%u scanned 123
%c scanned 'x'
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.21.7.10 The ungetc function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.21.7.10 The ungetc function (p: 243)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.7.10 The ungetc function (p: 334)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.7.11 The ungetc function (p: 300)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.7.11 The ungetc function

### See also

|  |  |
| --- | --- |
| fgetc, getc | gets a character from a file stream (function) |
| C++ documentation for ungetc |  |
