# operator+,-(ranges::adjacent_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator+( const /*iterator*/& i, difference_type n ) requires ranges::random_access_range<Base>;` | (1) | (since C++23) |
| `friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& i ) requires ranges::random_access_range<Base>;` | (2) | (since C++23) |
| `friend constexpr /*iterator*/ operator-( const /*iterator*/& i, difference_type n ) requires ranges::random_access_range<Base>;` | (3) | (since C++23) |
| `friend constexpr difference_type operator-( const /*iterator*/& i, const /*iterator*/& j ) requires std::sized_sentinel_for<ranges::iterator_t<Base>, ranges::iterator_t<Base>>;` | (4) | (since C++23) |

Let `current_` be the underlying array of iterators, and `Base` be the type (possibly const-qualified) of underlying view.

1,2) Returns the iterator `i` incremented by `n`. Equivalent to: `auto r = i; r += n; return r;`.

3) Returns the iterator `i` decremented by `n`. Equivalent to: `auto r = i; r -= n; return r;`.

4) Returns the distance between `i` and `j`. Equivalent to: `return i.current_.back() - j.current_.back();`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `adjacent_view::iterator<Const>` is an associated class of the arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| i, j | - | the iterators |
| n | - | position relative to current location |

### Return value

1,2) An incremented iterator.

3) A decremented iterator.

4) A distance between given iterators.

### Example

This section is incomplete Reason: no example

### See also

operator++, operator++(int), operator--, operator--(int), operator+=, operator-= advances or decrements the underlying iterators (public member function)
