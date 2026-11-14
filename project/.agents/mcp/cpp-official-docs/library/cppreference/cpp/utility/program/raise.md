# std::raise

Defined in header `<csignal>`

`int raise( int sig );`

Sends signal sig to the program. The signal handler (specified using the `std::signal()` function) is invoked.

If the user-defined signal handling strategy is not set using `std::signal()` yet, it is implementation-defined whether the signal will be ignored or default handler will be invoked.

### Parameters

sig - the signal to be sent. It can be an implementation-defined value or one of the following values: SIGABRT, SIGFPE, SIGILL, SIGINT, SIGSEGV, SIGTERM defines signal types (macro constant)

### Return value

`​0​` upon success, non-zero value on failure.

### Example

```cpp
#include <csignal>
#include <iostream>

void signal_handler(int signal)
{
    std::cout << "Received signal " << signal << '\n';
}

int main()
{
    // Install a signal handler
    std::signal(SIGTERM, signal_handler);

    std::cout << "Sending signal " << SIGTERM << '\n';
    std::raise(SIGTERM);
}
```

Possible output:

```text
Sending signal 15
Received signal 15
```

### See also

|  |  |
| --- | --- |
| signal | sets a signal handler for particular signal (function) |
| C documentation for raise |  |
