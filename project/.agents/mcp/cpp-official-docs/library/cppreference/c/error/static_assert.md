# static_assert

| Defined in header `<assert.h>` |  |
| --- | --- |
| `#define static_assert _Static_assert` | (since C11) (removed in C23) |

This convenience macro expands to the keyword `_Static_assert`.

### Example

```c
#include <assert.h>

int main(void)
{
    static_assert(2 + 2 == 4, "2+2 isn't 4");   // well-formed

    static_assert(sizeof(int) < sizeof(char),   // compile-time error
                  "this program requires that int is less than char");
}
```

### Notes

Since C23, `static_assert` is itself a keyword, which may also be a predefined macro, so `<assert.h>` no longer provides it.

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.2/3 Diagnostics <assert.h> (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.2/3 Diagnostics <assert.h> (p: 135)

- C11 standard (ISO/IEC 9899:2011):

- 7.2/3 Diagnostics <assert.h> (p: 186)

### See also

C++ documentation for Static Assertion
