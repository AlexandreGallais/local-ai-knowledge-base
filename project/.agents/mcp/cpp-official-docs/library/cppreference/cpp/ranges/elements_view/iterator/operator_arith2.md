# operator+,-(ranges::elements_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator+( const /*iterator*/& i, difference_type n ) requires ranges::random_access_range<Base>;` | (1) | (since C++20) |
| `friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& i ) requires ranges::random_access_range<Base>;` | (2) | (since C++20) |
| `friend constexpr /*iterator*/ operator-( const /*iterator*/& i, difference_type n ) requires ranges::random_access_range<Base>;` | (3) | (since C++20) |
| `friend constexpr difference_type operator-( const /*iterator*/& x, const /*iterator*/& y ) requires std::sized_sentinel_for<ranges::iterator_t<Base>, ranges::iterator_t<Base>>;` | (4) | (since C++20) |

1,2) Returns the iterator `i` incremented by `n`.

3) Returns the iterator `i` decremented by `n`.

4) Returns the distance between `x` and `y`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `elements_view::iterator<Const>` is an associated class of the arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| i, x, y | - | the iterators |
| n | - | position relative to current location |

### Return value

1,2) `[&]{ auto j = i; j += n; return j; }()`

3) `[&]{ auto j = i; j -= n; return j; }()`

4) `x.base() - y.base()`

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3483 | C++20 | `elements_view::iterator`'s difference is overconstrained | requirement is relaxed |
