# std::ranges::join_with_view<V,Pattern>::*iterator*

`template< bool Const > class /*iterator*/` (exposition only*)

`ranges::join_with_view<V, Pattern>::``iterator` is the type of the iterators returned by `begin()` and `end()` of `ranges::join_with_view<V, Pattern>`.

The state of an iterator of this class is managed as if there are two nested iterators:

- an *outer iterator* into the parent range `*parent_`

- If `Base` models `forward_range`, it is `outer_it_`.
- Otherwise, it is `parent_ ->outer_it_`.

- an *inner iterator* `inner_it_` into the pattern range `parent_ ->pattern_` or into a child range of the parent range

This iterator class has the invariant that the inner iterator is always dereferenceable unless the outer iterator is not dereferenceable. When an iterator is constructed, incremented or decremented, its outer iterator might be adjusted to hold the invariant.

### Template parameters

Const - whether the iterator is a constant iterator

### Nested types

|  |  |
| --- | --- |
| Exposition-only types |  |
| Type | Definition |
| `Parent` | `maybe-const` `<Const, ranges::join_with_view<V, Pattern>>` (exposition-only member type*) |
| `Base` | `maybe-const` `<Const, V>` (exposition-only member type*) |
| `InnerBase` | `ranges::range_reference_t<``Base` `>` (exposition-only member type*) |
| `PatternBase` | `maybe-const` `<Const, Pattern>` (exposition-only member type*) |
| `OuterIter` | `ranges::iterator_t<``Base` `>` (exposition-only member type*) |
| `InnerIter` | `ranges::iterator_t<``InnerBase` `>` (exposition-only member type*) |
| `PatternIter` | `ranges::iterator_t<``PatternBase` `>` (exposition-only member type*) |
| Iterator property types |  |
| Type | Definition |
| `iterator_concept` | an iterator tag, see below |
| `iterator_category` (conditionally present) | an iterator tag, see below |
| `value_type` | `std::common_type_t<ranges::range_value_t<``InnerBase` `>,` `ranges::range_value_t<``PatternBase` `>>` |
| `difference_type` | `std::common_type_t<ranges::range_difference_t<``Base` `>,` `ranges::range_difference_t<``InnerBase` `>,` `ranges::range_difference_t<``PatternBase` `>>` |

#### Determining the iterator concept

`iterator_concept` is defined as follows:

- If all following conditions are satisfied, `iterator_concept` denotes `std::bidirectional_iterator_tag`:
  - `std::is_reference_v<InnerBase >` is `true`.
  - `Base` models `bidirectional_range`.
  - `InnerBase` and `PatternBase` each model `common_range`.
- Otherwise, if all following conditions are satisfied, `iterator_concept` denotes `std::forward_iterator_tag`:
  - `std::is_reference_v<InnerBase >` is `true`.
  - `Base` and `InnerBase` each model `forward_range`.
- Otherwise, `iterator_concept` denotes `std::input_iterator_tag`.

#### Determining the iterator category

Given the following types:

- Let `OuterC` be `std::iterator_traits<``OuterIter` `>::iterator_category`.
- Let `InnerC` be `std::iterator_traits<``InnerIter` `>::iterator_category`.
- Let `PatternC` be `std::iterator_traits<``PatternIter` `>::iterator_category`.

`iterator_category` is defined if and only if `std::is_reference_v<InnerBase >` is `true`, and `Base` and `InnerBase` each model `forward_range`. In this case, it is defined as follows:

- If `std::is_reference_v<std::common_reference_t<ranges::range_reference_t<InnerBase >, ranges::range_reference_t<PatternBase >>` is `false`, `iterator_category` denotes `std::input_iterator_tag`.
- Otherwise, if all following conditions are satisfied, `iterator_category` denotes `std::bidirectional_iterator_tag`:
  - `OuterC`, `InnerC`, and `PatternC` each model `std::derived_from<std::bidirectional_iterator_tag>`.
  - `InnerBase` and `PatternBase` each model `common_range`.
- Otherwise, if `OuterC`, `InnerC`, and `PatternC` each model `std::derived_from<std::forward_iterator_tag>`, `iterator_category` denotes `std::forward_iterator_tag`.
- Otherwise, `iterator_category` denotes `std::input_iterator_tag`.

### Data members

| Member | Description |
| --- | --- |
| `Parent` `*` `parent_` | the pointer to the parent `join_with_view` (exposition-only member object*) |
| `OuterIter` `outer_it_` (present only if `Base` models `forward_range`) | the outer iterator (exposition-only member object*) |
| `std::variant<``PatternIter` `,``InnerIter` `>` `inner_it_` | the inner iterator (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs an iterator (public member function) |
| operator* | accesses the element (public member function) |
| operator++, operator++(int), operator--, operator--(int) | advances or decrements the underlying iterator (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| operator== (C++23) | compares the underlying iterators (function) |
| iter_move (C++23) | casts the result of dereferencing the underlying iterator to its associated rvalue reference type (function) |
| iter_swap (C++23) | swaps the objects pointed to by two underlying iterators (function) |
