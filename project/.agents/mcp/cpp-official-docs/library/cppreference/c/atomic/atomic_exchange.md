# atomic_exchange, atomic_exchange_explicit

| Defined in header `<stdatomic.h>` |  |  |
| --- | --- | --- |
| `C atomic_exchange( volatile A* obj, C desired );` | (1) | (since C11) |
| `C atomic_exchange_explicit( volatile A* obj, C desired, memory_order order );` | (2) | (since C11) |

Atomically replaces the value pointed by `obj` with `desired` and returns the value `obj` held previously. The operation is read-modify-write operation. The first version orders memory accesses according to `memory_order_seq_cst`, the second version orders memory accesses according to `order`.

This is a generic function defined for all atomic object types `A`. The argument is pointer to a volatile atomic type to accept addresses of both non-volatile and volatile (e.g. memory-mapped I/O) atomic objects, and volatile semantic is preserved when applying this operation to volatile atomic objects. `C` is the non-atomic type corresponding to `A`.

It is unspecified whether the name of a generic function is a macro or an identifier declared with external linkage. If a macro definition is suppressed in order to access an actual function (e.g. parenthesized like `(atomic_exchange)(...)`), or a program defines an external identifier with the name of a generic function, the behavior is undefined..

### Parameters

|  |  |  |
| --- | --- | --- |
| obj | - | pointer to the atomic object to modify |
| desired | - | the value to replace the atomic object with |
| order | - | the memory synchronization ordering for this operation: all values are permitted |

### Return value

The value held previously be the atomic object pointed to by `obj`.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.7.3 The atomic_exchange generic functions (p: 207)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.7.3 The atomic_exchange generic functions (p: 283)

### See also

|  |  |
| --- | --- |
| atomic_compare_exchange_strong, atomic_compare_exchange_strong_explicit, atomic_compare_exchange_weak, atomic_compare_exchange_weak_explicit (C11) | swaps a value with an atomic object if the old value is what is expected, otherwise reads the old value (function) |
| C++ documentation for atomic_exchange, atomic_exchange_explicit |  |
