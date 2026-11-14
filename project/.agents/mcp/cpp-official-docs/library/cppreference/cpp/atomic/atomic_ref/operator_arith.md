# std::atomic_ref<T>::operator++,++(int),--,--(int)

|  |  |  |
| --- | --- | --- |
| Provided only when `T` is an integral type other than *cv* `bool` or a pointer-to-object type |  |  |
| `value_type operator++() const noexcept;` | (1) | (since C++20) |
| `value_type operator++( int ) const noexcept;` | (2) | (since C++20) |
| `value_type operator--() const noexcept;` | (3) | (since C++20) |
| `value_type operator--( int ) const noexcept;` | (4) | (since C++20) |

Atomically increments or decrements the current value of the referenced object. These operations are read-modify-write operations.

1) Performs atomic pre-increment. Equivalent to `return fetch_add(1) + 1;`.

2) Performs atomic post-increment. Equivalent to `return fetch_add(1);`.

3) Performs atomic pre-decrement. Equivalent to `return fetch_sub(1) - 1;`

4) Performs atomic post-decrement. Equivalent to `return fetch_sub(1);`.

- For signed integral types, arithmetic is defined to use two’s complement representation. There are no undefined results.
- For pointer-to-object types, the result may be an undefined address, but the operations otherwise have no undefined behavior. The program is ill-formed if `std::remove_pointer_t<T>` is not a complete object type.

These overloads participate in overload resolution only if `std::is_const_v<T>` is `false`.

### Return value

1,3) The value of the referenced object after the modification.

2,4) The value of the referenced object before the modification.

### Notes

Unlike most pre-increment and pre-decrement operators, the pre-increment and pre-decrement operators for `atomic_ref` do not return a reference to the modified object. They return a copy of the stored value instead.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3508 (P3323R1) | C++20 | increment and decrement operators were meaningless for `const T` | constrained to accept only non-const `T` |

### See also

|  |  |
| --- | --- |
| fetch_add | atomically adds the argument to the value stored in the referenced object and obtains the value held previously (public member function) |
| fetch_sub | atomically subtracts the argument from the value stored in the referenced object and obtains the value held previously (public member function) |
| operator+=, operator-= | atomically adds to or subtracts from the referenced value (public member function) |
| operator&=, operator\|=, operator^= | atomically performs bitwise AND, OR, XOR with the referenced value (public member function) |
