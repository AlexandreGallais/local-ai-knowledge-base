# std::ranges::slide_view<V>::*iterator*

`template< bool Const > class /*iterator*/` (since C++23) (exposition only*)

The return type of `slide_view::begin`, and of `slide_view::end` when the underlying view `V` is a `common_range`.

The type `/*iterator*/<true>` is returned by the const-qualified overloads. The type `/*iterator*/<false>` is returned by the non-const-qualified overloads.

### Member types

| Member type | Definition |
| --- | --- |
| `Base` (private) | `const V` if `Const` is `true`, otherwise `V`. (exposition-only member type*) |
| `iterator_category` | `std::input_iterator_tag` |
| `iterator_concept` | `std::random_access_iterator_tag`, if `Base` models `random_access_range`. Otherwise, `std::bidirectional_iterator_tag`, if `Base` models `bidirectional_range`. Otherwise, `std::forward_iterator_tag`. |
| `value_type` | `decltype(views::counted(current_, n_))` |
| `difference_type` | `ranges::range_difference_t<Base>` |

### Data members

| Member name | Definition |
| --- | --- |
| `current_` (private) | `ranges::iterator_t<Base>`, holds an iterator to the first underlying element of the current window in `slide_view` (exposition-only member object*) |
| `last_ele_` (private) (conditionally present) | `ranges::iterator_t<Base>`, holds an iterator to the one-past-end underlying element of the current window in `slide_view`. Present only if `Base` models `/*slide-caches-first*/`. (exposition-only member object*) |
| `n_` (private) | `ranges::range_difference_t<Base>`, holds the window width of `slide_view`. (exposition-only member object*) |

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

- 26.7.29.3 Class template `slide_view::iterator` [range.slide.iterator]

### See also
