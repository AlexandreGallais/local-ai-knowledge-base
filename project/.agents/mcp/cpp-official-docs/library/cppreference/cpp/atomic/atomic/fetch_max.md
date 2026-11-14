# std::atomic<T>::fetch_max

|  |  |  |
| --- | --- | --- |
| member only of `atomic<Integral` `>` specializations |  |  |
| `T fetch_max( T arg, std::memory_order order = std::memory_order_seq_cst ) noexcept;` | (1) | (since C++26) |
| `T fetch_max( T arg, std::memory_order order = std::memory_order_seq_cst ) volatile noexcept;` | (2) | (since C++26) |
| member only of `atomic<T*>` partial specialization |  |  |
| `T* fetch_max( T* arg, std::memory_order order = std::memory_order_seq_cst ) noexcept;` | (3) | (since C++26) |
| `T* fetch_max( T* arg, std::memory_order order = std::memory_order_seq_cst ) volatile noexcept;` | (4) | (since C++26) |

Atomically replaces the current value with the result of `std::max` of the value and `arg`. That is, it performs atomic maximum operation. The operation is a read-modify-write operation. Memory is affected according to the value of `order`.

3,4) If the pointers point to different complete objects (or subobjects thereof), pointer comparison does not establish a strict weak ordering.

It is deprecated if `std::atomic<T>::is_always_lock_free` is `false` and overload (2) or (4) participates in overload resolution.

### Parameters

|  |  |  |
| --- | --- | --- |
| arg | - | the other argument of `std::max` |
| order | - | memory order constraints to enforce |

### Return value

The value immediately preceding the effects of this function in the modification order of `*this`.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_atomic_min_max` | `202403L` | (C++26) | Atomic minimum/maximum |

### Example

This section is incomplete Reason: no example
