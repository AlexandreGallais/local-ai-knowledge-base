# std::ranges::join_with_view<V,Pattern>::*iterator*<Const>::*iterator*

|  |  |  |
| --- | --- | --- |
| `/*iterator*/() = default;` | (1) | (since C++23) |
| `constexpr /*iterator*/( /*iterator*/<!Const> i ) requires Const && std::convertible_to<ranges::iterator_t<V>, /*OuterIter*/> && std::convertible_to<ranges::iterator_t</*InnerRng*/>, /*InnerIter*/> && std::convertible_to<ranges::iterator_t<Pattern>, /*PatternIter*/>;` | (2) | (since C++23) |
| `constexpr /*iterator*/( /*Parent*/& parent, /*OuterIter*/ outer ) requires std::forward_range</*Base*/>;` | (3) | (since C++23) (exposition only*) |
| `constexpr explicit /*iterator*/( /*Parent*/ parent ) requires (!std::forward_range</*Base*/>);` | (4) | (since C++23) (exposition only*) |

Construct an iterator. Overloads (3,4) are called by `begin()` and `end()` of `ranges::join_with_view`.

| Overload | Data members |  |  |
| --- | --- | --- | --- |
| `parent_` | `outer_it_` | `inner_it_` |  |
| (1) | initialized with `nullptr` | value-initialized (only if `Base` models `forward_range`) | default-initialized |
| (2) | initialized with `i.parent_` | initialized with `std::move(i.outer_it_` (only if `Base` models `forward_range`) |  |
| (3) | initialized with `std::addressof(parent)` | initialized with `std::move(outer)` |  |
| (4) | N/A |  |  |

2) After initializing the data members, equivalent to `if (i.inner_it_ .index() == 0) inner_it_ .template emplace<0>(std::get<0>(std::move(i.inner_it_ ))); else inner_it_ .template emplace<1>(std::get<1>(std::move(i.inner_it_ )));`.

3,4) After initializing the data members, adjust the outer iterator as if the inner iterator was incremented by `operator++()`.

### Parameters

|  |  |  |
| --- | --- | --- |
| i | - | a mutable iterator |
| parent | - | a `std::ranges::join_with_view` object |
| outer | - | an iterator into the underlying range of `parent` |

### Example

This section is incomplete Reason: no example
