# setbuf

| Defined in header `<stdio.h>` |  |
| --- | --- |
| `void setbuf( FILE *stream, char *buffer );` | (until C99) |
| `void setbuf( FILE *restrict stream, char *restrict buffer );` | (since C99) |
| `#define BUFSIZ /*unspecified*/` |  |

Sets the internal buffer to use for stream operations. It should be at least `BUFSIZ` characters long.

If `buffer` is not null, equivalent to `setvbuf(stream, buffer, _IOFBF, BUFSIZ)`.

If `buffer` is null, equivalent to `setvbuf(stream, NULL, _IONBF, 0)`, which turns off buffering.

### Parameters

|  |  |  |
| --- | --- | --- |
| stream | - | the file stream to set the buffer to |
| buffer | - | pointer to a buffer for the stream to use. If a null pointer is supplied, the buffering is turned off |

### Return value

None.

### Notes

If `BUFSIZ` is not the appropriate buffer size, `setvbuf` can be used to change it.

`setvbuf` should also be used to detect errors, since `setbuf` does not indicate success or failure.

This function may only be used after `stream` has been associated with an open file, but before any other operation (other than a failed call to `setbuf`/`setvbuf`).

A common error is setting the buffer of stdin or stdout to an array whose lifetime ends before the program terminates:

```c
int main(void) {
    char buf[BUFSIZ];
    setbuf(stdin, buf);
} // lifetime of buf ends, undefined behavior
```

### Example

`setbuf` may be used to disable buffering on streams that require immediate output.

```c
#include <stdio.h>
#include <threads.h>

int main(void)
{
    setbuf(stdout, NULL); // unbuffered stdout
    putchar('a'); // 'a' appears immediately if stdout is unbuffered
    thrd_sleep(&(struct timespec){.tv_sec=1}, NULL); // sleep 1 sec
    putchar('b');
}
```

Output:

```text
ab
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.21.5.5 The setbuf function (p: 225)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.5.5 The setbuf function (p: 307-308)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.5.5 The setbuf function (p: 273)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.5.5 The setbuf function

### See also

|  |  |
| --- | --- |
| setvbuf | sets the buffer and its size for a file stream (function) |
| C++ documentation for setbuf |  |
