# std::atomic_ref<T>::store

`void store( value_type desired, std::memory_order order = std::memory_order_seq_cst ) const noexcept;` (constexpr since C++26)

Atomically replaces the current value of the referenced object with `desired`. Memory is affected according to the value of `order`.

This overload participates in overload resolution only if `std::is_const_v<T>` is `false`.

If `order` is not `std::memory_order_relaxed`, `std::memory_order_release` or `std::memory_order_seq_cst`, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| desired | - | the value to store into the referenced object |
| order | - | memory order constraints to enforce |

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3508 (P3323R1) | C++20 | `store` was meaningless for `const T` | constrained to accept only non-const `T` |

### See also

operator= stores a value into the object referenced by an `atomic_ref` object (public member function)
