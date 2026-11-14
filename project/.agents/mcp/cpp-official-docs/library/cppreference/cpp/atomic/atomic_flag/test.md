# std::atomic_flag::test

|  |  |  |
| --- | --- | --- |
| `bool test( std::memory_order order = std::memory_order_seq_cst ) const volatile noexcept;` | (1) | (since C++20) |
| `bool test( std::memory_order order = std::memory_order_seq_cst ) const noexcept;` | (2) | (since C++20) |

Atomically reads the value of the `*this` and returns the value.

If `order` is one of `std::memory_order_release` and `std::memory_order_acq_rel`, the behavior is undefined.

### Parameters

order - the memory synchronization ordering

### Return value

The value atomically read.

### Example

This section is incomplete Reason: no example

### See also

atomic_flag_test, atomic_flag_test_explicit (C++20), (C++20) atomically returns the value of the flag (function)
