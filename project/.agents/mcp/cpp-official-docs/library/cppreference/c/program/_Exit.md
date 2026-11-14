# _Exit

| Defined in header `<stdlib.h>` |  |
| --- | --- |
| `void _Exit( int exit_code );` | (since C99) (until C11) |
| `_Noreturn void _Exit( int exit_code );` | (since C11) (until C23) |
| `[[noreturn]] void _Exit( int exit_code );` | (since C23) |

Causes normal program termination to occur without completely cleaning the resources.

Functions passed to `at_quick_exit()` or `atexit()` are not called. Whether open streams with unwritten buffered data are flushed, open streams are closed, or temporary files are removed is implementation-defined.

If `exit_code` is `0` or `EXIT_SUCCESS`, an implementation-defined status indicating successful termination is returned to the host environment. If `exit_code` is `EXIT_FAILURE`, an implementation-defined status, indicating *unsuccessful* termination, is returned. In other cases an implementation-defined status value is returned.

### Parameters

exit_code - exit status of the program

### Return value

(none)

### Example

```c
#include <stdlib.h>
#include <stdio.h>

/* _Exit does not call functions registered with atexit. */
void f1(void)
{
    puts("pushed first");
}

void f2(void)
{
    puts("pushed second");
}

int main(void)
{
    printf("Enter main()\n");
    atexit(f1);
    atexit(f2);
    fflush(stdout);   /* _Exit may not flush unwritten buffered data */
    _Exit(0);
}
```

Output:

```text
Enter main()
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.22.4.5 The _Exit function (p: 256)

- C11 standard (ISO/IEC 9899:2011):

- 7.22.4.5 The _Exit function (p: 352)

- C99 standard (ISO/IEC 9899:1999):

- 7.20.4.4 The _Exit function (p: 316)

### See also

|  |  |
| --- | --- |
| abort | causes abnormal program termination (without cleaning up) (function) |
| exit | causes normal program termination with cleaning up (function) |
| C++ documentation for _Exit |  |
