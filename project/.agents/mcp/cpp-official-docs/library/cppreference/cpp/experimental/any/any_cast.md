# std::experimental::any_cast

|  |  |  |
| --- | --- | --- |
| `template<class ValueType> ValueType any_cast(const any& operand);` | (1) | (library fundamentals TS) |
| `template<class ValueType> ValueType any_cast(any& operand);` | (2) | (library fundamentals TS) |
| `template<class ValueType> ValueType any_cast(any&& operand);` | (3) | (library fundamentals TS) |
| `template<class ValueType> const ValueType* any_cast(const any* operand) noexcept;` | (4) | (library fundamentals TS) |
| `template<class ValueType> ValueType* any_cast(any* operand) noexcept;` | (5) | (library fundamentals TS) |

Performs type-safe access to the contained object.

For (1-3), the program is ill-formed if `ValueType` is not a reference and `std::is_copy_constructible<ValueType>::value` is `false`.

### Parameters

operand - target `any` object

### Return value

1) Returns `*any_cast<std::add_const_t<std::remove_reference_t<ValueType>>>(&operand)`.

2,3) Returns `*any_cast<std::remove_reference_t<ValueType>>(&operand)`.

4,5) If `operand` is not a null pointer, and the `typeid` of the requested `ValueType` matches that of the contents of `operand`, a pointer to the value contained by `operand`, otherwise a null pointer.

### Exceptions

1-3) Throws `bad_any_cast` if the `typeid` of the requested `ValueType` does not match that of the contents of `operand`.
