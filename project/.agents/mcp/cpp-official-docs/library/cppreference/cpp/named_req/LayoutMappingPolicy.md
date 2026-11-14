# C++ named requirements: LayoutMappingPolicy (since C++23)

**LayoutMappingPolicy** is a type used to specify layout policy of `std::mdspan`. It provides a member alias template whose specialization is a LayoutMapping type.

### Requirements

A type `MP` satisfies LayoutMappingPolicy if the type requirements shown below are valid:

#### Legend

| Type | Definition |
| --- | --- |
| `MP` | a layout mapping policy class |
| `M` | a layout mapping class |
| `E` | a specialization of `std::extents` |

#### Type requirements

- `MP::mapping<E>` is valid and denotes a type `M` that satisfies LayoutMapping.
- `M::layout_type` is valid and denotes a type `MP`.
- `M::extents_type` is valid and denotes a type `E`.

### Standard library

The following standard library types satisfy LayoutMappingPolicy requirements:

|  |  |
| --- | --- |
| layout_left (C++23) | column-major multidimensional array layout mapping policy; leftmost extent has stride `1` (class) |
| layout_right (C++23) | row-major multidimensional array layout mapping policy; rightmost extent has stride `1` (class) |
| layout_stride (C++23) | a layout mapping policy with user-defined strides (class) |
| layout_left_padded (C++26) | column-major layout mapping policy with padding stride that can be greater than or equal to the leftmost extent (class template) |
| layout_right_padded (C++26) | row-major layout mapping policy with padding stride that can be greater than or equal to the rightmost extent (class template) |
| Defined in namespace `std::linalg` |  |
| layout_transpose (C++26) | `std::mdspan` layout mapping policy that swaps the rightmost two indices, extents, and strides of any unique layout mapping policy (class template) |
| layout_blas_packed (C++26) | `std::mdspan` layout mapping policy that represents a square matrix that stores only the entries in one triangle, in a packed contiguous format (class template) |
