# std::layout_left

| Defined in header `<mdspan>` |  |
| --- | --- |
| `struct layout_left;` | (since C++23) |

`layout_left` is a LayoutMappingPolicy which provides a layout mapping where the leftmost extent has stride 1, and strides increase left-to-right as the product of extents.

|  |  |
| --- | --- |
| `layout_left` is a TrivialType. | (until C++26) |
| `layout_left` is TriviallyCopyable, and `std::is_trivially_default_constructible_v<layout_left>` is `true`. | (since C++26) |

### Nested class templates

mapping a layout mapping of `layout_left` (public member class template)

### See also

|  |  |
| --- | --- |
| layout_left_padded (C++26) | column-major layout mapping policy with padding stride that can be greater than or equal to the leftmost extent (class template) |
| layout_right (C++23) | row-major multidimensional array layout mapping policy; rightmost extent has stride `1` (class) |
| layout_stride (C++23) | a layout mapping policy with user-defined strides (class) |
