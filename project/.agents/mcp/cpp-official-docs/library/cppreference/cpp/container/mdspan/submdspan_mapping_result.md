# std::submdspan_mapping_result

| Defined in header `<mdspan>` |  |
| --- | --- |
| `template< class LayoutMapping > struct submdspan_mapping_result;` | (since C++26) |

Specializations of `submdspan_mapping_result` are result types returned by overloads of `submdspan_mapping`.

This class template has no base classes or declared members other than those shown below.

### Template parameters

LayoutMapping - a layout mapping type that meets the requirements of LayoutMapping

### Data members

| Member name | Definition |
| --- | --- |
| mapping | calculated mapping of type `LayoutMapping`. It is declared with `[[no_unique_address]]` attribute. (public member object) |
| offset | calculated offset of type `std::size_t`. (public member object) |

All these members have default member initializers where each data member is value initialized.

### See also

|  |  |
| --- | --- |
| submdspan (C++26) | returns a view of a subset of an existing `mdspan` (function template) |
| submdspan_mapping(std::layout_left::mapping) (C++26) | calculates the mapping and data handle offset used for `subdmspan` (public member function of `std::layout_left::mapping<Extents>`) |
| submdspan_mapping(std::layout_right::mapping) (C++26) | calculates the mapping and data handle offset used for `subdmspan` (public member function of `std::layout_right::mapping<Extents>`) |
| submdspan_mapping(std::layout_stride::mapping) (C++26) | calculates the mapping and data handle offset used for `subdmspan` (public member function of `std::layout_stride::mapping<Extents>`) |
