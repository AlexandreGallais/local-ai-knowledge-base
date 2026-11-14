# std::experimental::atomic_shared_ptr<T>::is_lock_free

`bool is_lock_free() const noexcept;`

Checks whether the atomic operations on all objects of this type are lock-free.

### Parameters

(none)

### Return value

`true` if the atomic operations on the objects of this type are lock-free, `false` otherwise.

### See also

std::atomic_is_lock_free(std::shared_ptr), std::atomic_load(std::shared_ptr), std::atomic_load_explicit(std::shared_ptr), std::atomic_store(std::shared_ptr), std::atomic_store_explicit(std::shared_ptr), std::atomic_exchange(std::shared_ptr), std::atomic_exchange_explicit(std::shared_ptr), std::atomic_compare_exchange_weak(std::shared_ptr), std::atomic_compare_exchange_strong(std::shared_ptr), std::atomic_compare_exchange_weak_explicit(std::shared_ptr), std::atomic_compare_exchange_strong_explicit(std::shared_ptr) (deprecated in C++20), (removed in C++26) specializes atomic operations for `std::shared_ptr` (function template)
