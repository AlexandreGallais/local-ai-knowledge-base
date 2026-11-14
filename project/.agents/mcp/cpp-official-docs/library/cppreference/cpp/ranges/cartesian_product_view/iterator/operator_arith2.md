# operator+,-(ranges::cartesian_product_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator+( const /*iterator*/& i, difference_type n ) requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;` | (1) | (since C++23) |
| `friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& i ) requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;` | (2) | (since C++23) |
| `friend constexpr /*iterator*/ operator-( const /*iterator*/& i, difference_type n ) requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;` | (3) | (since C++23) |
| `friend constexpr difference_type operator-( const /*iterator*/& i, const /*iterator*/& j ) requires /*cartesian-is-sized-sentinel*/<Const, iterator_t, First, Vs...>;` | (4) | (since C++23) |
| `friend constexpr difference_type operator-( const /*iterator*/& i, std::default_sentinel_t ) requires /*cartesian-is-sized-sentinel*/<Const, ranges::sentinel_t, First, Vs...>;` | (5) | (since C++23) |
| `friend constexpr difference_type operator-( std::default_sentinel_t s, const /*iterator*/& i ) requires /*cartesian-is-sized-sentinel*/<Const, ranges::sentinel_t, First, Vs...>;` | (6) | (since C++23) |

Performs iterator arithmetic or calculates the distance.

Let `current_` denote the underlying tuple of iterators and `parent_` denote the underlying pointer to `cartesian_product_view`.

1) Equivalent to: `return /*iterator*/(i) += n;`.

2) Equivalent to: `return i + n;`.

3) Equivalent to: `return /*iterator*/(i) -= n;`.

4) Equivalent to: `return i.distance_from(j.current_);`.

5) Let `/*end-tuple*/` be an object of a type that is a specialization of `tuple`, such that:

- `std::get<0>(/*end-tuple*/)` has the same value as `ranges::end(std::get<0>(i.parent_->bases_));`
- `std::get<N>(/*end-tuple*/)` has the same value as `ranges::begin(std::get<N>(i.parent_->bases_))` for every integer `1 ≤ N ≤ sizeof...(Vs)`.

Equivalent to: `return i.distance_from(/*end-tuple*/);`.

6) Equivalent to: `return -(i - s);`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `cartesian_product_view::iterator<Const>` is an associated class of the arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| i, j | - | the iterators |
| n | - | the position relative to current location |
| s | - | the sentinel |

### Return value

1,2) An incremented iterator.

3) A decremented iterator.

4) A distance between given iterators.

5,6) A distance between given iterator and sentinel.

### Example

This section is incomplete Reason: no example

### See also

operator++, operator++(int), operator--, operator--(int), operator+=, operator-= advances or decrements the underlying iterator (public member function)
