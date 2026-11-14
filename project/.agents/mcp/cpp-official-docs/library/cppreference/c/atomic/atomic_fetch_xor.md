# atomic_fetch_xor, atomic_fetch_xor_explicit

| Defined in header `<stdatomic.h>` |  |  |
| --- | --- | --- |
| `C atomic_fetch_xor( volatile A* obj, M arg );` | (1) | (since C11) |
| `C atomic_fetch_xor_explicit( volatile A* obj, M arg, memory_order order );` | (2) | (since C11) |

Atomically replaces the value pointed by `obj` with the result of bitwise XOR between the old value of `obj` and `arg`, and returns the value `obj` held previously. The operation is read-modify-write operation. The first version orders memory accesses according to `memory_order_seq_cst`, the second version orders memory accesses according to `order`.

This is a generic function defined for all atomic object types `A`. The argument is pointer to a volatile atomic type to accept addresses of both non-volatile and volatile (e.g. memory-mapped I/O) atomic objects, and volatile semantic is preserved when applying this operation to volatile atomic objects. `M` is either the non-atomic type corresponding to `A` if `A` is atomic integer type, or `ptrdiff_t` if `A` is atomic pointer type.

It is unspecified whether the name of a generic function is a macro or an identifier declared with external linkage. If a macro definition is suppressed in order to access an actual function (e.g. parenthesized like `(atomic_fetch_xor)(...)`), or a program defines an external identifier with the name of a generic function, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| obj | - | pointer to the atomic object to modify |
| arg | - | the value to bitwise XOR to the value stored in the atomic object |
| order | - | the memory synchronization ordering for this operation: all values are permitted |

### Return value

The value held previously be the atomic object pointed to by `obj`.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.7.5 The atomic_fetch and modify generic functions (p: 208)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.7.5 The atomic_fetch and modify generic functions (p: 284-285)

### See also

|  |  |
| --- | --- |
| atomic_fetch_or, atomic_fetch_or_explicit (C11) | atomic bitwise OR (function) |
| atomic_fetch_and, atomic_fetch_and_explicit (C11) | atomic bitwise AND (function) |
| C++ documentation for atomic_fetch_xor, atomic_fetch_xor_explicit |  |
