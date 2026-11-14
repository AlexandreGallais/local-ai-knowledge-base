# std::atomic_ref<T>::load

`value_type load( std::memory_order order = std::memory_order_seq_cst ) const noexcept;` (constexpr since C++26)

Atomically loads and returns the current value of the referenced object. Memory is affected according to the value of `order`.

If `order` is not `std::memory_order_relaxed`, `std::memory_order_consume`, `std::memory_order_acquire` or `std::memory_order_seq_cst`, the behavior is undefined.

### Parameters

order - memory order constraints to enforce

### Return value

The current value of the referenced object.

### See also

operator value_type loads a value from the referenced object (public member function)
