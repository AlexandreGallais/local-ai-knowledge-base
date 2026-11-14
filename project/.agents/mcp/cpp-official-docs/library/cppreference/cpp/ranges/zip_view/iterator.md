# std::ranges::zip_view<Views...>::*iterator*

`template< bool Const > class /*iterator*/;` (exposition only*)

The iterator type of a possibly const-qualified `zip_view`, returned by `zip_view::begin` and in certain cases by `zip_view::end`.

The type `/*iterator*/<true>` or `/*iterator*/<false>` treats the underlying views as const-qualified or non-const-qualified respectively.

### Member types

| Member type | Definition |
| --- | --- |
| `iterator_concept` | `std::random_access_iterator_tag` if `all-random-access<Const, Views...>` is `true`, otherwise `std::bidirectional_iterator_tag` if `all-bidirectional<Const, Views...>` is `true`, otherwise `std::forward_iterator_tag` if `all-forward<Const, Views...>` is `true`, otherwise `std::input_iterator_tag`. |
| `iterator_category` (conditionally present) | `std::input_iterator_tag` if `all-forward<Const, Views...>` is `true`, not defined otherwise. |
| `value_type` | `std::tuple<ranges::range_value_t<Views>...>` if `Const` is `false`, `std::tuple<ranges::range_value_t<const Views>...>` otherwise. |
| `difference_type` | `std::common_type_t<ranges::range_difference_t<Views>...>` if `Const` is `false`, `std::common_type_t<ranges::range_difference_t<const Views>...>` otherwise. |

### Data members

| Member name | Definition |
| --- | --- |
| `current_` (private) | `std::tuple<ranges::iterator_t<Views>...>` if `Const` is `false`, or `std::tuple<ranges::iterator_t<const Views>...>` otherwise. (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs an iterator (public member function) |
| operator* | obtains a tuple-like value that consists of underlying pointed-to elements (public member function) |
| operator[] | obtains a tuple-like value that consists of underlying elements at given offset (public member function) |
| operator++, operator++(int), operator--, operator--(int), operator+=, operator-= | advances or decrements the underlying iterators (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| operator==, operator<, operator>, operator<=, operator>=, operator<=> (C++23) | compares the underlying iterators (function) |
| operator+, operator- (C++23) | performs iterator arithmetic on underlying iterators (function) |
| iter_move (C++23) | obtains a tuple-like value that denotes underlying pointed-to elements to be moved (function) |
| iter_swap (C++23) | swaps underlying pointed-to elements (function) |

### Example

This section is incomplete Reason: no example
