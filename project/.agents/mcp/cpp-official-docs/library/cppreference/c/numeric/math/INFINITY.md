# INFINITY

| Defined in header `<math.h>` |  |
| --- | --- |
| `#define INFINITY /*implementation defined*/` | (since C99) |

If the implementation supports floating-point infinities, the macro `INFINITY` expands to constant expression of type `float` which evaluates to positive or unsigned infinity.

If the implementation does not support floating-point infinities, the macro `INFINITY` expands to a positive value that is guaranteed to overflow a `float` at compile time, and the use of this macro generates a compiler warning.

The style used to print an infinity is implementation defined.

### Example

Show style used to print an infinity and IEEE format.

```c
#include <stdio.h>
#include <math.h>
#include <stdint.h>
#include <inttypes.h>
#include <string.h>

int main(void)
{
    double f = INFINITY;
    uint64_t fn; memcpy(&fn, &f, sizeof f);
    printf("INFINITY:   %f %" PRIx64 "\n", f, fn);
}
```

Possible output:

```text
INFINITY:   inf 7ff0000000000000
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.12/4 INFINITY (p: 231-232)

- C99 standard (ISO/IEC 9899:1999):

- 7.12/4 INFINITY (p: 212-213)

### See also

|  |  |
| --- | --- |
| isinf (C99) | checks if the given number is infinite (function macro) |
| HUGE_VALF, HUGE_VAL, HUGE_VALL (C99), (C99) | indicates value too big to be representable (infinity) by `float`, `double` and `long double` respectively (macro constant) |
| C++ documentation for INFINITY |  |
