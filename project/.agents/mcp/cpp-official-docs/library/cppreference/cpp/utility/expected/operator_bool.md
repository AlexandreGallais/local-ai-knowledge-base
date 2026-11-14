# std::expected<T,E>::operator bool, std::expected<T,E>::has_value

|  |  |  |
| --- | --- | --- |
| `constexpr explicit operator bool() const noexcept;` | (1) | (since C++23) |
| `constexpr bool has_value() const noexcept;` | (2) | (since C++23) |

Checks whether `*this` represents an expected value.

### Return value

`has_val`

### Notes

A `std::expected` object is never valueless. If `has_value()` returns `true`, `operator*()` can be used to access the expected value; otherwise, `error()` can be used to access the unexpected value.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| operator->, operator* | accesses the expected value (public member function) |
| error | returns the unexpected value (public member function) |
