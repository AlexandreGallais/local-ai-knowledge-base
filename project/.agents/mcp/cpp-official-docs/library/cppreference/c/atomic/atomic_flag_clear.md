# atomic_flag_clear, atomic_flag_clear_explicit

| Defined in header `<stdatomic.h>` |  |  |
| --- | --- | --- |
| `void atomic_flag_clear( volatile atomic_flag* obj );` | (1) | (since C11) |
| `void atomic_flag_clear_explicit( volatile atomic_flag* obj, memory_order order );` | (2) | (since C11) |

Atomically changes the state of a `atomic_flag` pointed to by `obj` to clear (`false`). The first version orders memory accesses according to `memory_order_seq_cst`, the second version orders memory accesses according to `order`.

The argument is pointer to a volatile atomic flag to accept addresses of both non-volatile and volatile (e.g. memory-mapped I/O) atomic flags.

### Parameters

|  |  |  |
| --- | --- | --- |
| obj | - | pointer to the atomic flag object to modify |
| order | - | the memory synchronization ordering for this operation: all values are permitted |

### Return value

(none)

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.8.2 The atomic_flag_clear functions (p: 209)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.8.2 The atomic_flag_clear functions (p: 286)

### See also

|  |  |
| --- | --- |
| atomic_flag_test_and_set, atomic_flag_test_and_set_explicit (C11) | sets an atomic_flag to true and returns the old value (function) |
| C++ documentation for atomic_flag_clear, atomic_flag_clear_explicit |  |
