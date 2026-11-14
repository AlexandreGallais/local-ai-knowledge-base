# operator==(ranges::enumerate_view::*iterator*, ranges::enumerate_view::*sentinel* )

`friend constexpr bool operator==( const /*iterator*/<Const>& x, const /*sentinel*/& y );` (since C++23)

Compares the underlying iterator of `x` with the underlying sentinel of `y`.

Let `current_` denote the underlying iterator of `x` and `end_` denote the underlying sentinel of `y`. Equivalent to:

`return x.current_ == y.end_;`.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `enumerate_view::sentinel<Const>` is an associated class of the arguments.

The `!=` operator is synthesized from `operator==`.

### Parameters

|  |  |  |
| --- | --- | --- |
| x | - | an iterator to compare |
| y | - | a sentinel to compare |

### Return value

The result of comparison.

### Example

This section is incomplete Reason: no example
