# std::ranges::adjacent_transform_view<V,F,N>::*iterator*

`template< bool Const > class /*iterator*/` (since C++23) (exposition only*)

The return type of `adjacent_transform_view::begin`, and of `adjacent_transform_view::end` when the underlying view `V` is a `common_range`.

The type `/*iterator*/<true>` is returned by the const-qualified overloads. The type `/*iterator*/<false>` is returned by the non-const-qualified overloads.

### Member types

| Member type | Definition |
| --- | --- |
| `Parent` (private) | `const ranges::adjacent_transform_view`, if `Const` is `true`. Otherwise, `ranges::adjacent_transform_view`. (exposition-only member type*) |
| `Base` (private) | `const V`, if `Const` is `true`. Otherwise, `V`. (exposition-only member type*) |
| `iterator_category` | `std::input_iterator_tag`, if `std::invoke_result_t</*maybe-const*/<Const, F>&, /*REPEAT*/(ranges::range_reference_t<Base>, N)...>` is not a reference. Otherwise, let `C` denote the type `std::iterator_traits<iterator_t<Base>>::iterator_category`. `std::random_access_iterator_tag`, if `std::derived_from<C, std::random_access_iterator_tag>` is `true`. Otherwise, `std::bidirectional_iterator_tag`, if `std::derived_from<C, std::bidirectional_iterator_tag>` is `true`. Otherwise, `std::forward_iterator_tag`, if `std::derived_from<C, std::forward_iterator_tag>` is `true`. Otherwise, `std::input_iterator_tag`. |
| `iterator_concept` | `typename /*inner-iterator*/<Const>::iterator_concept;`. |
| `value_type` | `std::remove_cvref_t<std::invoke_result_t</*maybe-const*/<Const, F>&, /*REPEAT*/(ranges::range_reference_t<Base>, N)...>>;` |
| `difference_type` | `ranges::range_difference_t<Base>` |

### Data members

| Member name | Definition |
| --- | --- |
| `parent_` (private) | A pointer of type `Parent*`. (exposition-only member object*) |
| `inner_` (private) | An iterator of type `inner_iterator`. (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs an iterator (public member function) |
| operator* | accesses the element (public member function) |
| operator[] | accesses an element by index (public member function) |
| operator++, operator++(int), operator--, operator--(int), operator+=, operator-= | advances or decrements the underlying iterators (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| operator==, operator<, operator>, operator<=, operator>=, operator<=> (C++23) | compares the underlying iterators (function) |
| operator+, operator- (C++23) | performs iterator arithmetic (function) |

### Example

This section is incomplete Reason: no example

### References

- C++23 standard (ISO/IEC 14882:2024):

- 26.7.27.3 Class template adjacent_transform_view::*iterator* [range.adjacent_transform.iterator]

### See also
