# std::layout_stride

| Defined in header `<mdspan>` |  |
| --- | --- |
| `struct layout_stride;` | (since C++23) |

`layout_stride` is a LayoutMappingPolicy which provides a layout mapping where the strides are user-defined.

|  |  |
| --- | --- |
| `layout_stride` is a TrivialType. | (until C++26) |
| `layout_stride` is TriviallyCopyable, and `std::is_trivially_default_constructible_v<layout_stride>` is `true`. | (since C++26) |

### Nested class templates

mapping a layout mapping of `layout_stride` (public member class template)

### See also

|  |  |
| --- | --- |
| layout_left (C++23) | column-major multidimensional array layout mapping policy; leftmost extent has stride `1` (class) |
| layout_left_padded (C++26) | column-major layout mapping policy with padding stride that can be greater than or equal to the leftmost extent (class template) |
| layout_right (C++23) | row-major multidimensional array layout mapping policy; rightmost extent has stride `1` (class) |
| layout_right_padded (C++26) | row-major layout mapping policy with padding stride that can be greater than or equal to the rightmost extent (class template) |
