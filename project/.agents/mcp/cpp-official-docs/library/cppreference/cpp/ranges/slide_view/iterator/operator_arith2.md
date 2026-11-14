# operator+,-(ranges::slide_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator+( const /*iterator*/& i, difference_type n ) requires ranges::random_access_range<Base>;` | (1) | (since C++23) |
| `friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& i ) requires ranges::random_access_range<Base>;` | (2) | (since C++23) |
| `friend constexpr /*iterator*/ operator-( const /*iterator*/& i, difference_type n ) requires ranges::random_access_range<Base>;` | (3) | (since C++23) |
| `friend constexpr difference_type operator-( const /*iterator*/& i, const /*iterator*/& j ) requires std::sized_sentinel_for<ranges::iterator_t<Base>, ranges::iterator_t<Base>>;` | (4) | (since C++23) |

Performs iterator arithmetic.

1,2) Equivalent to: `auto r = i; r += n; return r;`.

3) Equivalent to: `auto r = i; r -= n; return r;`.

4) Let `current_` and `last_ele_` be the underlying iterators to the begin and end of the sliding window, respectively. Equivalent to:

- `return x.last_ele_ - y.last_ele_;`, if `last_ele_` is present. Otherwise,
- `return x.current_ - y.current_;`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `slide_view::iterator<Const>` is an associated class of the arguments.

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
