# atomic_store, atomic_store_explicit

| Defined in header `<stdatomic.h>` |  |  |
| --- | --- | --- |
| `void atomic_store( volatile A* obj , C desired );` | (1) | (since C11) |
| `void atomic_store_explicit( volatile A* obj, C desired, memory_order order );` | (2) | (since C11) |

Atomically replaces the value of the atomic variable pointed to by `obj` with `desired`. The operation is atomic write operation.

The first version orders memory accesses according to `memory_order_seq_cst`, the second version orders memory accesses according to `order`. `order` must be one of `memory_order_relaxed`, `memory_order_release` or `memory_order_seq_cst`. Otherwise the behavior is undefined.

This is a generic function defined for all atomic object types `A`. The argument is pointer to a volatile atomic type to accept addresses of both non-volatile and volatile (e.g. memory-mapped I/O) atomic objects, and volatile semantic is preserved when applying this operation to volatile atomic objects. `C` is the non-atomic type corresponding to `A`.

It is unspecified whether the name of a generic function is a macro or an identifier declared with external linkage. If a macro definition is suppressed in order to access an actual function (e.g. parenthesized like `(atomic_store)(...)`), or a program defines an external identifier with the name of a generic function, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| obj | - | pointer to the atomic object to modify |
| order | - | the memory synchronization ordering for this operation |

### Return value

(none)

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.7.1 The atomic_store generic functions (p: 206)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.7.1 The atomic_store generic functions (p: 282)

### See also

|  |  |
| --- | --- |
| atomic_load, atomic_load_explicit (C11) | reads a value from an atomic object (function) |
| C++ documentation for atomic_store, atomic_store_explicit |  |
