# std::atomic_ref<T>::exchange

`value_type exchange( value_type desired, std::memory_order order = std::memory_order_seq_cst ) const noexcept;` (constexpr since C++26)

Atomically replaces the value of the referenced object with `desired`. The operation is a read-modify-write operation. Memory is affected according to the value of `order`.

This overload participates in overload resolution only if `std::is_const_v<T>` is `false`.

### Parameters

|  |  |  |
| --- | --- | --- |
| desired | - | value to assign |
| order | - | memory order constraints to enforce |

### Return value

The value of the referenced object before the call.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3508 (P3323R1) | C++20 | `exchange` was meaningless for `const T` | constrained to accept only non-const `T` |
