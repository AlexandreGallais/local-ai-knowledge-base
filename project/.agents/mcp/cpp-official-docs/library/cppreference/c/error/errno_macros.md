# Error numbers

Each of the macros defined in `<errno.h>` expands to an integer constant expression with type `int` and with a unique positive value. The following constants are defined by ISO C. The implementation may define more, as long as they begin with `'E'` followed by digits or uppercase letters.

| Defined in header `<errno.h>` |  |
| --- | --- |
| EDOM | Mathematics argument out of domain of function (macro constant) |
| EILSEQ (C95) | Illegal byte sequence (macro constant) |
| ERANGE | Result too large (macro constant) |

### Notes

Many additional errno constants are defined by POSIX and by the C++ standard library, and individual implementations may define even more, e.g. `errno(3)` on Linux or `intro(2)` on BSD and OS X.

### Example

```c
#include <errno.h>
#include <math.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    errno = 0;
    printf("log(-1.0) = %f\n", log(-1.0));
    printf("%s\n\n", strerror(errno));

    errno = 0;
    printf("log(0.0)  = %f\n", log(0.0));
    printf("%s\n", strerror(errno));
}
```

Possible output:

```text
log(-1.0) = nan
Numerical argument out of domain

log(0.0)  = -inf
Numerical result out of range
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.5/2 Errors <errno.h> (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.5/2 Errors <errno.h> (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.5/2 Errors <errno.h> (p: 205)

- C99 standard (ISO/IEC 9899:1999):

- 7.5/2 Errors <errno.h> (p: 186)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.1.3 Errors <errno.h>

### See also

|  |  |
| --- | --- |
| errno | macro which expands to POSIX-compatible thread-local error number variable (macro variable) |
| perror | displays a character string corresponding of the current error to `stderr` (function) |
| strerror, strerror_s, strerrorlen_s (C11), (C11) | returns a text version of a given error code (function) |
| C++ documentation for Error numbers |  |
