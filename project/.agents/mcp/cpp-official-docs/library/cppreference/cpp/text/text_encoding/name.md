# std::text_encoding::name

`constexpr const char* name() const noexcept;` (since C++26)

Returns the primary name of `*this`. Equivalent to `return name_;`.

Accessing elements of `name_` outside of the range `[``name()``,``name() + std::strlen(name()) + 1``)` is undefined behavior.

### Parameters

(none)

### Return value

Primary name `name_` that is represented by a null-terminated byte string.

### Example

This section is incomplete Reason: no example
