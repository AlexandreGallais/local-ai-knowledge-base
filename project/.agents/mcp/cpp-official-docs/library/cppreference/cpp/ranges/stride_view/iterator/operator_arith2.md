# operator+,-(ranges::stride_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator+( const /*iterator*/& i, difference_type n ) requires ranges::random_access_range<Base>;` | (1) | (since C++23) |
| `friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& i ) requires ranges::random_access_range<Base>;` | (2) | (since C++23) |
| `friend constexpr /*iterator*/ operator-( const /*iterator*/& i, difference_type n ) requires ranges::random_access_range<Base>;` | (3) | (since C++23) |
| `friend constexpr difference_type operator-( const /*iterator*/& x, const /*iterator*/& y ) requires std::sized_sentinel_for<ranges::iterator_t<Base>, ranges::iterator_t<Base>>;` | (4) | (since C++23) |
| `friend constexpr difference_type operator-( std::default_sentinel_t, const /*iterator*/& x ) requires std::sized_sentinel_for<ranges::sentinel_t<Base>, ranges::iterator_t<Base>>;` | (5) | (since C++23) |
| `friend constexpr difference_type operator-( const /*iterator*/& x, std::default_sentinel_t s ) requires std::sized_sentinel_for<ranges::sentinel_t<Base>, ranges::iterator_t<Base>>;` | (6) | (since C++23) |

Increments or decrements the iterator.

Let `current_`, `end_`, `stride_`, and `missing_` be the data members of the iterator.

1,2) Equivalent to `auto r = i; r += n; return r;`.

3) Equivalent to `auto r = i; r -= n; return r;`.

4) Let `N` be `x.current_ - y.current_`. Returns:

- `(N + x.missing_ - y.missing_) / x.stride_`, if `Base` models `forward_range`.
- `-/*div-ceil*/(-N, x.stride_)`, if `N < 0`.
- `/*div-ceil*/(N, x.stride_)` otherwise.

5) Equivalent to `return /*div-ceil*/(x.end_ - x.current_, x.stride_);`.

6) Equivalent to `return -(s - x);`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `stride_view::iterator<Const>` is an associated class of the arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| x, y, i | - | the iterators |
| s | - | a sentinel |

### Return value

1,2) An incremented iterator

3) A decremented iterator

4) A distance between given iterators

5,6) A distance between given iterator and sentinel

### Example

This section is incomplete Reason: no example

### See also

operator++, operator++(int), operator--, operator--(int), operator+=, operator-= advances or decrements the underlying iterator (public member function)
