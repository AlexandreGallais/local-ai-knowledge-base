# atomic_compare_exchange_weak, atomic_compare_exchange_strong, atomic_compare_exchange_weak_explicit, atomic_compare_exchange_strong_explicit

| Defined in header `<stdatomic.h>` |  |  |
| --- | --- | --- |
| `_Bool atomic_compare_exchange_strong( volatile A* obj, C* expected, C desired );` | (1) | (since C11) |
| `_Bool atomic_compare_exchange_weak( volatile A *obj, C* expected, C desired );` | (2) | (since C11) |
| `_Bool atomic_compare_exchange_strong_explicit( volatile A* obj, C* expected, C desired, memory_order succ, memory_order fail );` | (3) | (since C11) |
| `_Bool atomic_compare_exchange_weak_explicit( volatile A *obj, C* expected, C desired, memory_order succ, memory_order fail );` | (4) | (since C11) |

Atomically compares the contents of memory pointed to by `obj` with the contents of memory pointed to by `expected`, and if those are bitwise equal, replaces the former with `desired` (performs read-modify-write operation). Otherwise, loads the actual contents of memory pointed to by `obj` into `*expected` (performs load operation).

The memory models for the read-modify-write and load operations are `succ` and `fail` respectively. The (1-2) versions use `memory_order_seq_cst` by default.

The weak forms ((2) and (4)) of the functions are allowed to fail spuriously, that is, act as if `*obj != *expected` even if they are equal. When a compare-and-exchange is in a loop, the weak version will yield better performance on some platforms. When a weak compare-and-exchange would require a loop and a strong one would not, the strong one is preferable.

This is a generic function defined for all atomic object types `A`. The argument is pointer to a volatile atomic type to accept addresses of both non-volatile and volatile (e.g. memory-mapped I/O) atomic objects, and volatile semantic is preserved when applying this operation to volatile atomic objects. `C` is the non-atomic type corresponding to `A`.

It is unspecified whether the name of a generic function is a macro or an identifier declared with external linkage. If a macro definition is suppressed in order to access an actual function (e.g. parenthesized like `(atomic_compare_exchange)(...)`), or a program defines an external identifier with the name of a generic function, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| obj | - | pointer to the atomic object to test and modify |
| expected | - | pointer to the value expected to be found in the atomic object |
| desired | - | the value to store in the atomic object if it is as expected |
| succ | - | the memory synchronization ordering for the read-modify-write operation if the comparison succeeds. All values are permitted. |
| fail | - | the memory synchronization ordering for the load operation if the comparison fails. Cannot be `memory_order_release` or `memory_order_acq_rel` and cannot specify stronger ordering than `succ` |

### Return value

The result of the comparison: `true` if `*obj` was equal to `*exp`, `false` otherwise.

### Notes

The behavior of `atomic_compare_exchange_*` family is as if the following was executed atomically:

```c
if (memcmp(obj, expected, sizeof *obj) == 0) {
    memcpy(obj, &desired, sizeof *obj);
    return true;
} else {
    memcpy(expected, obj, sizeof *obj);
    return false;
}
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.7.4 The atomic_compare_exchange generic functions (p: 207)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.7.4 The atomic_compare_exchange generic functions (p: 283-284)

### See also

|  |  |
| --- | --- |
| atomic_exchange, atomic_exchange_explicit (C11) | swaps a value with the value of an atomic object (function) |
| C++ documentation for atomic_compare_exchange_weak, atomic_compare_exchange_strong, atomic_compare_exchange_weak_explicit, atomic_compare_exchange_strong_explicit |  |
