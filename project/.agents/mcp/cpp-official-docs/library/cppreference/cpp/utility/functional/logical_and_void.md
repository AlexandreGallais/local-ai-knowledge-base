# std::logical_and<void>

| Defined in header `<functional>` |  |
| --- | --- |
| `template<> class logical_and<void>;` | (since C++14) |

`std::logical_and<void>` is a specialization of `std::logical_and` with parameter and return type deduced.

### Nested types

| Nested type | Definition |
| --- | --- |
| `is_transparent` | unspecified |

### Member functions

**operator()** applies `operator&&` to `lhs` and `rhs` (public member function)

## std::logical_and<void>::operator()

`template< class T, class U > constexpr auto operator()( T&& lhs, U&& rhs ) const -> decltype(std::forward<T>(lhs) && std::forward<U>(rhs));`

Returns the result of `lhs && rhs`.

### Parameters

lhs, rhs - values to logical AND

### Return value

The result of `lhs && rhs`.

### Example

This section is incomplete Reason: no example
