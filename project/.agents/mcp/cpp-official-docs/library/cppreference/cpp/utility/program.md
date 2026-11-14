# Program support utilities

### Program termination

The following functions manage program termination and resource cleanup.

| Defined in header `<cstdlib>` |  |
| --- | --- |
| abort | causes abnormal program termination (without cleaning up) (function) |
| exit | causes normal program termination with cleaning up (function) |
| quick_exit (C++11) | causes quick program termination without completely cleaning up (function) |
| _Exit (C++11) | causes normal program termination without cleaning up (function) |
| atexit | registers a function to be called on `std::exit()` invocation (function) |
| at_quick_exit (C++11) | registers a function to be called on `std::quick_exit` invocation (function) |
| EXIT_SUCCESS, EXIT_FAILURE | indicates program execution status (macro constant) |

Unreachable control flow Defined in header `<utility>` unreachable (C++23) marks unreachable point of execution (function) (since C++23)

### Communicating with the environment

| Defined in header `<cstdlib>` |  |
| --- | --- |
| system | calls the host environment's command processor (function) |
| getenv | access to the list of environment variables (function) |

### Signals

Several functions and macro constants for signal management are provided.

| Defined in header `<csignal>` |  |
| --- | --- |
| signal | sets a signal handler for particular signal (function) |
| raise | runs the signal handler for particular signal (function) |
| sig_atomic_t | the integer type that can be accessed as an atomic entity from an asynchronous signal handler (typedef) |
| SIG_DFL, SIG_IGN | defines signal handling strategies (macro constant) |
| SIG_ERR | return value of `signal` specifying that an error was encountered (macro constant) |
| Signal types |  |
| SIGABRT, SIGFPE, SIGILL, SIGINT, SIGSEGV, SIGTERM | defines signal types (macro constant) |

### Non-local jumps

| Defined in header `<csetjmp>` |  |
| --- | --- |
| setjmp | saves the context (function macro) |
| longjmp | jumps to specified location (function) |
| Types |  |
| jmp_buf | execution context type (typedef) |

### See also

C documentation for Program support utilities
