# std::ranges::chunk_by_view<V,Pred>::*iterator*

`class /*iterator*/` (since C++23) (exposition only*)

The return type of `chunk_by_view::begin`, and of `chunk_by_view::end` when the underlying view `V` is a `common_range`.

### Member types

| Member type | Definition |
| --- | --- |
| `value_type` | `ranges::subrange<ranges::iterator_t<V>>` |
| `difference_type` | `ranges::range_difference_t<V>` |
| `iterator_category` | `std::input_iterator_tag` |
| `iterator_concept` | `std::bidirectional_iterator_tag`, if `V` models `bidirectional_range`, otherwise `std::forward_iterator_tag`. |

### Data members

| Member name | Definition |
| --- | --- |
| `parent_` (private) | A pointer to the parent `chunk_by_view`. (exposition-only member object*) |
| `current_` (private) | `ranges::iterator_t<V>`, an iterator to the begin of current chunk. (exposition-only member object*) |
| `next_` (private) | `ranges::iterator_t<V>`, an iterator to the begin of next chunk, if present. (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs an iterator (public member function) |
| operator* | accesses the element (public member function) |
| operator++, operator++(int), operator--, operator--(int) | advances or decrements the underlying iterators (public member function) |

### Non-member functions

operator== (C++23) compares the underlying iterators (function)

### Example

This section is incomplete Reason: no example

### References

- C++23 standard (ISO/IEC 14882:2024):

- 26.7.30.3 Class `chunk_by_view​::​iterator` [range.chunk.by.iter]

### See also
