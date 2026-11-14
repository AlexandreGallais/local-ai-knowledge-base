# Program support utilities

### Program termination

The following functions manage program termination and resources cleanup.

| Defined in header `<stdlib.h>` |  |
| --- | --- |
| abort | causes abnormal program termination (without cleaning up) (function) |
| exit | causes normal program termination with cleaning up (function) |
| quick_exit (C11) | causes normal program termination without completely cleaning up (function) |
| _Exit (C99) | causes normal program termination without cleaning up (function) |
| atexit | registers a function to be called on `exit()` invocation (function) |
| at_quick_exit (C11) | registers a function to be called on `quick_exit` invocation (function) |
| EXIT_SUCCESS, EXIT_FAILURE | indicates program execution execution status (macro constant) |

### Unreachable control flow

| Defined in header `<stddef.h>` |  |
| --- | --- |
| unreachable (C23) | marks unreachable point of execution (function macro) |

### Communicating with the environment

| Defined in header `<stdlib.h>` |  |
| --- | --- |
| system | calls the host environment's command processor (function) |
| getenv, getenv_s (C11) | access to the list of environment variables (function) |

### Memory alignment query

| Defined in header `<stdlib.h>` |  |
| --- | --- |
| memalignment (C23) | queries the alignment of a pointer value (function) |

### Signals

Several functions and macro constants for signal management are provided.

| Defined in header `<signal.h>` |  |
| --- | --- |
| signal | sets a signal handler for particular signal (function) |
| raise | runs the signal handler for particular signal (function) |
| sig_atomic_t | the integer type that can be accessed as an atomic entity from an asynchronous signal handler (typedef) |
| SIG_DFL, SIG_IGN | defines signal handling strategies (macro constant) |
| SIG_ERR | error was encountered (macro constant) |
| Signal types |  |
| SIGABRT, SIGFPE, SIGILL, SIGINT, SIGSEGV, SIGTERM | defines signal types (macro constant) |

### Non-local jumps

| Defined in header `<setjmp.h>` |  |
| --- | --- |
| setjmp | saves the context (function macro) |
| longjmp | jumps to specified location (function) |
| Types |  |
| jmp_buf | execution context type (typedef) |

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.13 Non-local jumps <setjmp.h> (p: 283-284)

- 7.14 Signal handling <signal.h> (p: 285-287)

- 7.24 General utilities <stdlib.h> (p: 356-374)

- 7.33.9 Signal handling <signal.h> (p: 458)

- 7.33.16 General utilities <stdlib.h> (p: 458)

- C17 standard (ISO/IEC 9899:2018):

- 7.13 Nonlocal jumps <setjmp.h> (p: 191-192)

- 7.14 Signal handling <signal.h> (p: 193-195)

- 7.22 General utilities <stdlib.h> (p: 248-262)

- 7.31.7 Signal handling <signal.h> (p: 332)

- 7.31.12 General utilities <stdlib.h> (p: 333)

- C11 standard (ISO/IEC 9899:2011):

- 7.13 Nonlocal jumps <setjmp.h> (p: 262-264)

- 7.14 Signal handling <signal.h> (p: 265-267)

- 7.22 General utilities <stdlib.h> (p: 340-360)

- 7.31.7 Signal handling <signal.h> (p: 455)

- 7.31.12 General utilities <stdlib.h> (p: 456)

- C99 standard (ISO/IEC 9899:1999):

- 7.13 Nonlocal jumps <setjmp.h> (p: 243-245)

- 7.14 Signal handling <signal.h> (p: 246-248)

- 7.20 General utilities <stdlib.h> (p: 306-324)

- 7.26.6 Signal handling <signal.h> (p: 401)

- 7.26.10 General utilities <stdlib.h> (p: 402)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.6 NON-LOCAL JUMPS <setjmp.h>

- 4.7 SIGNAL HANDLING <signal.h>

- 4.10 GENERAL UTILITIES <stdlib.h>

- 4.13.5 Signal handling <signal.h>

- 7.13.7 General utilities <stdlib.h>

### See also

C++ documentation for Program support utilities
