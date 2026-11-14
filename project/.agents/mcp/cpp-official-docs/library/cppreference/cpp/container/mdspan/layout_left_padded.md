# std::layout_left_padded

| Defined in header `<mdspan>` |  |
| --- | --- |
| `template< std::size_t PaddingValue = std::dynamic_extent > struct layout_left_padded;` | (since C++26) |

Every specialization of `layout_left_padded` is a LayoutMappingPolicy which provides a layout mapping that is similar to `layout_left::mapping` except that it has a *padding stride*.

Every specialization of `layout_left_padded` is TriviallyCopyable, and `std::is_trivially_default_constructible_v<T>` is `true` for any such specialization `T`.

Let `m` be the instance of the mapping type `layout_left_padded::mapping`. The padding stride of the mapping is the second stride `m.stride(1)` which is guaranteed to be at least the first extent value `m.extent(0)`, called *extent to pad*.

### Nested class templates

mapping a layout mapping of `layout_left_padded` (public member class template)

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| layout_left (C++23) | column-major multidimensional array layout mapping policy; leftmost extent has stride `1` (class) |
| layout_stride (C++23) | a layout mapping policy with user-defined strides (class) |
