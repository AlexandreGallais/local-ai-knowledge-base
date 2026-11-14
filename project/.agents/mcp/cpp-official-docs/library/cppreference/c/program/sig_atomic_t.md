# sig_atomic_t

Defined in header `<signal.h>`

`typedef /* unspecified */ sig_atomic_t;`

An integer type which can be accessed as an atomic entity even in the presence of asynchronous interrupts made by signals.

### Example

```c
#include <signal.h>
#include <stdio.h>

volatile sig_atomic_t gSignalStatus = 0;

void signal_handler(int status)
{
    gSignalStatus = status;
}

int main(void)
{
    /* Install a signal handler. */
    signal(SIGINT, signal_handler);

    printf("SignalValue:    %d\n", gSignalStatus);
    printf("Sending signal: %d\n", SIGINT);
    raise(SIGINT);
    printf("SignalValue:    %d\n", gSignalStatus);
}
```

Possible output:

```text
SignalValue:    0
Sending signal: 2
SignalValue:    2
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.14/2 Signal handling <signal.h> (p: 194-195)

- C11 standard (ISO/IEC 9899:2011):

- 7.14/2 Signal handling <signal.h> (p: 265)

- C99 standard (ISO/IEC 9899:1999):

- 7.14/2 Signal handling <signal.h> (p: 246)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.7 SIGNAL HANDLING <signal.h>

### See also

|  |  |
| --- | --- |
| signal | sets a signal handler for particular signal (function) |
| C++ documentation for sig_atomic_t |  |
