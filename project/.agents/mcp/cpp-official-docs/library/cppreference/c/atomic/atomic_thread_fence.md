# atomic_thread_fence

| Defined in header `<stdatomic.h>` |  |
| --- | --- |
| `void atomic_thread_fence( memory_order order );` | (since C11) |

Establishes memory synchronization ordering of non-atomic and relaxed atomic accesses, as instructed by `order`, without an associated atomic operation. For example, all non-atomic and relaxed atomic stores that happen before a `memory_order_release` fence in thread A will be synchronized with non-atomic and relaxed atomic loads from the same locations made in thread B after an `memory_order_acquire` fence.

### Parameters

order - the memory ordering executed by this fence

### Return value

(none)

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.4.1 The atomic_thread_fence function (p: 204)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.4.1 The atomic_thread_fence function (p: 278-279)

### See also

|  |  |
| --- | --- |
| atomic_signal_fence (C11) | fence between a thread and a signal handler executed in the same thread (function) |
| C++ documentation for atomic_thread_fence |  |
