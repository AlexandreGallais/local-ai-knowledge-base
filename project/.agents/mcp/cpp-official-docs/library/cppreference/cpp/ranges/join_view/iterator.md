# std::ranges::join_view<V>::*iterator*

`template< bool Const > class /*iterator*/` (since C++20) (exposition only*)

The return type of `join_view::begin`, and of `join_view::end` when both the outer range `V` and the inner range `ranges::range_reference_t<V>` satisfy `common_range` and the parent `join_view` is a `forward_range`.

If `V` is not a simple view (e.g. if `ranges::iterator_t<const V>` is invalid or different from `ranges::iterator_t<V>`), `Const` is true for iterators returned from the const overloads, and false otherwise. If `V` is a simple view, `Const` is true if and only if `ranges::range_reference_t<V>` is a reference.

### Member types

| Member | Definition |
| --- | --- |
| `Parent` | `maybe-const` `<Const, ranges::join_view<V>>` (exposition-only member type*) |
| `Base` | `maybe-const` `<Const, V>` (exposition-only member type*) |
| `OuterIter` | `ranges::iterator_t<Base>` (exposition-only member type*) |
| `InnerIter` | `ranges::iterator_t<ranges::range_reference_t<Base>>` (exposition-only member type*) |
| `iterator_concept` | `std::bidirectional_iterator_tag`, if `ranges::range_reference_t<Base>` is a reference type, and `Base` and `ranges::range_reference_t<Base>` each model `bidirectional_range`; `std::forward_iterator_tag`, if `ranges::range_reference_t<Base>` is a reference type, and `Base` and `ranges::range_reference_t<Base>` each model `forward_range`; `std::input_iterator_tag` otherwise. |
| `iterator_category` (conditionally present) | Defined only if `iterator::iterator_concept` (see above) denotes `std::forward_iterator_tag`. Let `OUTERC` be `std::iterator_traits<ranges::iterator_t<Base>>::iterator_category`, and let `INNERC` be `std::iterator_traits<ranges::iterator_t<ranges::range_reference_t<Base>>>:: iterator_category`. `std::bidirectional_iterator_tag`, if `OUTERC` and `INNERC` each model `std::derived_from<std::bidirectional_iterator_tag>`; `std::forward_iterator_tag`, if `OUTERC` and `INNERC` each model `std::derived_from<std::forward_iterator_tag>`; `std::input_iterator_tag` otherwise. |
| `value_type` | `ranges::range_value_t<ranges::range_reference_t<Base>>` |
| `difference_type` | `std::common_type_t<ranges::range_difference_t<Base>, ranges::range_difference_t<ranges::range_reference_t<Base>>>` |

### Data members

| Member | Definition |
| --- | --- |
| `OuterIter` `outer_` (private) | An outer iterator (exposition-only member object*) |
| `InnerIter` `inner_` (private) | An inner iterator (exposition-only member object*) |
| `Parent*` `parent_` (private) | A pointer to the parent object (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs an iterator (public member function) |
| operator*, operator-> | accesses the element (public member function) |
| operator++, operator++(int), operator--, operator--(int) | advances or decrements the underlying iterators (public member function) |
| *satisfy* | skips over empty inner ranges (exposition-only member function*) |

### Non-member functions

|  |  |
| --- | --- |
| operator== (C++20) | compares the underlying iterators (function) |
| iter_move (C++20) | casts the result of dereferencing the underlying iterator to its associated rvalue reference type (function) |
| iter_swap (C++20) | swaps the objects pointed to by two underlying iterators (function) |
