# std::expected<T,E>::~expected

`constexpr ~expected();` (since C++23)

### Main template destructor

Destroys the contained value:

- If `has_value()` is `true`, destroys the expected value.
- Otherwise, destroys the unexpected value.

This destructor is trivial if `std::is_trivially_destructible_v<T>` and `std::is_trivially_destructible_v<E>` are both `true`.

### `void` partial specialization destructor

If `has_value()` is `false`, destroys the unexpected value.

This destructor is trivial if `std::is_trivially_destructible_v<E>` is `true`.

### Example

This section is incomplete Reason: no example
