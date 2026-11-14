# std::atomic_ref<T>::fetch_and

|  |  |
| --- | --- |
| Provided only when `T` is an integral type other than *cv* `bool` |  |
| `value_type fetch_and( value_type arg, std::memory_order order = std::memory_order_seq_cst ) const noexcept;` | (since C++20) |

Atomically replaces the current value of the referenced object with the result of bitwise AND of the value and `arg`. This operation is a read-modify-write operation. Memory is affected according to the value of `order`.

This overload participates in overload resolution only if `std::is_const_v<T>` is `false`.

### Parameters

|  |  |  |
| --- | --- | --- |
| arg | - | the other argument of bitwise AND |
| order | - | memory order constraints to enforce |

### Return value

The value of the referenced object, immediately preceding the effects of this function.

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3508 (P3323R1) | C++20 | `fetch_and` was meaningless for `const T` | constrained to accept only non-const `T` |
