# std::experimental::atomic_weak_ptr<T>::load

`weak_ptr<T> load( std::memory_order order = std::memory_order_seq_cst ) const noexcept;`

Atomically loads and returns the current value of the `atomic_weak_ptr`. Memory is affected according to the value of `order`.

`order` must be one of `std::memory_order_relaxed`, `std::memory_order_consume`, `std::memory_order_acquire` or `std::memory_order_seq_cst`. Otherwise the behavior is undefined.

### Parameters

order - memory order constraints to enforce

### Remarks

All associated `use_count` increments are guaranteed to be performed as part of the atomic operation.

### Return value

The current value of the `atomic_weak_ptr`.

### See also

|  |  |
| --- | --- |
| operator weak_ptr<T> | loads a value from an atomic object (public member function) |
| std::atomic_is_lock_free(std::shared_ptr), std::atomic_load(std::shared_ptr), std::atomic_load_explicit(std::shared_ptr), std::atomic_store(std::shared_ptr), std::atomic_store_explicit(std::shared_ptr), std::atomic_exchange(std::shared_ptr), std::atomic_exchange_explicit(std::shared_ptr), std::atomic_compare_exchange_weak(std::shared_ptr), std::atomic_compare_exchange_strong(std::shared_ptr), std::atomic_compare_exchange_weak_explicit(std::shared_ptr), std::atomic_compare_exchange_strong_explicit(std::shared_ptr) (deprecated in C++20), (removed in C++26) | specializes atomic operations for `std::shared_ptr` (function template) |
