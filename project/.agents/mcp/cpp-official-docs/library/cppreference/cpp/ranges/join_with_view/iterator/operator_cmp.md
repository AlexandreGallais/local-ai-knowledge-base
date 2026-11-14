# operator==(ranges::join_with_view::*iterator*)

`friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y ) requires std::is_reference_v<InnerBase> && std::equality_comparable<ranges::iterator_t<Base>> && std::equality_comparable<ranges::iterator_t<InnerBase>>;` (since C++23)

Compares whether the iterators `x` and `y` are equal. They only compare equal if their outer iterators and inner iterators compare equal respectively.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::ranges::join_with_view::iterator` `<Const>` is an associated class of the arguments.

The `!=` operator is synthesized from `operator==`.

### Parameters

x, y - iterators to compare

### Return value

`x.outer_it_ == y.outer_it_ && x.inner_it_ == y.inner_it_`

### See also

operator== (C++23) compares a sentinel with an iterator returned from `join_with_view::begin` (function)
