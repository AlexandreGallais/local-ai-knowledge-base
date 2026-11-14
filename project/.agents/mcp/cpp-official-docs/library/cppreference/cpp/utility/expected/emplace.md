# std::expected<T,E>::emplace

|  |  |  |
| --- | --- | --- |
| Primary template |  |  |
| `template< class... Args > constexpr T& emplace( Args&&... args ) noexcept;` | (1) | (since C++23) |
| `template< class U, class... Args > constexpr T& emplace( std::initializer_list<U> il, Args&&... args ) noexcept;` | (2) | (since C++23) |
| `void` partial specialization |  |  |
| `constexpr void emplace() noexcept;` | (3) | (since C++23) |

Constructs an expected value in-place. After the call, `has_value()` returns true.

1) Destroys the contained value, then direct-initializes the expected value contained in `*this` with `std::forward<Args>(args)...`.

This overload participates in overload resolution only if `std::is_nothrow_constructible_v<T, Args...>` is `true`.

2) Destroys the contained value, then direct-initializes the expected value contained in `*this` with `il` and `std::forward<Args>(args)...`.

This overload participates in overload resolution only if `std::is_nothrow_constructible_v<T, std::initializer_list<U>&, Args...>` is `true`.

3) If `*this` contains an unexpected value, destroys that value.

### Parameters

|  |  |  |
| --- | --- | --- |
| args | - | the arguments to pass to the constructor |
| il | - | the initializer list to pass to the constructor |

### Return value

1) `*std::construct_at(std::addressof(val), std::forward<Args>(args)...)`

2) `*std::construct_at(std::addressof(val), il, std::forward<Args>(args)...)`

### Notes

If the construction of `T` is potentially-throwing, `operator=` can be used instead.

### Example

This section is incomplete Reason: no example

### See also

operator= assigns contents (public member function)
