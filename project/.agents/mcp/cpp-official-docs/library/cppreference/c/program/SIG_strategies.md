# SIG_DFL, SIG_IGN

Defined in header `<signal.h>`

`#define SIG_DFL /*implementation defined*/`

`#define SIG_IGN /*implementation defined*/`

The `SIG_DFL` and `SIG_IGN` macros expand into integral expressions that are not equal to an address of any function. The macros define signal handling strategies for `signal()` function.

| Constant | Explanation |
| --- | --- |
| `SIG_DFL` | default signal handling |
| `SIG_IGN` | signal is ignored |

### Example

```c
#include <signal.h>
#include <stdio.h>

int main(void)
{
    /* using the default signal handler */
    raise(SIGTERM);
    printf("Exit main()\n");   /* never reached */
}
```

Output:

```text
(none)
```

### Example

```c
#include <signal.h>
#include <stdio.h>

int main(void)
{
    /* ignoring the signal */
    signal(SIGTERM, SIG_IGN);
    raise(SIGTERM);
    printf("Exit main()\n");
}
```

Output:

```text
Exit main()
```

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

C++ documentation for SIG_DFL, SIG_IGN
