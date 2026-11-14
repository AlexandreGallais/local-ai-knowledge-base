# std::layout_right_padded

| Defined in header `<mdspan>` |  |
| --- | --- |
| `template< std::size_t PaddingValue = std::dynamic_extent > struct layout_right_padded;` | (since C++26) |

Every specialization of `layout_right_padded` is a LayoutMappingPolicy which provides a layout mapping that is similar to `layout_right::mapping` except that it has a *padding stride*.

Every specialization of `layout_right_padded` is TriviallyCopyable, and `std::is_trivially_default_constructible_v<T>` is `true` for any such specialization `T`.

Let `m` be the instance of the mapping type `layout_right_padded::mapping`. The padding stride of the mapping is the second to last stride `m.stride(rank() - 2)` which is guaranteed to be at least the last extent value `m.extent(rank() - 1)`, called *extent to pad*.

### Nested class templates

mapping a layout mapping of `layout_right_padded` (public member class template)

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| layout_right (C++23) | row-major multidimensional array layout mapping policy; rightmost extent has stride `1` (class) |
| layout_stride (C++23) | a layout mapping policy with user-defined strides (class) |
