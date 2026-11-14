# std::ranges::enumerate_view<V>::base

|  |  |  |
| --- | --- | --- |
| `constexpr V base() const& requires std::copy_constructible<V>;` | (1) | (since C++23) |
| `constexpr V base() &&;` | (2) | (since C++23) |

Returns a copy of the underlying view.

1) Copy constructs the result from the underlying view. Equivalent to `return base_;`

2) Move constructs the result from the underlying view. Equivalent to `return std::move(base_);`

### Parameters

(none)

### Return value

A copy of the underlying view.

### Example

This section is incomplete Reason: no example
