# std::layout_stride::mapping

| Defined in header `<mdspan>` |  |
| --- | --- |
| `template< class Extents > class layout_stride::mapping;` | (since C++23) |

The class template `layout_stride::mapping` controls how multidimensional indices are mapped with user-defined strides to a one-dimensional value representing the offset.

Every specialization of `mapping` is a LayoutMapping and a TriviallyCopyable type which satisfies `regular`.

The program is ill-formed if the size of the multidimensional index space `Extents()` is not representable as a value of type `Extents::index_type` when `Extents::rank_dynamic()` is `​0​`.

### Template parameters

Extents - specifies number of dimensions, their sizes, and which are known at compile time. Must be a specialization of `std::extents`.

### Member types

| Member type | Definition |
| --- | --- |
| `extents_type` | `Extents` |
| `index_type` | `extents_type::index_type` |
| `size_type` | `extents_type::size_type` |
| `rank_type` | `extents_type::rank_type` |
| `layout_type` | `std::layout_stride` |

### Member constants

| Member | Definition |
| --- | --- |
| `constexpr rank_type` `rank_` (private) [static] | `extents_type::rank()` (exposition-only static member constant*) |

### Data members

| Member | Definition |
| --- | --- |
| `extents_type` `extents_` (private) | the extents object (exposition-only member object*) |
| `std::array<index_type, rank_>` `strides_` (private) | the array of strides (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new mapping (public member function) |
| operator= (explicitly defaulted) | assigns a mapping (public member function) |
| Observers |  |
| extents | obtains the extents object (public member function) |
| strides | obtains the array of strides (public member function) |
| required_span_size | returns the required size of the mapping (public member function) |
| operator() | maps a multidimensional index into an offset value (public member function) |
| is_unique [static] | determines if this mapping is unique (every combination of indices maps to a different underlying element) (public static member function) |
| is_exhaustive | determines if this mapping is exhaustive (every underlying element can be accessed with some combination of indices) (public member function) |
| is_strided [static] | determines if this mapping is strided (in each dimension, incrementing an index jumps over the same number of underlying elements every time) (public static member function) |
| is_always_unique [static] | determines if this layout mapping is always unique (public static member function) |
| is_always_exhaustive [static] | determines if this layout mapping is always exhaustive (public static member function) |
| is_always_strided [static] | determines if this layout mapping is always strided (public static member function) |
| stride | obtains the stride along the specified dimension (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| operator== | compares this layout mapping of `layout_stride` with other mapping (function template) |
| submdspan_mapping(std::layout_stride::mapping) (C++26) | calculates the mapping and data handle offset used for `subdmspan` (public member function) |

### See also

|  |  |
| --- | --- |
| mapping | a layout mapping of `layout_left` (public member class template of `std::layout_left`) |
| mapping | a layout mapping of `layout_right` (public member class template of `std::layout_right`) |
