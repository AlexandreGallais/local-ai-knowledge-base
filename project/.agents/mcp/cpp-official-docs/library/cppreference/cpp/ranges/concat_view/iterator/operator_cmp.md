# operator==,<,>,<=,>=,<=>(ranges::concat_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr bool operator== ( const /*iterator*/& x, std::default_sentinel_t );` | (1) | (since C++26) |
| `friend constexpr bool operator== ( const /*iterator*/& x, const /*iterator*/& y ) requires (std::equality_comparable<ranges::iterator_t< std::conditional_t<Const, const Views, Views>>> && ...);` | (2) | (since C++26) |
| `friend constexpr bool operator< ( const /*iterator*/& x, const /*iterator*/& y ) requires /*all-random-access*/<Const, Views...>;` | (3) | (since C++26) |
| `friend constexpr bool operator> ( const /*iterator*/& x, const /*iterator*/& y ) requires /*all-random-access*/<Const, Views...>;` | (4) | (since C++26) |
| `friend constexpr bool operator<= ( const /*iterator*/& x, const /*iterator*/& y ) requires /*all-random-access*/<Const, Views...>;` | (5) | (since C++26) |
| `friend constexpr bool operator>= ( const /*iterator*/& x, const /*iterator*/& y ) requires /*all-random-access*/<Const, Views...>;` | (6) | (since C++26) |
| `friend constexpr auto operator<=> ( const /*iterator*/& x, const /*iterator*/& y ) requires (/*all-random-access*/<Const, Views...> && (std::three_way_comparable<ranges::iterator_t< std::conditional_t<Const, const Views, Views>>> && ...));` | (7) | (since C++26) |

Compares the iterator with another iterator or a sentinel.

1) Compares an iterator with a sentinel.

If `x.it_ .valueless_by_exception()` is `true`, the behavior is undefined.

2-7) Compares two iterators. The `!=` operator is synthesized from `operator==`.

If `x.it_ .valueless_by_exception() || y.it_ .valueless_by_exception()` is `true`, the behavior is undefined.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::ranges::concat_view::iterator <Const>` is an associated class of the arguments.

### Parameters

x, y - iterators to compare

### Return value

1) `x.it_ .index() == (sizeof...(Views) - 1) && x.get-iter <sizeof...(Views) - 1>() == x.get-end <sizeof...(Views) - 1>()`

2) `x.it_ == y.it_`

3) `x.it_ < y.it_`

4) `x.it_ > y.it_`

5) `x.it_ <= y.it_`

6) `x.it_ >= y.it_`

7) `x.it_ <=> y.it_`

### Example

This section is incomplete Reason: no example
