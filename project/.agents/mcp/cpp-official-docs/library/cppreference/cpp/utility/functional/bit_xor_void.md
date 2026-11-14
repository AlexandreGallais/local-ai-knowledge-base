# std::bit_xor<void>

| Defined in header `<functional>` |  |
| --- | --- |
| `template<> class bit_xor<void>;` | (since C++14) |

`std::bit_xor<void>` is a specialization of `std::bit_xor` with parameter and return type deduced.

### Nested types

| Nested type | Definition |
| --- | --- |
| `is_transparent` | unspecified |

### Member functions

**operator()** applies `operator^` to `lhs` and `rhs` (public member function)

## std::bit_xor<void>::operator()

`template< class T, class U > constexpr auto operator()( T&& lhs, U&& rhs ) const -> decltype(std::forward<T>(lhs) ^ std::forward<U>(rhs));`

Returns the result of `std::forward<T>(lhs) ^ std::forward<U>(rhs)`.

### Parameters

lhs, rhs - values to bitwise XOR

### Return value

`std::forward<T>(lhs) ^ std::forward<U>(rhs)`.

### Example

This section is incomplete Reason: no example
