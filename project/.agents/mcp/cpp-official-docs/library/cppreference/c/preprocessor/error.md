# Diagnostic directives

Shows the given error message and renders the program ill-formed, or given warning message without affect the validity of the program(since C23).

### Syntax

|  |  |  |
| --- | --- | --- |
| `#error` diagnostic-message | (1) |  |
| `#warning` diagnostic-message | (2) | (since C23) |

### Explanation

1) After encountering the `#error` directive, an implementation displays the message diagnostic-message and renders the program ill-formed (the compilation stops).

2) Same as (1), except that the validity of the program is not affected and the compilation continues.

diagnostic-message can consist of several words not necessarily in quotes.

### Notes

Before its standardization in C23, `#warning` has been provided by many compilers in all modes as a conforming extension.

### Example

```c
#if __STDC__ != 1
#  error "Not a standard compliant compiler"
#endif

#if __STDC_VERSION__ >= 202311L
#  warning "Using #warning as a standard feature"
#endif

#include <stdio.h>

int main (void)
{
    printf("The compiler used conforms to the ISO C Standard !!");
}
```

Possible output:

```text
The compiler used conforms to the ISO C Standard !!
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 6.10.5 Error directive (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 6.10.5 Error directive (p: 126-127)

- C11 standard (ISO/IEC 9899:2011):

- 6.10.5 Error directive (p: 174)

- C99 standard (ISO/IEC 9899:1999):

- 6.10.5 Error directive (p: 159)

- C89/C90 standard (ISO/IEC 9899:1990):

- 3.8.5 Error directive

### See also

C++ documentation for Diagnostic directives
