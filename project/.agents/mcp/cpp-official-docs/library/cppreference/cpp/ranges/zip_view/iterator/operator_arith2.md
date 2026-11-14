# operator+,-(ranges::zip_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator+( const /*iterator*/& i, difference_type n ) requires /*all-random-access*/<Const, Views...>;` | (1) | (since C++23) |
| `friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& i ) requires /*all-random-access*/<Const, Views...>;` | (2) | (since C++23) |
| `friend constexpr /*iterator*/ operator-( const /*iterator*/& i, difference_type n ) requires /*all-random-access*/<Const, Views...>;` | (3) | (since C++23) |
| `friend constexpr difference_type operator-( const /*iterator*/& i, const /*iterator*/& j ) requires (std::sized_sentinel_for< ranges::iterator_t</*maybe-const*/<Const, Views>>, ranges::iterator_t</*maybe-const*/<Const, Views>>> and ...);` | (4) | (since C++23) |

Let `current_` denote the underlying *tuple-like* object of iterators to elements of adapted views.

1,2) Returns the iterator `i` incremented by `n`. Equivalent to: `auto r = i; r += n; return r;`.

3) Returns the iterator `i` decremented by `n`. Equivalent to: `auto r = i; r -= n; return r;`.

4) Let `DIST(k)` be `difference_type(std::get<k>(i.current_) - std::get<k>(j.current_))`. Returns the smallest absolute value among `DIST(n)` for all integers `0 <= n < sizeof...(Views)`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `zip_view::iterator<Const>` is an associated class of the arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| i, j | - | the iterators. |
| n | - | position relative to current location. |

### Return value

1,2) a copy of `i` that is advanced by `n`

3) a copy of `i` that is advanced by `-n`

4) the distance between `i` and `j`

### Example

This section is incomplete Reason: no example

### See also

operator++, operator++(int), operator--, operator--(int), operator+=, operator-= advances or decrements the underlying iterators (public member function)
