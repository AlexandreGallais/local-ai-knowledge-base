# std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>::extent

`constexpr index_type extent( rank_type r ) const noexcept;` (since C++23)

Returns the extent of a `mdspan` at the rank index `r`. Equivalent to `return extents().extent(r);`.

### Parameters

r - The rank index to get the extent size of

### Return value

The extent at the given rank index.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| extent | returns dynamic extent size of an `extents` at a certain rank index (public member function of `std::extents<IndexType,Extents...>`) |
| static_extent [static] | returns the static extent size of a `mdspan` at a given rank index (public static member function) |
