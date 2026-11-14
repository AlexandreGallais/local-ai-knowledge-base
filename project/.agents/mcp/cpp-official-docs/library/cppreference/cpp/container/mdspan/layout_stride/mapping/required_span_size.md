# std::layout_stride::mapping<Extents>::required_span_size

`constexpr index_type required_span_size() const noexcept;` (since C++23)

Returns the required size of the mapping.

Let `s` be equal to:

- `1`, if `extents().rank() == 0` is `true`,
- otherwise, `​0​`, if the size of the multidimensional index space `extents()` is `​0​`,
- otherwise, `1` plus the sum of products of `extents().extent(r) - 1` and `extents_type::index-cast(strides_[r])` for all `r` in the range `[``​0​``,``extents().rank()``)`.

A call is equivalent to `return s;`.

### Return value

The required size of the mapping.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| required_span_size | returns the required size of the mapping (public member function of `std::layout_left::mapping<Extents>`) |
| required_span_size | returns the required size of the mapping (public member function of `std::layout_right::mapping<Extents>`) |
| size | returns the size of the multidimensional index space (public member function of `std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>`) |
