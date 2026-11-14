# std::atomic_ref<T>::fetch_xor

|  |  |
| --- | --- |
| Provided only when `T` is an integral type other than *cv* `bool` |  |
| `value_type fetch_xor( value_type arg, std::memory_order order = std::memory_order_seq_cst ) const noexcept;` | (since C++20) |

Atomically replaces the current value of the referenced object with the result of bitwise XOR of the value and `arg`. This operation is a read-modify-write operation. Memory is affected according to the value of `order`.

This overload participates in overload resolution only if `std::is_const_v<T>` is `false`.

### Parameters

|  |  |  |
| --- | --- | --- |
| arg | - | the other argument of bitwise XOR |
| order | - | memory order constraints to enforce |

### Return value

The value of the referenced object, immediately preceding the effects of this function.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3508 (P3323R1) | C++20 | `fetch_xor` was meaningless for `const T` | constrained to accept only non-const `T` |
