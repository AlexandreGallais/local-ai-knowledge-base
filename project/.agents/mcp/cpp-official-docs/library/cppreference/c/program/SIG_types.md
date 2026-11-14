# SIGTERM, SIGSEGV, SIGINT, SIGILL, SIGABRT, SIGFPE

Defined in header `<signal.h>`

`#define SIGTERM /*implementation defined*/`

`#define SIGSEGV /*implementation defined*/`

`#define SIGINT /*implementation defined*/`

`#define SIGILL /*implementation defined*/`

`#define SIGABRT /*implementation defined*/`

`#define SIGFPE /*implementation defined*/`

Each of the above macro constants expands to an integer constant expression with distinct values, which represent different signals sent to the program.

| Constant | Explanation |
| --- | --- |
| `SIGTERM` | termination request, sent to the program |
| `SIGSEGV` | invalid memory access (segmentation fault) |
| `SIGINT` | external interrupt, usually initiated by the user |
| `SIGILL` | invalid program image, such as invalid instruction |
| `SIGABRT` | abnormal termination condition, as is e.g. initiated by `abort()` |
| `SIGFPE` | erroneous arithmetic operation such as divide by zero |

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.14/3 Signal handling <signal.h> (p: 193)

- C11 standard (ISO/IEC 9899:2011):

- 7.14/3 Signal handling <signal.h> (p: 265)

- C99 standard (ISO/IEC 9899:1999):

- 7.14/3 Signal handling <signal.h> (p: 246)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.7 SIGNAL HANDLING <signal.h>

### See also

|  |  |
| --- | --- |
| signal | sets a signal handler for particular signal (function) |
| raise | runs the signal handler for particular signal (function) |
| C++ documentation for signal types |  |
