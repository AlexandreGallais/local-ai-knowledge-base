# abort_handler_s

| Defined in header `<stdlib.h>` |  |
| --- | --- |
| `void abort_handler_s( const char * restrict msg, void * restrict ptr, errno_t error );` | (since C11) |

Writes an implementation-defined message to `stderr` which must include the string pointed to by `msg` and calls `abort()`.

A pointer to this function can be passed to set_constraint_handler_s to establish a runtime constraints violation handler.

As with all bounds-checked functions, `abort_handler_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<stdlib.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| msg | - | pointer to the message written to the standard error stream |
| ptr | - | pointer to an implementation-defined object or a null pointer. Examples of implementation-defined objects are objects that give the name of the function that detected the violation and the line number when the violation was detected |
| error | - | a positive value of type errno_t |

### Return value

none; this function does not return to its caller

### Notes

If `set_constraint_handler_s` is never called, the default handler is implementation-defined: it may be `abort_handler_s`, `ignore_handler_s`, or some other implementation-defined handler.

### Example

```c
#define __STDC_WANT_LIB_EXT1__ 1
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
#ifdef __STDC_LIB_EXT1__
    char dst[2];
    set_constraint_handler_s(ignore_handler_s);
    int r = strcpy_s(dst, sizeof dst, "Too long!");
    printf("dst = \"%s\", r = %d\n", dst, r);
    set_constraint_handler_s(abort_handler_s);
    r = strcpy_s(dst, sizeof dst, "Too long!");
    printf("dst = \"%s\", r = %d\n", dst, r);
#endif
}
```

Possible output:

```text
dst = "", r = 22
abort_handler_s was called in response to a runtime-constraint violation.

The runtime-constraint violation was caused by the following expression in strcpy_s:
(s1max <= (s2_len=strnlen_s(s2, s1max)) ) (in string_s.c:62)

Note to end users: This program was terminated as a result
of a bug present in the software. Please reach out to your
software's vendor to get more help.
Aborted
```

### References

- C11 standard (ISO/IEC 9899:2011):

- K.3.6.1.2 The abort_handler_s function (p: 605)

### See also

|  |  |
| --- | --- |
| ignore_handler_s (C11) | ignore callback for the bounds-checked functions (function) |
| set_constraint_handler_s (C11) | set the error callback for bounds-checked functions (function) |
