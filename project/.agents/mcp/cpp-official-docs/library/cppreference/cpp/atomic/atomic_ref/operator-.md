# std::atomic_ref<T>::operator=

|  |  |  |
| --- | --- | --- |
| `value_type operator=( value_type desired ) const noexcept;` | (1) | (constexpr since C++26) |
| `atomic_ref& operator=( const atomic_ref& ) = delete;` | (2) |  |

1) Equivalent to `store(desired); return desired;`. This overload participates in overload resolution only if `std::is_const_v<T>` is `false`.

2) `atomic_ref` is not CopyAssignable.

### Parameters

desired - value to assign

### Return value

As described above.

### Notes

Unlike most assignment operators, the assignment operator for `atomic_ref` does not return a reference to its left-hand argument. It returns a copy of the stored value instead.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3508 (P3323R1) | C++20 | assignment operator was meaningless for `const T` | constrained to accept only non-const `T` |

### See also

|  |  |
| --- | --- |
| (constructor) | constructs an `atomic_ref` object (public member function) |
| store | atomically replaces the value of the referenced object with a non-atomic argument (public member function) |
