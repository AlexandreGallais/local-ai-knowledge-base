# atomic_load, atomic_load_explicit

| Defined in header `<stdatomic.h>` |  |  |
| --- | --- | --- |
| `C atomic_load( const volatile A* obj );` | (1) | (since C11) |
| `C atomic_load_explicit( const volatile A* obj, memory_order order );` | (2) | (since C11) |

Atomically loads and returns the current value of the atomic variable pointed to by `obj`. The operation is atomic read operation.

The first version orders memory accesses according to `memory_order_seq_cst`, the second version orders memory accesses according to `order`. `order` must be one of `memory_order_relaxed`, `memory_order_consume`, `memory_order_acquire` or `memory_order_seq_cst`. Otherwise the behavior is undefined.

This is a generic function defined for all atomic object types `A`. The argument is pointer to a volatile atomic type to accept addresses of both non-volatile and volatile (e.g. memory-mapped I/O) atomic objects, and volatile semantic is preserved when applying this operation to volatile atomic objects. `C` is the non-atomic type corresponding to `A`.

It is unspecified whether the name of a generic function is a macro or an identifier declared with external linkage. If a macro definition is suppressed in order to access an actual function (e.g. parenthesized like `(atomic_load)(...)`), or a program defines an external identifier with the name of a generic function, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| obj | - | pointer to the atomic object to access |
| order | - | the memory synchronization ordering for this operation |

### Return value

The current value of the atomic variable pointed to by `obj`.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.7.2 The atomic_load generic functions (p: 206)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.7.2 The atomic_load generic functions (p: 282)

### See also

|  |  |
| --- | --- |
| atomic_store, atomic_store_explicit (C11) | stores a value in an atomic object (function) |
| C++ documentation for atomic_load, atomic_load_explicit |  |
