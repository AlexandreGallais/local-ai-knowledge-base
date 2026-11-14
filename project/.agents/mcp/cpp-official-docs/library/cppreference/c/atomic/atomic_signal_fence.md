# atomic_signal_fence

| Defined in header `<stdatomic.h>` |  |
| --- | --- |
| `void atomic_signal_fence( memory_order order );` | (since C11) |

Establishes memory synchronization ordering of non-atomic and relaxed atomic accesses, as instructed by `order`, between a thread and a signal handler executed on the same thread. This is equivalent to `atomic_thread_fence`, except no CPU instructions for memory ordering are issued. Only reordering of the instructions by the compiler is suppressed as `order` instructs. For example, a fence with release semantics prevents reads or writes from being moved past subsequent writes and a fence with acquire semantics prevents reads or writes from being moved ahead of preceding reads.

### Parameters

order - the memory ordering executed by this fence

### Return value

(none)

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.4.2 The atomic_signal_fence function (p: 204-205)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.4.2 The atomic_signal_fence function (p: 279)

### See also

|  |  |
| --- | --- |
| atomic_thread_fence (C11) | generic memory order-dependent fence synchronization primitive (function) |
| C++ documentation for atomic_signal_fence |  |
