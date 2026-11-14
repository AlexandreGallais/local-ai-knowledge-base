# std::expected<T,E>::error

|  |  |  |
| --- | --- | --- |
| `constexpr const E& error() const& noexcept;` | (1) | (since C++23) |
| `constexpr E& error() & noexcept;` | (2) | (since C++23) |
| `constexpr const E&& error() const&& noexcept;` | (3) | (since C++23) |
| `constexpr E&& error() && noexcept;` | (4) | (since C++23) |

Accesses the unexpected value contained in `*this`.

If `has_value()` is `true`, the behavior is undefined.

### Return value

1,2) `unex`

3,4) `std::move(unex)`

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| error_or | returns the unexpected value if present, another value otherwise (public member function) |
| operator->, operator* | accesses the expected value (public member function) |
| value | returns the expected value (public member function) |
| operator bool, has_value | checks whether the object contains an expected value (public member function) |
