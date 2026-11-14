# std::expected<T,E>::error_or

|  |  |  |
| --- | --- | --- |
| `template< class G = E > constexpr E error_or( G&& default_value ) const&;` | (1) | (since C++23) |
| `template< class G = E > constexpr E error_or( G&& default_value ) &&;` | (2) | (since C++23) |

Returns the unexpected value if it exists, otherwise returns `default_value`.

1) If `std::is_copy_constructible_v<E>` or `std::is_convertible_v<G, E>` is `false`, the program is ill-formed.

2) If `std::is_move_constructible_v<E>` or `std::is_convertible_v<G, E>` is `false`, the program is ill-formed.

### Parameters

|  |  |  |
| --- | --- | --- |
| default_value | - | the value to use in case `*this` does not contain an unexpected value |
| Type requirements |  |  |

### Return value

1) `has_value() ? std::forward<G>(default_value) : error()`

2) `has_value() ? std::forward<G>(default_value) : std::move(error())`

### Example

This section is incomplete Reason: no example

### See also

error returns the unexpected value (public member function)
