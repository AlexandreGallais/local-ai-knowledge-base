# std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>::rank_dynamic

`static constexpr rank_type rank_dynamic() noexcept;` (since C++23)

Returns the number of dynamic dimensions in a `mdspan`. Equivalent to `return Extents::rank_dynamic()`.

### Parameters

(none)

### Return value

The number of dynamic dimensions.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| rank_dynamic [static] | returns the dynamic rank of an `extents` (public static member function of `std::extents<IndexType,Extents...>`) |
| rank [static] | returns the rank of a `mdspan` (public static member function) |
