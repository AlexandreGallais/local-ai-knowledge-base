# std::layout_right

| Defined in header `<mdspan>` |  |
| --- | --- |
| `struct layout_right;` | (since C++23) |

`layout_right` is a LayoutMappingPolicy which provides a layout mapping where the rightmost extent has stride 1, and strides increase right-to-left as the product of extents.

|  |  |
| --- | --- |
| `layout_right` is a TrivialType. | (until C++26) |
| `layout_right` is TriviallyCopyable, and `std::is_trivially_default_constructible_v<layout_right>` is `true`. | (since C++26) |

It is the default layout mapping policy used by `std::mdspan` if no user-specified layout is provided.

### Nested class templates

mapping a layout mapping of `layout_right` (public member class template)

### See also

|  |  |
| --- | --- |
| layout_right_padded (C++26) | row-major layout mapping policy with padding stride that can be greater than or equal to the rightmost extent (class template) |
| layout_left (C++23) | column-major multidimensional array layout mapping policy; leftmost extent has stride `1` (class) |
| layout_stride (C++23) | a layout mapping policy with user-defined strides (class) |
