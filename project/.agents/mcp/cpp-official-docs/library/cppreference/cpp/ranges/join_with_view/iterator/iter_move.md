# iter_move(ranges::join_with_view::*iterator*)

`friend constexpr decltype(auto) iter_move( const /*iterator*/& i );` (since C++23)

Returns the result of applying `ranges::iter_move` to the inner iterator.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `join_with_view::iterator` `<Const>` is an associated class of the arguments.

### Parameters

i - iterator

### Return value

`std::visit<rvalue_reference>(ranges::iter_move, x.inner_it_)`, where `rvalue_reference` is `std::common_reference_t<ranges::range_rvalue_reference_t<``InnerBase` `>,` `ranges::range_rvalue_reference_t<``PatternBase` `>>`.

### See also

iter_move (C++20) casts the result of dereferencing an object to its associated rvalue reference type (customization point object)
