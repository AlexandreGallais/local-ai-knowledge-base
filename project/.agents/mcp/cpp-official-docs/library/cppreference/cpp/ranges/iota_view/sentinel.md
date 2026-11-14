# std::ranges::iota_view<W, Bound>::*sentinel*

`struct /*sentinel*/;` (exposition only*)

`ranges::iota_view<W, Bound>::``sentinel` is the type of the reachable sentinels returned by `end()` of `ranges::iota_view<W, Bound>`.

### Data members

| Member | Definition |
| --- | --- |
| `Bound` `bound_` | the sentinel value (exposition-only member object*) |

### Member functions

## std::ranges::iota_view::*sentinel*::*sentinel*

|  |  |  |
| --- | --- | --- |
| `/*sentinel*/() = default;` | (1) | (since C++20) |
| `constexpr explicit /*sentinel*/( Bound bound );` | (2) | (since C++20) |

1) Value-initializes `bound_` .

2) Initializes `bound_` with `bound`.

### Non-member functions

## operator==(std::ranges::iota_view::*iterator*, std::ranges::iota_view::*sentinel*)

`friend constexpr bool operator==( const /*iterator*/& x, const /*sentinel*/& y );` (since C++20)

Returns `x.value_ == y.bound_`.

The `!=` operator is synthesized from `operator==`.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when *sentinel* is an associated class of the arguments.

## operator-(std::ranges::iota_view::*iterator*, std::ranges::iota_view::*sentinel*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr std::iter_difference_t<W> operator-(const /*iterator*/& x, const /*sentinel*/& y) requires std::sized_sentinel_for<Bound, W>;` | (1) | (since C++20) |
| `friend constexpr std::iter_difference_t<W> operator-(const /*sentinel*/& x, const /*iterator*/& y) requires std::sized_sentinel_for<Bound, W>;` | (2) | (since C++20) |

1) Returns `x.value_ - y.bound_`.

2) Returns `-(y.value_ - x.bound_ )`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when *sentinel* is an associated class of the arguments.

### Example

This section is incomplete Reason: no example
