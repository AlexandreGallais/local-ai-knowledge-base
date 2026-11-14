# std::layout_stride::mapping<Extents>::strides

`constexpr std::array<index_type, rank_> strides() const noexcept;` (since C++23)

Returns an array of strides of the mapping. Equivalent to `return strides_;`.

### Parameters

(none)

### Return value

Array of strides

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| stride | obtains the stride along the specified dimension (public member function) |
| stride | obtains the stride along the specified dimension (public member function of `std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>`) |
