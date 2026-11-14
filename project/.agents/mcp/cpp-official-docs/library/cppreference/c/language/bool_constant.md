# Predefined Boolean constants (since C23)

### Syntax

|  |  |  |
| --- | --- | --- |
| `true` | (1) | (since C23) |
| `false` | (2) | (since C23) |

### Explanation

Keywords `true` and `false` represent predefined constants. They are non-lvalues of type `bool`.

### Notes

See integral conversions for implicit conversions from `bool` to other types and boolean conversions for the implicit conversions from other types to `bool`.

Until C23, `true` and `false` were implemented as macros provided in `<stdbool.h>`. An implementation may also define `bool`, `true`, and `false` as predefined macros in C23 for compatibility.

### Example

```c
#include <assert.h>

int main()
{
    assert(true == 1 && 0 == false);
}
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 6.4.4.6 Predefined constants (p: 66)

### See also

C++ documentation for Boolean literals
