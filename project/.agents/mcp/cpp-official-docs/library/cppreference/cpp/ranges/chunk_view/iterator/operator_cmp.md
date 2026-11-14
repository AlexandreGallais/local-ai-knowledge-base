# operator==,<,>,<=,>=,<=>(ranges::chunk_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y );` | (1) | (since C++23) |
| `friend constexpr bool operator==( const /*iterator*/& x, std::default_sentinel_t );` | (2) | (since C++23) |
| `friend constexpr bool operator<( const /*iterator*/& x, const /*iterator*/& y ) requires ranges::random_access_range<Base>;` | (3) | (since C++23) |
| `friend constexpr bool operator>( const /*iterator*/& x, const /*iterator*/& y ) requires ranges::random_access_range<Base>;` | (4) | (since C++23) |
| `friend constexpr bool operator<=( const /*iterator*/& x, const /*iterator*/& y ) requires ranges::random_access_range<Base>;` | (5) | (since C++23) |
| `friend constexpr bool operator>=( const /*iterator*/& x, const /*iterator*/& y ) requires ranges::random_access_range<Base>;` | (6) | (since C++23) |
| `friend constexpr auto operator<=>( const /*iterator*/& x, const /*iterator*/& y ) requires ranges::random_access_range<Base> && std::three_way_comparable<ranges::iterator_t<Base>>;` | (7) | (since C++23) |

Compares the underlying iterators (or the underlying iterator and the default sentinel (2)).

Let `current_` and `end_` be the underlying data members.

Equivalent to:

1) `return x.current_ == y.current_;`.

2) `return x.current_ == x.end_;`.

3) `return x.current_ < y.current_;`.

4) `return y < x;`.

5) `return !(y < x);`.

6) `return !(x < y);`.

7) `return x.current_ <=> y.current_;`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::ranges::chunk_view::iterator<Const>` is an associated class of the arguments.

The `!=` operator is synthesized from `operator==`.

### Parameters

x, y - the iterators to compare

### Return value

The result of comparison.

### Example

This section is incomplete Reason: no example

### See also
