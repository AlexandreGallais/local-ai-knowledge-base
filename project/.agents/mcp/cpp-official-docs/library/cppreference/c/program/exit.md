# exit

| Defined in header `<stdlib.h>` |  |
| --- | --- |
| `void exit( int exit_code );` | (until C11) |
| `_Noreturn void exit( int exit_code );` | (since C11) (until C23) |
| `[[noreturn]] void exit( int exit_code );` | (since C23) |

Causes normal program termination to occur.

Several cleanup steps are performed:

- functions passed to `atexit` are called, in reverse order of registration
- all C streams are flushed and closed
- files created by `tmpfile` are removed
- control is returned to the host environment. If `exit_code` is zero or `EXIT_SUCCESS`, an implementation-defined status indicating successful termination is returned. If `exit_code` is `EXIT_FAILURE`, an implementation-defined status indicating unsuccessful termination is returned. In other cases implementation-defined status value is returned.

### Notes

The functions registered with `at_quick_exit` are not called.

The behavior is undefined if a program calls `exit` more than once, or if it calls `exit` and `quick_exit`

The behavior is undefined if during a call to a function registered with `atexit`, the function exits with `longjmp`.

Returning from the the main function, either by a `return` statement or by reaching the end of the function, executes `exit()`, passing the argument of the return statement (or `​0​` if implicit return was used) as `exit_code`.

### Parameters

exit_code - exit status of the program

### Return value

(none)

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
       exit( EXIT_FAILURE );
    }
    fclose(fp);
    printf("Normal Return\n");
    return EXIT_SUCCESS ;
}
```

Possible output:

```text
error opening file data.txt in function main()
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.22.4.4 The exit function (p: 256)

- C11 standard (ISO/IEC 9899:2011):

- 7.22.4.4 The exit function (p: 351-352)

- C99 standard (ISO/IEC 9899:1999):

- 7.20.4.3 The exit function (p: 315-316)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.10.4.3 The exit function

### See also

|  |  |
| --- | --- |
| abort | causes abnormal program termination (without cleaning up) (function) |
| atexit | registers a function to be called on `exit()` invocation (function) |
| quick_exit (C11) | causes normal program termination without completely cleaning up (function) |
| C++ documentation for exit |  |
