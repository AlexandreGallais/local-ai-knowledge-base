# atomic_flag

| Defined in header `<stdatomic.h>` |  |
| --- | --- |
| `typedef struct /* unspecified */ atomic_flag;` | (since C11) |

`atomic_flag` is an atomic boolean type. Unlike other atomic types, it is guaranteed to be lock-free. Unlike `atomic_bool`, `atomic_flag` does not provide load or store operations.

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.17.1/5 atomic_flag (p: 293)

- 7.17.8 Atomic flag type and operations (p: 302-303)

- C17 standard (ISO/IEC 9899:2018):

- 7.17.1/4 atomic_flag (p: 200)

- 7.17.8 Atomic flag type and operations (p: 208-209)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.1/4 atomic_flag (p: 273)

- 7.17.8 Atomic flag type and operations (p: 285-286)

### See also

|  |  |
| --- | --- |
| ATOMIC_FLAG_INIT (C11) | initializes a new `atomic_flag` (macro constant) |
| atomic_flag_test_and_set, atomic_flag_test_and_set_explicit (C11) | sets an atomic_flag to true and returns the old value (function) |
| atomic_flag_clear, atomic_flag_clear_explicit (C11) | sets an atomic_flag to false (function) |
| C++ documentation for atomic_flag |  |
