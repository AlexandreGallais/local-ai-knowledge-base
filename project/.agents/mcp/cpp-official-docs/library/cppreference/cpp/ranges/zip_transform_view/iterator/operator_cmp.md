# operator==,<=>(ranges::zip_transform_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y ) requires std::equality_comparable</*ziperator*/<Const>>;` | (1) | (since C++23) |
| `friend constexpr auto operator<=>( const /*iterator*/& x, const /*iterator*/& y ) requires ranges::random_access_range<Base> && std::three_way_comparable</*ziperator*/<Const>>;` | (2) | (since C++23) |

Compares the underlying iterators. Let `inner_` denote the underlying iterator.

Equivalent to:

1) `return x.inner_ == y.inner_;`

2) `return x.inner_ <=> y.inner_;`

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::ranges::zip_transform_view::iterator<Const>` is an associated class of the arguments.

The `<`, `<=`, `>`, `>=`, and `!=` operators are synthesized from `operator<=>` and `operator==` respectively.

### Parameters

x, y - iterators to compare

### Return value

The result of comparison

### See also

operator== (C++23) compares a sentinel with an iterator returned from `zip_transform_view::begin` (function)
