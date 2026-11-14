# ATOMIC_FLAG_INIT

| Defined in header `<stdatomic.h>` |  |
| --- | --- |
| `#define ATOMIC_FLAG_INIT /* unspecified */` | (since C11) |

Expands to an initializer that can be used to initialize `atomic_flag` type to the clear state. The value of an `atomic_flag` that is not initialized using this macro is indeterminate.

### Example

```c
#include <stdatomic.h>

atomic_flag flag = ATOMIC_FLAG_INIT;
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.1/3 ATOMIC_FLAG_INIT (p: 200)

- 7.17.8/4 ATOMIC_FLAG_INIT (p: 208)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.1/3 ATOMIC_FLAG_INIT (p: 273)

- 7.17.8/4 ATOMIC_FLAG_INIT (p: 285)

### See also

|  |  |
| --- | --- |
| ATOMIC_VAR_INIT (C11), (deprecated in C17), (removed in C23) | initializes a new atomic object (function macro) |
| atomic_flag (C11) | lock-free atomic boolean flag (struct) |
| C++ documentation for ATOMIC_FLAG_INIT |  |
