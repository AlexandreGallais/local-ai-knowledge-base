# quick_exit

| Defined in header `<stdlib.h>` |  |
| --- | --- |
| `_Noreturn void quick_exit( int exit_code );` | (since C11) (until C23) |
| `[[noreturn]] void quick_exit( int exit_code );` | (since C23) |

Causes normal program termination to occur without completely cleaning the resources.

Functions passed to `at_quick_exit` are called in reverse order of their registration. After calling the registered functions, calls `_Exit(exit_code)`.

Functions passed to `atexit` or signal handlers passed to `signal` are not called.

### Parameters

exit_code - exit status of the program

### Return value

(none)

### Example

```c
#include <stdlib.h>
#include <stdio.h>

void f1(void)
{
    puts("pushed first");
    fflush(stdout);
}

void f2(void)
{
    puts("pushed second");
}

void f3(void)
{
    puts("won't be called");
}

int main(void)
{
    at_quick_exit(f1);
    at_quick_exit(f2);
    atexit(f3);
    quick_exit(0);
}
```

Output:

```text
pushed second
pushed first
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.22.4.7 The quick_exit function (p: 257)

- C11 standard (ISO/IEC 9899:2011):

- 7.22.4.7 The quick_exit function (p: 353)

### See also

|  |  |
| --- | --- |
| abort | causes abnormal program termination (without cleaning up) (function) |
| atexit | registers a function to be called on `exit()` invocation (function) |
| at_quick_exit (C11) | registers a function to be called on **`quick_exit`** invocation (function) |
| C++ documentation for quick_exit |  |
