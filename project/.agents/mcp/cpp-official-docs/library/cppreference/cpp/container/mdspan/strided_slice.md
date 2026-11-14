# std::strided_slice

| Defined in header `<mdspan>` |  |
| --- | --- |
| `template< class OffsetType, class ExtentType, class StrideType > struct strided_slice;` | (since C++26) |

An instance of every specialization of `strided_slice` is a slice specifier used in `std::submdspan` to select a subset of elements using a set of regularly spaced indices at a specified dimension in `std::mdspan`.

Each `strided_slice` object `s` is characterized by three data members: the offset index `s.offset`, the extent `s.extent`, and the stride `s.stride`.

Given that `s.stride` is greater than zero, the number of selected indices denoted by `N` is determined by `1 + (s.extent - 1) / s.stride` if `s.extent` is nonzero, otherwise `​0​`. The half-open interval from which indices will be selected is given by `[``s.offset``,``s.offset + s.extent``)`. The sequence of selected indices is produced as follows: `s.offset, ..., s.offset + (N - 1) * s.stride`.

This class template has no base classes or declared members other than those shown below.

### Template parameters

|  |  |  |
| --- | --- | --- |
| OffsetType | - | the type of offset |
| ExtentType | - | the type of extent |
| StrideType | - | the type of stride |
| Type requirements |  |  |
| - All template parameters must be unsigned or signed integer types or must satisfy `integral-constant-like` |  |  |

The program is ill-formed if the type requirement is not satisfied.

### Member types

| Member type | Definition |
| --- | --- |
| `offset_type` | `OffsetType` |
| `extent_type` | `ExtentType` |
| `stride_type` | `StrideType` |

### Data members
