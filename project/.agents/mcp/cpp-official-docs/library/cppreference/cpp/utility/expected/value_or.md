# std::expected<T,E>::value_or

|  |  |  |
| --- | --- | --- |
| Primary template |  |  |
| `template< class U > constexpr T value_or( U&& default_value ) const&;` | (1) | (since C++23) |
| `template< class U > constexpr T value_or( U&& default_value ) &&;` | (2) | (since C++23) |

Returns the expected value if it exists, otherwise returns `default_value`.

The `void` partial specialization does not have these member functions.

1) If `std::is_copy_constructible_v<T>` or `std::is_convertible_v<U, T>` is `false`, the program is ill-formed.

2) If `std::is_move_constructible_v<T>` or `std::is_convertible_v<U, T>` is `false`, the program is ill-formed.

### Parameters

default_value - the value to use in case `*this` does not contain an expected value

### Return value

1) `has_value() ? **this : static_cast<T>(std::forward<U>(default_value))`

2) `has_value() ? std::move(**this) : static_cast<T>(std::forward<U>(default_value))`

### Example

This section is incomplete Reason: no example

### See also

value returns the expected value (public member function)
