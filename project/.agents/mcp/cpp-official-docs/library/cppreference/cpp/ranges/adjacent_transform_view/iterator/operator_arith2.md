# operator+,-(ranges::adjacent_transform_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator+( const /*iterator*/& i, difference_type n ) requires ranges::random_access_range<Base>;` | (1) | (since C++23) |
| `friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& i ) requires ranges::random_access_range<Base>;` | (2) | (since C++23) |
| `friend constexpr iterator operator-( const /*iterator*/& i, difference_type n ) requires ranges::random_access_range<Base>;` | (3) | (since C++23) |
| `friend constexpr difference_type operator-( const /*iterator*/& i, const /*iterator*/& j ) requires std::sized_sentinel_for</*inner-iterator*/<Const>, /*inner-iterator*/<Const>>;` | (4) | (since C++23) |

Let `parent_` and `inner_` be the data members of the iterator.

1,2) Equivalent to `return /*iterator*/(*i.parent_, i.inner_ + n);`.

3) Equivalent to `return /*iterator*/(*i.parent_, i.inner_ - n);`.

4) Equivalent to `return i.inner_ - j.inner_;`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `adjacent_transform_view::iterator<Const>` is an associated class of the arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| i, j | - | the iterators |
| n | - | a position relative to current location |

### Return value

1,2) An incremented iterator.

3) A decremented iterator.

4) A distance between given iterators.

### Example

This section is incomplete Reason: no example

### See also

operator++, operator++(int), operator--, operator--(int), operator+=, operator-= advances or decrements the underlying iterators (public member function)
