# std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>::operator=

| Defined in header `<mdspan>` |  |  |
| --- | --- | --- |
| `constexpr mdspan& operator=( const mdspan& rhs ) = default;` | (1) | (since C++23) |
| `constexpr mdspan& operator=( mdspan&& rhs ) = default;` | (2) | (since C++23) |

Assigns `rhs` to `*this` with

1) defaulted copy assignment operator,

2) defaulted move assignment operator.

### Parameters

other - another mdspan to copy or move from

### Return value

`*this`

### Example

This section is incomplete Reason: no example

### See also

This section is incomplete
