# std::atomic_ref<T>::operator&=,|=,^=

|  |  |  |
| --- | --- | --- |
| Provided only when `T` is an integral type other than *cv* `bool` |  |  |
| `value_type operator&=( value_type arg ) const noexcept;` | (1) | (since C++20) |
| `value_type operator\|=( value_type arg ) const noexcept;` | (2) | (since C++20) |
| `value_type operator^=( value_type arg ) const noexcept;` | (3) | (since C++20) |

Atomically replaces the current value of the referenced object with the result of computation involving the previous value and `arg`. These operations are read-modify-write operations.

- `operator&=` performs atomic bitwise AND. Equivalent to `return fetch_and(arg) & arg;`.
- `operator!=` performs atomic bitwise OR. Equivalent to `return fetch_or(arg) | arg;`.
- `operator^=` performs atomic bitwise XOR. Equivalent to `return fetch_xor(arg) ^ arg;`.

These overloads participate in overload resolution only if `std::is_const_v<T>` is `false`.

### Parameters

arg - the argument for the arithmetic operation

### Return value

The resulting value (that is, the result of applying the corresponding binary operator to the value immediately preceding the effects of the corresponding member function).

### Notes

Unlike most compound assignment operators, the compound assignment operators for `atomic_ref` do not return a reference to their left-hand arguments. They return a copy of the stored value instead.

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3508 (P3323R1) | C++20 | compound assignment operators were meaningless for `const T` | constrained to accept only non-const `T` |

### See also

|  |  |
| --- | --- |
| fetch_and | atomically performs bitwise AND between the argument and the value of the referenced object and obtains the value held previously (public member function) |
| fetch_or | atomically performs bitwise OR between the argument and the value of the referenced object and obtains the value held previously (public member function) |
| fetch_xor | atomically performs bitwise XOR between the argument and the value of the referenced object and obtains the value held previously (public member function) |
| operator++, operator++(int), operator--, operator--(int) | atomically increments or decrements the referenced object by one (public member function) |
| operator+=, operator-= | atomically adds to or subtracts from the referenced value (public member function) |
