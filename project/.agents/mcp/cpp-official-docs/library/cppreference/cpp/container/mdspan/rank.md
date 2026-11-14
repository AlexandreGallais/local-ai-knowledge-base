# std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>::rank

`static constexpr rank_type rank() noexcept;` (since C++23)

Returns the number of dimensions in a `mdspan`. Equivalent to `return Extents::rank()`.

### Parameters

(none)

### Return value

The number of dimensions.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| rank [static] | returns the static rank of an `extents` (public static member function of `std::extents<IndexType,Extents...>`) |
| rank_dynamic [static] | returns the dynamic rank of a `mdspan` (public static member function) |
