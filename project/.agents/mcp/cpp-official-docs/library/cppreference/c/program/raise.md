# raise

Defined in header `<signal.h>`

`int raise( int sig );`

Sends signal sig to the program. The signal handler, specified using `signal()`, is invoked.

If the user-defined signal handling strategy is not set using `signal()` yet, it is implementation-defined whether the signal will be ignored or default handler will be invoked.

### Parameters

sig - the signal to be sent. It can be an implementation-defined value or one of the following values: SIGABRT, SIGFPE, SIGILL, SIGINT, SIGSEGV, SIGTERM defines signal types (macro constant)

### Return value

`​0​` upon success, non-zero value on failure.

### Example

```c
#include <signal.h>
#include <stdio.h>

void signal_handler(int signal)
{
    printf("Received signal %d\n", signal);
}

int main(void)
{
    // Install a signal handler.
    signal(SIGTERM, signal_handler);

    printf("Sending signal %d\n", SIGTERM);
    raise(SIGTERM);
    printf("Exit main()\n");
}
```

Output:

```text
Sending signal 15
Received signal 15
Exit main()
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.14.2.1 The raise function (p: 194-195)

- C11 standard (ISO/IEC 9899:2011):

- 7.14.2.1 The raise function (p: 267)

- C99 standard (ISO/IEC 9899:1999):

- 7.14.2.1 The raise function (p: 248)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.7.2.1 The raise function

### See also

|  |  |
| --- | --- |
| signal | sets a signal handler for particular signal (function) |
| C++ documentation for raise |  |
