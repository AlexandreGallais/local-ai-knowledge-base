# RAND_MAX

Defined in header `<stdlib.h>`

`#define RAND_MAX /*implementation defined*/`

Expands to an integer constant expression equal to the maximum value returned by the function `rand()`. This value is implementation dependent. It's guaranteed that this value is at least `32767`.

### Example

```c
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void)
{
    srand(time(NULL)); // use current time as seed for random generator
    printf("RAND_MAX: %i\n", RAND_MAX);
    printf("INT_MAX: %i\n", INT_MAX);
    printf("Random value on [0,1]: %f\n", (double)rand() / RAND_MAX);
}
```

Possible output:

```text
RAND_MAX: 2147483647
INT_MAX: 2147483647
Random value on [0,1]: 0.362509
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.22/3 General utilities <stdlib.h> (p: 248)

- C11 standard (ISO/IEC 9899:2011):

- 7.22/3 General utilities <stdlib.h> (p: 340)

- C99 standard (ISO/IEC 9899:1999):

- 7.20/3 General utilities <stdlib.h> (p: 306)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.10 GENERAL UTILITIES <stdlib.h>

### See also

|  |  |
| --- | --- |
| rand | generates a pseudo-random number (function) |
| srand | seeds pseudo-random number generator (function) |
| C++ documentation for RAND_MAX |  |
