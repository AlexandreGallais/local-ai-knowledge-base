# operator+,-(ranges::transform_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator+( /*iterator*/ i, difference_type n ) requires ranges::random_access_range<Base>;` | (1) | (since C++20) |
| `friend constexpr /*iterator*/ operator+( difference_type n, /*iterator*/ i ) requires ranges::random_access_range<Base>;` | (2) | (since C++20) |
| `friend constexpr /*iterator*/ operator-( /*iterator*/ i, difference_type n ) requires ranges::random_access_range<Base>;` | (3) | (since C++20) |
| `friend constexpr difference_type operator-( const /*iterator*/& x, const /*iterator*/& y ) requires std::sized_sentinel_for<ranges::iterator_t<Base>, ranges::iterator_t<Base>>;` | (4) | (since C++20) |

1,2) Returns the iterator `i` incremented by `n`.

3) Returns the iterator `i` decremented by `n`.

4) Returns the distance between `x` and `y`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `transform_view::iterator<Const>` is an associated class of the arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| i, x, y | - | the iterators. |
| n | - | position relative to current location. |

### Return value

Let `parent_` denote the pointer to the parent `transform_view`, `current_` denote the underlying iterator.

1,2) `/*iterator*/{*i.parent_, i.current_ + n}`

3) `/*iterator*/{*i.parent_, i.current_ - n}`

4) `x.current_ - y.current_`

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3483 | C++20 | `transform_view::iterator`'s difference is overconstrained | requirement is relaxed |
