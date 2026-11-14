# std::atomic_ref<T>::fetch_max

|  |  |
| --- | --- |
| Provided only when `T` is an integral type other than *cv* `bool` or a pointer-to-object type |  |
| `value_type fetch_max( value_type arg, std::memory_order order = std::memory_order_seq_cst ) const noexcept;` | (since C++26) |

Atomically replaces the current value of the referenced object with the result of `std::max` of the value and `arg`. That is, it performs atomic maximum operation. The operation is a read-modify-write operation. Memory is affected according to the value of `order`.

If `T` is a pointer type and the pointers point to different complete objects (or subobjects thereof), pointer comparison does not establish a strict weak ordering.

This overload participates in overload resolution only if `std::is_const_v<T>` is `false`.

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
