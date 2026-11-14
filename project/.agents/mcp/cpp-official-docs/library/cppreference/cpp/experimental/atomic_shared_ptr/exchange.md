# std::experimental::atomic_shared_ptr<T>::exchange

`shared_ptr<T> exchange( shared_ptr<T> desired, std::memory_order order = std::memory_order_seq_cst ) noexcept;`

Atomically replaces the underlying `shared_ptr` with `desired`. The operation is a read-modify-write operation. Memory is affected according to the value of `order`.

### Parameters

|  |  |  |
| --- | --- | --- |
| desired | - | value to assign |
| order | - | memory order constraints to enforce |

### Return value

The value of the atomic variable before the call.

### Remarks

All changes to the `atomic_shared_ptr` object itself, and all associated `use_count` increments, are guaranteed to be performed atomically. Associated `use_count` decrements take place after the atomic operation, but are not required to be part of it. Any associated destruction or deallocation operations take place after the atomic operation and are not part of it.

### See also

std::atomic_is_lock_free(std::shared_ptr), std::atomic_load(std::shared_ptr), std::atomic_load_explicit(std::shared_ptr), std::atomic_store(std::shared_ptr), std::atomic_store_explicit(std::shared_ptr), std::atomic_exchange(std::shared_ptr), std::atomic_exchange_explicit(std::shared_ptr), std::atomic_compare_exchange_weak(std::shared_ptr), std::atomic_compare_exchange_strong(std::shared_ptr), std::atomic_compare_exchange_weak_explicit(std::shared_ptr), std::atomic_compare_exchange_strong_explicit(std::shared_ptr) (deprecated in C++20), (removed in C++26) specializes atomic operations for `std::shared_ptr` (function template)
