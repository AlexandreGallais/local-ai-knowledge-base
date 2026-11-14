# std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>::static_extent

`static constexpr std::size_t static_extent( rank_type r ) noexcept;` (since C++23)

Statically determines the extent of a `mdspan` at the rank index `r`. If the rank index `r` corresponds to a dynamic extent, returns `std::dynamic_extent`. Equivalent to `return Extents::static_extent(r);`.

### Parameters

r - The rank index to get the static extent size of

### Return value

The static extent size, or `std::dynamic_extent`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| static_extent [static] | returns static extent size of an `extents` at a certain rank index (public static member function of `std::extents<IndexType,Extents...>`) |
| extent | returns the extent of a `mdspan` at a given rank index (public member function) |
