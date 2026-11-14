# abort

| Defined in header `<stdlib.h>` |  |
| --- | --- |
| `void abort(void);` | (until C11) |
| `_Noreturn void abort(void);` | (since C11) (until C23) |
| `[[noreturn]] void abort(void);` | (since C23) |

Causes abnormal program termination unless `SIGABRT` is being caught by a signal handler passed to signal and the handler does not return.

Functions passed to `atexit()` are not called. Whether open resources such as files are closed is implementation defined. An implementation defined status is returned to the host environment that indicates unsuccessful execution.

### Parameters

(none)

### Return value

(none)

### Notes

POSIX specifies that the `abort()` function overrides blocking or ignoring the `SIGABRT` signal.

Some compiler intrinsics, e.g. `__builtin_trap` (gcc, clang, and icc) or `__fastfail`/`__debugbreak` (msvc), can be used to terminate the program as fast as possible.

### Example

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    FILE *fp = fopen("data.txt","r");
    if (fp == NULL)
    {
        fprintf(stderr, "error opening file data.txt in function main()\n");
        abort();
    }

    /* Normal processing continues here. */
    fclose(fp);
    printf("Normal Return\n");
    return 0;
}
```

Output:

```text
error opening file data.txt in function main()
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.22.4.1 The abort function (p: 255)

- C11 standard (ISO/IEC 9899:2011):

- 7.22.4.1 The abort function (p: 350)

- C99 standard (ISO/IEC 9899:1999):

- 7.20.4.1 The abort function (p: 315)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.10.4.1 The abort function

### See also

|  |  |
| --- | --- |
| exit | causes normal program termination with cleaning up (function) |
| atexit | registers a function to be called on `exit()` invocation (function) |
| quick_exit (C11) | causes normal program termination without completely cleaning up (function) |
| C++ documentation for abort |  |
